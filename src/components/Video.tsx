import { Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Video = () => {
  return (
    <section id="video" className="py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
            Découvrez Notre Expertise en Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Univers Web SA Consulting : Vos experts en création de sites web vitrine, entreprise, ONG et e-commerce.
            Découvrez nos réalisations et notre savoir-faire à travers nos vidéos promotionnelles.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* French Video */}
          <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 animate-fade-in border-primary/20">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20">
                <iframe
                  className="w-full h-full absolute inset-0"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1"
                  title="Univers Web SA Consulting - Version Française"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              
              <div className="p-6 bg-card">
                <h4 className="text-xl font-semibold mb-2">Notre Expertise en Français</h4>
                <p className="text-sm text-muted-foreground">
                  Découvrez comment nous créons des sites web professionnels qui propulsent votre business en ligne.
                  Sites vitrine, entreprise, ONG et e-commerce - nous maîtrisons tous les formats.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* English Video */}
          <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 animate-fade-in border-primary/20" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-gradient-to-br from-accent/20 to-primary/20">
                <iframe
                  className="w-full h-full absolute inset-0"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1"
                  title="Univers Web SA Consulting - English Version"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              
              <div className="p-6 bg-card">
                <h4 className="text-xl font-semibold mb-2">Our Expertise in English</h4>
                <p className="text-sm text-muted-foreground">
                  Discover how we create professional websites that boost your online business.
                  Showcase, corporate, NGO and e-commerce sites - we master all formats.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <p className="text-lg text-muted-foreground mb-6">
            Prêt à transformer votre présence en ligne ?
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
          >
            Contactez-nous maintenant
            <Play className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Video;
