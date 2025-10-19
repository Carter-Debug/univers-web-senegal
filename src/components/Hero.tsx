import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const handleContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--primary)/0.95),hsl(var(--primary)/0.75),hsl(var(--secondary)/0.60))]" />
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-glow/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-5xl mx-auto space-y-10 animate-fade-in">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-primary-foreground leading-[1.1] tracking-tight">
              Univers Web SA
              <span className="block mt-2 bg-gradient-to-r from-secondary via-secondary-light to-secondary bg-clip-text text-transparent">
                Consulting
              </span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-primary-foreground/95 max-w-3xl mx-auto font-light leading-relaxed">
              Votre partenaire digital au Sénégal pour des solutions web 
              <span className="font-semibold"> modernes et performantes</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Button 
              variant="hero" 
              size="lg"
              onClick={handleContact}
              className="text-lg px-10 py-7 shadow-[var(--shadow-hover)] hover:shadow-[var(--shadow-glow)] group"
            >
              Contactez-nous
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-lg px-10 py-7 bg-background/10 backdrop-blur-md border-2 border-primary-foreground/30 text-primary-foreground hover:bg-background/25 hover:border-primary-foreground/50 transition-all duration-300"
            >
              Nos Services
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
    </section>
  );
};

export default Hero;
