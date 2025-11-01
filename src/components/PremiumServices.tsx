import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Sparkles, Zap, Rocket } from "lucide-react";

const premiumServices = [
  {
    icon: Crown,
    title: "Site Web Premium",
    description: "Solution haut de gamme avec fonctionnalités avancées et design sur-mesure.",
    features: [
      "Design 100% personnalisé",
      "Animations avancées",
      "Optimisation poussée",
      "Support prioritaire 24/7",
      "Formation complète",
      "Maintenance 6 mois offerte"
    ],
    basePrice: "800.000",
    price: "480.000"
  },
  {
    icon: Sparkles,
    title: "Plateforme Multi-services",
    description: "Plateforme complète intégrant plusieurs services et fonctionnalités complexes.",
    features: [
      "Architecture scalable",
      "API personnalisée",
      "Tableau de bord admin",
      "Intégrations multiples",
      "Gestion utilisateurs avancée",
      "Analytics en temps réel"
    ],
    basePrice: "1.200.000",
    price: "720.000"
  },
  {
    icon: Zap,
    title: "Application Web Avancée",
    description: "Application web full-stack avec fonctionnalités métier complexes.",
    features: [
      "Architecture microservices",
      "Base de données optimisée",
      "Sécurité renforcée",
      "Performance maximale",
      "Tests automatisés",
      "Documentation technique"
    ],
    basePrice: "1.500.000",
    price: "900.000"
  },
  {
    icon: Rocket,
    title: "Écosystème Digital Complet",
    description: "Solution entreprise complète avec multiples plateformes interconnectées.",
    features: [
      "Site web + App mobile",
      "CRM intégré",
      "Automatisation marketing",
      "Infrastructure cloud",
      "Support dédié",
      "Évolutions illimitées 1 an"
    ],
    basePrice: "2.500.000",
    price: "1.500.000"
  }
];

const PremiumServices = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_70%)]" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header with promo badge */}
        <div className="text-center mb-16 space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary/20 via-primary/10 to-secondary/20 rounded-full mb-4 backdrop-blur-sm border border-primary/20">
            <Crown className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-bold text-primary uppercase tracking-wider">Offre Premium Exclusive</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight">
            Sites Premium +500.000 FCFA
          </h2>
          
          <div className="flex flex-col items-center gap-4">
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
              Solutions professionnelles de haute performance
            </p>
            
            {/* Promo Code Highlight */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
              <Card className="relative bg-gradient-to-br from-card to-primary/10 border-2 border-primary/50 shadow-2xl">
                <CardContent className="p-6 text-center">
                  <Badge variant="default" className="mb-3 text-lg px-4 py-2 bg-gradient-to-r from-primary to-secondary">
                    <Sparkles className="w-4 h-4 mr-2" />
                    -40% DE RÉDUCTION
                  </Badge>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-medium">Code Promo</p>
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-background rounded-lg border-2 border-dashed border-primary">
                      <code className="text-2xl font-bold text-primary tracking-wider">UniversWeb25</code>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Applicable sur tous les services premium</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Premium Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {premiumServices.map((service, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-primary/20 hover:border-primary/50 bg-gradient-to-br from-card via-card to-primary/5 backdrop-blur-sm animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Premium badge */}
              <div className="absolute top-4 right-4 z-10">
                <Badge variant="secondary" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              </div>

              {/* Animated border gradient */}
              <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--secondary)),hsl(var(--primary)))] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 animate-gradient" 
                   style={{ padding: '2px', backgroundSize: '200% 200%' }}>
                <div className="w-full h-full bg-card rounded-lg" />
              </div>
              
              <CardHeader className="relative pt-6">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-3xl bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--secondary)))] flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl">
                    <service.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  {/* Enhanced glow effect */}
                  <div className="absolute inset-0 w-20 h-20 rounded-3xl bg-primary/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed mb-6">
                  {service.description}
                </CardDescription>
                
                {/* Pricing with discount */}
                <div className="space-y-2 p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Prix initial:</span>
                    <span className="text-lg font-semibold text-muted-foreground line-through">
                      {service.basePrice} FCFA
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="destructive" className="bg-red-500/90">-40%</Badge>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--secondary)))] bg-clip-text text-transparent">
                        {service.price}
                      </span>
                      <span className="text-sm text-muted-foreground font-medium">FCFA</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <span className="w-2 h-2 rounded-full bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--secondary)))] mr-3 mt-1.5 group-hover:scale-150 transition-transform duration-300 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-lg text-muted-foreground mb-4">
            Utilisez le code <code className="px-3 py-1 bg-primary/10 text-primary rounded font-bold">UniversWeb25</code> pour bénéficier de la réduction
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-2xl"
          >
            <Rocket className="w-5 h-5" />
            Démarrer Votre Projet Premium
          </a>
        </div>
      </div>
    </section>
  );
};

export default PremiumServices;
