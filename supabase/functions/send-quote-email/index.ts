import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const RESEND_API_KEY = (Deno.env.get("RESEND_API_KEY") ?? "").trim();
const resend = new Resend(RESEND_API_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuoteEmailRequest {
  client_name: string;
  client_email: string;
  client_phone: string;
  service_type: string;
  description: string;
  estimated_price: number;
  final_price: number;
  discount_percentage: number;
  promo_code?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Validation précoce de la clé API Resend (sans exposer la clé)
  if (!RESEND_API_KEY || !RESEND_API_KEY.startsWith("re_")) {
    console.error("❌ RESEND_API_KEY absente ou invalide (format).");
    return new Response(
      JSON.stringify({
        success: false,
        message: "Configuration email manquante",
        reason: "RESEND_API_KEY absente ou invalide",
      }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    const {
      client_name,
      client_email,
      client_phone,
      service_type,
      description,
      estimated_price,
      final_price,
      discount_percentage,
      promo_code,
    }: QuoteEmailRequest = await req.json();

    console.log("=== DÉBUT ENVOI AUTOMATIQUE DE FACTURE ===");
    console.log("📧 Destinataire:", client_email);
    console.log("👤 Client:", client_name);
    console.log("💰 Montant final:", final_price, "FCFA");

    const serviceTypeLabel = {
      vitrine: "Site Vitrine",
      ecommerce: "Site E-commerce",
      entreprise: "Site Entreprise",
      ong: "Site ONG/Association",
      premium: "Site Premium"
    }[service_type] || service_type;

    // Générer un numéro de devis unique basé sur la date et un nombre aléatoire
    const quoteNumber = `DEV-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    const currentDate = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });

    console.log("📤 Envoi de l'email de facture en cours...");
    const emailResponse = await resend.emails.send({
      from: "UniversWeb <onboarding@resend.dev>",
      replyTo: "universwebsaconsulting090@gmail.com",
      to: [client_email],
      subject: `✅ Facture UniversWeb - Devis N°${quoteNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; }
              .container { max-width: 650px; margin: 20px auto; background: white; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; }
              .company-info { display: flex; justify-content: space-between; align-items: start; }
              .logo { font-size: 32px; font-weight: bold; margin: 0; }
              .invoice-details { text-align: right; }
              .invoice-number { font-size: 20px; font-weight: bold; margin: 5px 0; }
              .content { padding: 30px; }
              .client-section { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
              .invoice-table { width: 100%; border-collapse: collapse; margin: 30px 0; }
              .invoice-table th { background: #667eea; color: white; padding: 15px; text-align: left; font-weight: 600; }
              .invoice-table td { padding: 15px; border-bottom: 1px solid #e0e0e0; }
              .invoice-table tr:last-child td { border-bottom: none; }
              .totals-section { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .total-row { display: flex; justify-content: space-between; padding: 10px 0; font-size: 16px; }
              .total-row.discount { color: #10b981; font-weight: 600; }
              .total-row.final { background: #667eea; color: white; padding: 15px; margin: 10px -20px -20px -20px; border-radius: 0 0 8px 8px; font-size: 24px; font-weight: bold; }
              .payment-info { background: #fff3cd; padding: 20px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0; }
              .payment-methods { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #667eea; }
              .method-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 15px; }
              .method-item { padding: 10px; background: #f9f9f9; border-radius: 5px; text-align: center; font-weight: 600; }
              .footer { background: #f9f9f9; padding: 30px; text-align: center; color: #666; font-size: 14px; }
              .label { font-weight: 600; color: #667eea; }
              .highlight { background: #10b981; color: white; padding: 3px 8px; border-radius: 4px; font-weight: 600; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="company-info">
                  <div>
                    <div class="logo">🌐 UniversWeb</div>
                    <p style="margin: 5px 0 0 0; opacity: 0.9;">Consulting & Digital Solutions</p>
                  </div>
                  <div class="invoice-details">
                    <div style="font-size: 24px; font-weight: bold;">FACTURE DEVIS</div>
                    <div class="invoice-number">${quoteNumber}</div>
                    <div style="opacity: 0.9;">${currentDate}</div>
                  </div>
                </div>
              </div>
              
              <div class="content">
                <div class="client-section">
                  <h3 style="margin-top: 0; color: #667eea;">👤 Informations Client</h3>
                  <p style="margin: 8px 0;"><span class="label">Nom:</span> ${client_name}</p>
                  <p style="margin: 8px 0;"><span class="label">Email:</span> ${client_email}</p>
                  <p style="margin: 8px 0;"><span class="label">Téléphone:</span> ${client_phone}</p>
                </div>

                <table class="invoice-table">
                  <thead>
                    <tr>
                      <th>Description du Service</th>
                      <th style="text-align: right; width: 150px;">Montant (FCFA)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>${serviceTypeLabel}</strong>
                        <div style="color: #666; font-size: 14px; margin-top: 5px;">${description}</div>
                      </td>
                      <td style="text-align: right; font-weight: 600; font-size: 18px;">
                        ${estimated_price.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div class="totals-section">
                  <div class="total-row">
                    <span>Sous-total</span>
                    <span>${estimated_price.toLocaleString()} FCFA</span>
                  </div>
                  ${discount_percentage > 0 ? `
                    <div class="total-row discount">
                      <span>💰 Réduction ${promo_code ? `(${promo_code})` : ''} (-${discount_percentage}%)</span>
                      <span>-${(estimated_price - final_price).toLocaleString()} FCFA</span>
                    </div>
                  ` : ''}
                  <div class="total-row final">
                    <span>TOTAL À PAYER</span>
                    <span>${final_price.toLocaleString()} FCFA</span>
                  </div>
                </div>

                <div class="payment-info">
                  <h3 style="margin-top: 0; color: #f59e0b;">⚠️ Informations Importantes</h3>
                  <p style="margin: 8px 0;">✅ Ce devis est valable pendant <strong>30 jours</strong></p>
                  <p style="margin: 8px 0;">✅ Notre équipe vous contactera sous <strong>24 heures</strong></p>
                  <p style="margin: 8px 0;">✅ Délai de réalisation estimé: <strong>2-4 semaines</strong></p>
                </div>

                <div class="payment-methods">
                  <h3 style="margin-top: 0; color: #667eea; text-align: center;">💳 Moyens de Paiement Acceptés</h3>
                  <div class="method-list">
                    <div class="method-item">📱 Wave</div>
                    <div class="method-item">🟠 Orange Money</div>
                    <div class="method-item">🟢 YAS</div>
                    <div class="method-item">🔵 Wizall</div>
                    <div class="method-item">🔑 Keyzen</div>
                    <div class="method-item">💳 Visa</div>
                    <div class="method-item">🏦 UBA</div>
                    <div class="method-item">🌍 PayPal</div>
                  </div>
                </div>

                <div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
                  <h3 style="margin-top: 0; color: #10b981;">📞 Besoin d'Aide ou de Modifications ?</h3>
                  <p style="margin: 8px 0;">Notre équipe est à votre disposition du <strong>lundi au vendredi de 9h à 18h</strong></p>
                  <p style="margin: 8px 0;"><span class="label">📧 Email:</span> universwebsaconsulting090@gmail.com</p>
                  <p style="margin: 8px 0;"><span class="label">📱 Téléphone:</span> +221 77 123 45 67</p>
                  <p style="margin: 8px 0;"><span class="label">🌐 Site Web:</span> www.universweb.sn</p>
                </div>

                <div style="text-align: center; margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px;">
                  <p style="margin: 0; font-size: 18px; font-weight: 600;">Merci de votre confiance ! 🚀</p>
                  <p style="margin: 10px 0 0 0;">L'équipe UniversWeb vous accompagne dans la réussite de votre projet digital</p>
                </div>
              </div>
              
              <div class="footer">
                <p style="font-weight: 600; margin: 10px 0;">UniversWeb - Consulting & Digital Solutions</p>
                <p style="margin: 5px 0;">Dakar, Sénégal</p>
                <p style="margin: 5px 0;">📧 universwebsaconsulting090@gmail.com</p>
                <p style="margin: 20px 0 10px 0; padding-top: 20px; border-top: 1px solid #ddd;">
                  © ${new Date().getFullYear()} UniversWeb - Tous droits réservés
                </p>
                <p style="font-size: 12px; color: #999; margin: 5px 0;">
                  Cette facture a été générée automatiquement. Pour toute question, répondez directement à cet email.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    // Vérification du résultat de l'envoi
    if (emailResponse.error || !emailResponse.data?.id) {
      console.error("❌ Échec de l'envoi de l'email de facture.");
      if ((emailResponse as any).error) {
        console.error("Code:", (emailResponse as any).error?.statusCode, "Nom:", (emailResponse as any).error?.name);
        console.error("Message:", (emailResponse as any).error?.message);
      }
      console.log("=== FIN ENVOI AUTOMATIQUE DE FACTURE ===");

      return new Response(
        JSON.stringify({
          success: false,
          message: "Échec de l'envoi automatique de la facture",
          reason: (emailResponse as any).error?.message ?? "Envoi non accepté par le fournisseur d'email",
          email: client_email,
          invoice_number: quoteNumber
        }),
        {
          status: 502,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    console.log("✅ FACTURE ENVOYÉE AVEC SUCCÈS!");
    console.log("📧 Email ID:", emailResponse.data?.id);
    console.log("=== FIN ENVOI AUTOMATIQUE DE FACTURE ===");

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Facture envoyée automatiquement par email",
      email: client_email,
      invoice_number: quoteNumber,
      emailResponse 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("❌ ERREUR LORS DE L'ENVOI DE LA FACTURE:", error);
    console.error("Détails de l'erreur:", error.message);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: "L'envoi automatique de la facture par email a échoué"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
