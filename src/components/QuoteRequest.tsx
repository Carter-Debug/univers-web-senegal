import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const serviceTypes = [
  { value: "vitrine", label: "Site vitrine", basePrice: 90000 },
  { value: "entreprise", label: "Site d'entreprise", basePrice: 150000 },
  { value: "ong", label: "ONG, fondation, association", basePrice: 180000 },
  { value: "ecommerce", label: "Boutique en ligne", basePrice: 200000 },
  { value: "premium", label: "Projet sur mesure", basePrice: 800000 }
];

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

      if (error) throw error;

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
        toast.error("Le devis est enregistré, mais l'email n'est pas parti", {
          description: `Nous vous rappelons au ${formData.client_phone} pour confirmer.`,
          duration: 8000
        });
      } else {
        toast.success("Devis envoyé", {
          description: `Vous recevez la facture à ${formData.client_email} dans quelques minutes.`,
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
      toast.error("L'envoi n'a pas abouti. Réessayez ou appelez le 77 593 69 38.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="quote" className="max-w-3xl mx-auto px-5 py-20 border-t border-border">
      <div className="flex items-baseline justify-between gap-4 mb-8">
        <h2 className="text-4xl">Demander un devis</h2>
        <span className="text-xs text-muted-foreground">Réponse en général sous 24 h</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="client_name">Nom complet</Label>
          <Input
            id="client_name"
            required
            value={formData.client_name}
            onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
            placeholder="Votre nom"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="client_email">Email</Label>
            <Input
              id="client_email"
              type="email"
              required
              value={formData.client_email}
              onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
              placeholder="votre@email.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client_phone">Téléphone</Label>
            <Input
              id="client_phone"
              type="tel"
              required
              value={formData.client_phone}
              onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
              placeholder="+221 77 000 00 00"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="service_type">Type de site</Label>
          <Select value={formData.service_type} onValueChange={(value) => setFormData({ ...formData, service_type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Choisissez un type de site" />
            </SelectTrigger>
            <SelectContent>
              {serviceTypes.map(service => (
                <SelectItem key={service.value} value={service.value}>
                  {service.label} — dès {service.basePrice.toLocaleString("fr-FR")} FCFA
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Votre projet</Label>
          <Textarea
            id="description"
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Quelques phrases suffisent : ce que vous vendez, ce que le site doit montrer, vos couleurs si vous y tenez."
            rows={5}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="promo_code">Code promo (facultatif)</Label>
          <Input
            id="promo_code"
            value={formData.promo_code}
            onChange={(e) => setFormData({ ...formData, promo_code: e.target.value })}
            placeholder="UniversWeb25"
            disabled={isPromoCodeDisabled}
          />
          {isPromoCodeDisabled ? (
            <p className="text-sm text-muted-foreground">
              Le code UniversWeb25 (−40 %) ne s'applique qu'aux projets à partir de 500 000 FCFA.
            </p>
          ) : (
            <p className="text-sm text-primary">
              UniversWeb25 : −40 % sur ce projet.
            </p>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi en cours…
            </>
          ) : (
            "Envoyer ma demande de devis"
          )}
        </Button>
        <p className="text-xs text-muted-foreground">
          La facture vous est envoyée par email dès validation de la demande.
        </p>
      </form>
    </section>
  );
};

export default QuoteRequest;
