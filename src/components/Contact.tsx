import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      label: "Téléphone",
      value: "775936938",
      link: "tel:+221775936938",
      linkText: "+221 77 593 69 38"
    },
    {
      icon: Mail,
      label: "Email",
      value: "universwebsaconsulting090@gmail.com",
      link: "mailto:universwebsaconsulting090@gmail.com",
      linkText: "universwebsaconsulting090@gmail.com"
    },
    {
      icon: MapPin,
      label: "Localisation",
      value: "Sénégal",
      linkText: "Sénégal"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.08),transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 space-y-6 animate-fade-in">
          <div className="inline-block px-6 py-2 bg-primary/10 rounded-full mb-2">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Parlons de votre projet</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight">
            Contactez-nous
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
            Prêt à démarrer votre projet ? Nous sommes là pour vous accompagner
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="border-border/50 shadow-[var(--shadow-hover)] bg-gradient-to-br from-card to-card/50 backdrop-blur-sm overflow-hidden relative group">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--secondary)))] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" 
                 style={{ padding: '2px' }}>
              <div className="w-full h-full bg-card rounded-lg" />
            </div>
            
            <CardHeader className="text-center pb-10 pt-12">
              <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Démarrons ensemble
              </CardTitle>
              <CardDescription className="text-lg mt-4">
                Contactez-nous dès aujourd'hui pour obtenir un devis gratuit et personnalisé
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-10 pb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index}
                    className="group/item flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 hover:from-muted hover:to-muted/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-card)] animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary-glow)))] flex items-center justify-center group-hover/item:scale-110 group-hover/item:rotate-6 transition-all duration-500 shadow-[var(--shadow-card)]">
                        <info.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    <h3 className="font-bold text-lg text-foreground mb-3 group-hover/item:text-primary transition-colors duration-300">
                      {info.label}
                    </h3>
                    
                    {info.link ? (
                      <a 
                        href={info.link}
                        className="text-primary hover:text-primary-glow transition-colors break-all font-medium hover:underline"
                      >
                        {info.linkText}
                      </a>
                    ) : (
                      <p className="text-muted-foreground font-medium">{info.linkText}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-8 text-center">
                <Button 
                  size="lg"
                  className="text-lg px-12 py-7 shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-hover)] group/btn transition-all duration-300"
                  asChild
                >
                  <a href="tel:+221775936938">
                    <Phone className="mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
                    Appelez-nous maintenant
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
