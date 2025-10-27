import { Play, Globe, Code, Rocket, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import promoBackground from "@/assets/promo-background.jpg";

const Video = () => {
  return (
    <section id="video" className="py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Advertisement */}
        <div className="max-w-5xl mx-auto">
          <Card className="overflow-hidden border-primary/30 shadow-2xl animate-fade-in">
            <div className="relative bg-gradient-to-br from-primary via-primary/90 to-accent p-12 md:p-16 text-center">
              {/* African Background Image */}
              <div className="absolute inset-0 opacity-20">
                <img 
                  src={promoBackground} 
                  alt="African team working" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full" />
                <div className="absolute bottom-10 right-10 w-40 h-40 border-2 border-white rounded-full" />
                <div className="absolute top-1/2 left-1/4 w-24 h-24 border-2 border-white rounded-full" />
              </div>

              <div className="relative z-10 space-y-8">
                {/* Logo/Brand */}
                <div className="inline-block">
                  <Globe className="h-20 w-20 text-white mx-auto mb-4 animate-pulse" />
                </div>

                {/* Main Headline */}
                <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                  Univers Web SA Consulting
                </h2>
                
                <p className="text-xl md:text-2xl text-white/90 font-medium max-w-3xl mx-auto">
                  Votre Partenaire Digital en Afrique
                </p>

                {/* Services Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
                    <Globe className="h-10 w-10 text-white mx-auto mb-3" />
                    <p className="text-white font-semibold text-sm">Sites Vitrine</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
                    <Code className="h-10 w-10 text-white mx-auto mb-3" />
                    <p className="text-white font-semibold text-sm">Sites Entreprise</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
                    <Users className="h-10 w-10 text-white mx-auto mb-3" />
                    <p className="text-white font-semibold text-sm">Sites ONG</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
                    <Rocket className="h-10 w-10 text-white mx-auto mb-3" />
                    <p className="text-white font-semibold text-sm">E-commerce</p>
                  </div>
                </div>

                {/* Value Propositions */}
                <div className="grid md:grid-cols-3 gap-6 mt-12 text-white">
                  <div className="space-y-2">
                    <div className="text-5xl font-bold">100+</div>
                    <div className="text-lg opacity-90">Sites Créés</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-5xl font-bold">5+</div>
                    <div className="text-lg opacity-90">Années d'Expérience</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-5xl font-bold">99%</div>
                    <div className="text-lg opacity-90">Clients Satisfaits</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                  <a 
                    href="#contact" 
                    className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-bold hover:scale-105 transition-transform duration-300 shadow-lg"
                  >
                    Démarrez Votre Projet
                    <Play className="h-5 w-5" />
                  </a>
                  <a 
                    href="#portfolio" 
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-white/20 transition-all duration-300"
                  >
                    Voir Nos Réalisations
                  </a>
                </div>

                {/* Trust Badge */}
                <p className="text-white/80 text-sm mt-8">
                  🌍 Présent en Afrique de l'Ouest | 🚀 Solutions Modernes | 💼 Service Premium
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Video;
