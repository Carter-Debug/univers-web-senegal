import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FileText, Loader2 } from "lucide-react";

const QuoteRequest = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    service_type: "",
    description: "",
    promo_code: ""
  });

  const serviceTypes = [
    { value: "vitrine", label: "Site Vitrine", basePrice: 150000 },
    { value: "ecommerce", label: "Site E-commerce", basePrice: 300000 },
    { value: "entreprise", label: "Site Entreprise", basePrice: 400000 },
    { value: "ong", label: "Site ONG/Association", basePrice: 250000 },
    { value: "premium", label: "Site Premium (>500K)", basePrice: 750000 }
  ];

  // Calculer le prix estimé basé sur le type de service sélectionné
  const selectedService = serviceTypes.find(s => s.value === formData.service_type);
  const estimatedPrice = selectedService?.basePrice || 0;
  const isPromoCodeDisabled = estimatedPrice < 500000;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const selectedService = serviceTypes.find(s => s.value === formData.service_type);
      let estimatedPrice = selectedService?.basePrice || 0;
      let discountPercentage = 0;
      let finalPrice = estimatedPrice;

      // Check promo code
      if (formData.promo_code) {
        const { data: promoData } = await supabase
          .from("promo_codes")
          .select("*")
          .eq("code", formData.promo_code.toUpperCase())
          .eq("active", true)
          .maybeSingle();

        if (promoData && estimatedPrice >= promoData.min_amount) {
          discountPercentage = promoData.discount_percentage;
          finalPrice = estimatedPrice * (1 - discountPercentage / 100);
        }
      }

      console.log("📝 Enregistrement du devis dans la base de données...");
      const { error } = await supabase
        .from("quotes")
        .insert({
          client_name: formData.client_name,
          client_email: formData.client_email,
          client_phone: formData.client_phone,
          service_type: formData.service_type,
          description: formData.description,
          promo_code: formData.promo_code.toUpperCase() || null,
          estimated_price: estimatedPrice,
          discount_percentage: discountPercentage,
          final_price: finalPrice,
          status: "pending"
        });

      if (error) {
        console.error("❌ Erreur lors de l'enregistrement du devis:", error);
        throw error;
      }

      console.log("✅ Devis enregistré avec succès!");
      console.log(`📧 Envoi automatique de la facture à ${formData.client_email}...`);

      // AUTOMATISATION: Envoi automatique de la facture par email au client
      const emailResult = await supabase.functions.invoke('send-quote-email', {
        body: {
          client_name: formData.client_name,
          client_email: formData.client_email,
          client_phone: formData.client_phone,
          service_type: formData.service_type,
          description: formData.description,
          estimated_price: estimatedPrice,
          final_price: finalPrice,
          discount_percentage: discountPercentage,
          promo_code: formData.promo_code || undefined
        }
      });
      
      if (emailResult.error) {
        console.error("❌ Erreur lors de l'envoi de la facture par email:", emailResult.error);
        toast.error("Erreur d'envoi de la facture", {
          description: `Le devis est enregistré mais la facture n'a pas pu être envoyée à ${formData.client_email}. Nous vous contacterons directement.`,
          duration: 8000
        });
      } else {
        console.log("✅ Facture envoyée avec succès par email!");
        console.log("📧 Email envoyé à:", formData.client_email);
        toast.success("✅ Facture envoyée automatiquement!", {
          description: `Une facture professionnelle (${finalPrice.toLocaleString()} FCFA${discountPercentage > 0 ? ` avec ${discountPercentage}% de réduction` : ""}) a été envoyée automatiquement à ${formData.client_email}. Vérifiez votre boîte email.`,
          duration: 8000
        });
      }

      setFormData({
        client_name: "",
        client_email: "",
        client_phone: "",
        service_type: "",
        description: "",
        promo_code: ""
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Erreur lors de l'envoi de la demande");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="quote" className="py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.08),transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-6 animate-fade-in">
          <div className="inline-block px-6 py-2 bg-primary/10 rounded-full mb-2">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Demande de devis</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight">
            Obtenez votre devis
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
            Remplissez le formulaire et recevez un devis personnalisé sous 24h
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="border-border/50 shadow-[var(--shadow-hover)] bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary-glow)))] flex items-center justify-center mb-4 shadow-[var(--shadow-card)]">
                <FileText className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-3xl font-bold">Demande de devis gratuit</CardTitle>
              <CardDescription className="text-lg">
                Décrivez-nous votre projet et obtenez une estimation précise
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="client_name">Nom complet *</Label>
                  <Input
                    id="client_name"
                    required
                    value={formData.client_name}
                    onChange={(e) => setFormData({...formData, client_name: e.target.value})}
                    placeholder="Votre nom"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="client_email">Email *</Label>
                    <Input
                      id="client_email"
                      type="email"
                      required
                      value={formData.client_email}
                      onChange={(e) => setFormData({...formData, client_email: e.target.value})}
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="client_phone">Téléphone *</Label>
                    <Input
                      id="client_phone"
                      type="tel"
                      required
                      value={formData.client_phone}
                      onChange={(e) => setFormData({...formData, client_phone: e.target.value})}
                      placeholder="+221 77 123 45 67"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service_type">Type de site *</Label>
                  <Select value={formData.service_type} onValueChange={(value) => setFormData({...formData, service_type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type de site" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map(service => (
                        <SelectItem key={service.value} value={service.value}>
                          {service.label} - À partir de {service.basePrice.toLocaleString()} FCFA
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description du projet *</Label>
                  <Textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Décrivez votre projet en détail..."
                    rows={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="promo_code">Code promo (optionnel)</Label>
                  <Input
                    id="promo_code"
                    value={formData.promo_code}
                    onChange={(e) => setFormData({...formData, promo_code: e.target.value})}
                    placeholder="UniversWeb25"
                    disabled={isPromoCodeDisabled}
                  />
                  {isPromoCodeDisabled ? (
                    <p className="text-sm text-amber-600 dark:text-amber-400">
                      ⚠️ Les codes promo sont uniquement disponibles pour les sites de 500.000 FCFA et plus
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Code promo disponible: <span className="font-bold text-primary">UniversWeb25</span> pour 40% de réduction sur les sites premium
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-lg py-6 shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-hover)]"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2" />
                      Demander un devis gratuit
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QuoteRequest;
