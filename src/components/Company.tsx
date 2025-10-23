import { Sparkles, Target, Users } from "lucide-react";

const Company = () => {
  const highlights = [
    {
      icon: Sparkles,
      title: "Innovation",
      description: "Des solutions web modernes et performantes"
    },
    {
      icon: Target,
      title: "Excellence",
      description: "Un engagement qualité sans compromis"
    },
    {
      icon: Users,
      title: "Accompagnement",
      description: "À vos côtés à chaque étape"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,hsl(var(--primary)/0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,hsl(var(--secondary)/0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main content */}
          <div className="text-center mb-16 space-y-8 animate-fade-in">
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Qui sommes-nous</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight">
              Univers Web SA Consulting
            </h2>
            
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent" />
            
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-light">
              Votre partenaire digital de confiance au Sénégal. Nous créons des sites web sur mesure qui donnent vie à vos ambitions et propulsent votre activité vers le succès.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Depuis notre création à <span className="font-semibold text-primary">Dakar</span>, nous accompagnons les entreprises, ONG et entrepreneurs sénégalais dans leur transformation digitale. Notre mission : concevoir des solutions web performantes, élégantes et accessibles qui répondent parfaitement à vos besoins.
            </p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="group text-center p-8 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-hover)] animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative inline-block mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary-glow)))] flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-[var(--shadow-card)]">
                    <highlight.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {highlight.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Company;
