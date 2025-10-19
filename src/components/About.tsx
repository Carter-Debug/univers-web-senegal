import { CheckCircle2 } from "lucide-react";

const About = () => {
  const advantages = [
    "Expertise locale au Sénégal",
    "Solutions sur mesure",
    "Support continu",
    "Prix compétitifs",
    "Technologies modernes",
    "Livraison rapide"
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-block px-6 py-2 bg-secondary/10 rounded-full mb-2">
                <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Notre Engagement</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight leading-tight">
                À Propos d'
                <span className="bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
                  Univers Web SA
                </span>
              </h2>
            </div>
            
            <div className="space-y-5">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Basée au Sénégal, <span className="text-primary font-bold">Univers Web SA Consulting</span> est votre partenaire de confiance pour la création de sites web professionnels. Nous mettons notre expertise au service de votre réussite digitale.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Que vous soyez une entreprise, une ONG ou un entrepreneur, nous créons des solutions web modernes, performantes et adaptées à vos besoins spécifiques.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-5 pt-6">
              {advantages.map((advantage, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 group animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <span className="text-foreground font-medium group-hover:text-primary transition-colors duration-300">
                    {advantage}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-slide-up lg:ml-8">
            {/* Decorative glow */}
            <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--secondary)))] rounded-3xl blur-2xl opacity-20 animate-float" />
            
            <div className="relative aspect-square rounded-3xl bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary-glow)),hsl(var(--secondary)))] p-[3px] shadow-[var(--shadow-hover)]">
              <div className="w-full h-full rounded-3xl bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center space-y-6 p-10">
                  <div className="relative inline-block">
                    <div className="text-7xl md:text-8xl font-black bg-gradient-to-br from-primary via-primary-glow to-secondary bg-clip-text text-transparent animate-float">
                      100%
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary blur-2xl opacity-30" />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-2xl md:text-3xl font-bold text-foreground">
                      Satisfaction Client
                    </p>
                    <div className="h-1 w-24 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full" />
                  </div>
                  
                  <p className="text-lg text-muted-foreground font-medium">
                    Notre priorité : votre succès digital
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
