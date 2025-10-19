import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Building2, Users, ShoppingCart } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Sites Web Vitrines Modernes",
    description: "Des sites web élégants et responsive qui mettent en valeur votre activité et attirent vos clients.",
    features: ["Design moderne", "100% responsive", "SEO optimisé", "Performance maximale"],
    price: "80.000"
  },
  {
    icon: Building2,
    title: "Sites Entreprise",
    description: "Solutions professionnelles adaptées aux besoins spécifiques de votre entreprise.",
    features: ["Interface personnalisée", "Gestion de contenu", "Multi-pages", "Support technique"],
    price: "150.000"
  },
  {
    icon: Users,
    title: "Sites pour ONG",
    description: "Plateformes dédiées aux organisations non gouvernementales pour amplifier leur impact.",
    features: ["Portail de dons", "Espace bénévoles", "Blog intégré", "Galerie photos"],
    price: "150.000"
  },
  {
    icon: ShoppingCart,
    title: "Sites E-commerce",
    description: "Boutiques en ligne complètes pour vendre vos produits partout au Sénégal et au-delà.",
    features: ["Catalogue produits", "Paiement sécurisé", "Gestion commandes", "Tableau de bord"],
    price: "200.000"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--secondary)/0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 space-y-6 animate-fade-in">
          <div className="inline-block px-6 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Excellence & Innovation</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight">
            Nos Services
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
            Des solutions web complètes pour tous vos besoins digitaux
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all duration-500 hover:-translate-y-3 border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient border effect on hover */}
              <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--secondary)))] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" 
                   style={{ padding: '2px' }}>
                <div className="w-full h-full bg-card rounded-lg" />
              </div>
              
              <CardHeader className="relative">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary-glow)))] flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-[var(--shadow-card)]">
                    <service.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  {/* Decorative glow */}
                  <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed mb-4">
                  {service.description}
                </CardDescription>
                
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--secondary)))] bg-clip-text text-transparent">
                    {service.price}
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">FCFA</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <span className="w-2 h-2 rounded-full bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--secondary)))] mr-3 group-hover:scale-125 transition-transform duration-300" />
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
