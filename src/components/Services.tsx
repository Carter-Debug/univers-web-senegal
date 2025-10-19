import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Building2, Users, ShoppingCart } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Sites Web Vitrines Modernes",
    description: "Des sites web élégants et responsive qui mettent en valeur votre activité et attirent vos clients.",
    features: ["Design moderne", "100% responsive", "SEO optimisé", "Performance maximale"]
  },
  {
    icon: Building2,
    title: "Sites Entreprise",
    description: "Solutions professionnelles adaptées aux besoins spécifiques de votre entreprise.",
    features: ["Interface personnalisée", "Gestion de contenu", "Multi-pages", "Support technique"]
  },
  {
    icon: Users,
    title: "Sites pour ONG",
    description: "Plateformes dédiées aux organisations non gouvernementales pour amplifier leur impact.",
    features: ["Portail de dons", "Espace bénévoles", "Blog intégré", "Galerie photos"]
  },
  {
    icon: ShoppingCart,
    title: "Sites E-commerce",
    description: "Boutiques en ligne complètes pour vendre vos produits partout au Sénégal et au-delà.",
    features: ["Catalogue produits", "Paiement sécurisé", "Gestion commandes", "Tableau de bord"]
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Nos Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Des solutions web complètes pour tous vos besoins digitaux
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="group hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-2 border-border/50"
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
