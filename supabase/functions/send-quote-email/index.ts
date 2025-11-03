import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

    console.log("Sending quote email to:", client_email);

    const serviceTypeLabel = {
      vitrine: "Site Vitrine",
      ecommerce: "Site E-commerce",
      entreprise: "Site Entreprise",
      ong: "Site ONG/Association",
      premium: "Site Premium"
    }[service_type] || service_type;

    const emailResponse = await resend.emails.send({
      from: "UniversWeb <onboarding@resend.dev>",
      replyTo: "universwebsaconsulting090@gmail.com",
      to: [client_email],
      subject: "Votre devis UniversWeb - Confirmation de réception",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
              .price-box { background: #667eea; color: white; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; }
              .price { font-size: 32px; font-weight: bold; }
              .discount { background: #10b981; color: white; padding: 5px 10px; border-radius: 5px; display: inline-block; margin-top: 10px; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
              h1 { margin: 0; font-size: 28px; }
              h2 { color: #667eea; margin-top: 0; }
              .label { font-weight: bold; color: #667eea; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✨ UniversWeb</h1>
                <p style="margin: 10px 0 0 0; font-size: 18px;">Votre demande de devis a été reçue</p>
              </div>
              
              <div class="content">
                <h2>Bonjour ${client_name},</h2>
                <p>Nous avons bien reçu votre demande de devis. Notre équipe l'examinera dans les plus brefs délais et vous répondra sous 24 heures.</p>
                
                <div class="info-box">
                  <h3 style="margin-top: 0; color: #667eea;">📋 Détails de votre demande</h3>
                  <p><span class="label">Type de site:</span> ${serviceTypeLabel}</p>
                  <p><span class="label">Téléphone:</span> ${client_phone}</p>
                  <p><span class="label">Description:</span><br/>${description}</p>
                  ${promo_code ? `<p><span class="label">Code promo utilisé:</span> <span class="discount">${promo_code}</span></p>` : ''}
                </div>
                
                <div class="price-box">
                  <div>Prix estimé</div>
                  ${discount_percentage > 0 ? `
                    <div style="text-decoration: line-through; opacity: 0.7; font-size: 18px; margin-top: 10px;">
                      ${estimated_price.toLocaleString()} FCFA
                    </div>
                    <div class="price">${final_price.toLocaleString()} FCFA</div>
                    <div class="discount">Réduction de ${discount_percentage}%</div>
                  ` : `
                    <div class="price">${final_price.toLocaleString()} FCFA</div>
                  `}
                </div>
                
                <div class="info-box">
                  <h3 style="margin-top: 0; color: #667eea;">📞 Besoin d'aide ?</h3>
                  <p>Notre équipe est disponible du lundi au vendredi de 9h à 18h.</p>
                  <p><span class="label">Email:</span> contact@universweb.com</p>
                  <p><span class="label">Téléphone:</span> +221 77 123 45 67</p>
                </div>
                
                <p style="margin-top: 30px;">Merci de votre confiance ! 🚀</p>
                <p style="margin: 5px 0;"><strong>L'équipe UniversWeb</strong></p>
              </div>
              
              <div class="footer">
                <p>© ${new Date().getFullYear()} UniversWeb - Création de sites web professionnels au Sénégal</p>
                <p style="font-size: 12px; color: #999;">Cet email a été envoyé automatiquement, merci de ne pas y répondre directement.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-quote-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
