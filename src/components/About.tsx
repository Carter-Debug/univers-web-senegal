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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              À Propos d'Univers Web SA
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Basée au Sénégal, <span className="text-primary font-semibold">Univers Web SA Consulting</span> est votre partenaire de confiance pour la création de sites web professionnels. Nous mettons notre expertise au service de votre réussite digitale.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Que vous soyez une entreprise, une ONG ou un entrepreneur, nous créons des solutions web modernes, performantes et adaptées à vos besoins spécifiques.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{advantage}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary via-primary-glow to-accent p-1 shadow-[var(--shadow-elegant)]">
              <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    100%
                  </div>
                  <p className="text-xl font-semibold text-foreground">
                    Satisfaction Client
                  </p>
                  <p className="text-muted-foreground">
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
