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
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Contactez-nous
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Prêt à démarrer votre projet ? Nous sommes là pour vous accompagner
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-border/50 shadow-[var(--shadow-elegant)]">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl">Parlons de votre projet</CardTitle>
              <CardDescription className="text-base">
                Contactez-nous dès aujourd'hui pour obtenir un devis gratuit
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index}
                    className="flex flex-col items-center text-center p-6 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-4">
                      <info.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{info.label}</h3>
                    {info.link ? (
                      <a 
                        href={info.link}
                        className="text-primary hover:text-primary/80 transition-colors break-all"
                      >
                        {info.linkText}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{info.linkText}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-6 text-center">
                <Button 
                  size="lg"
                  className="text-lg px-8"
                  asChild
                >
                  <a href="tel:+221775936938">
                    <Phone className="mr-2" />
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
