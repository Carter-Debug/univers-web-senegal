import { Facebook, Instagram, Linkedin, MessageCircle, Music } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      name: "TikTok",
      icon: Music,
      url: "https://www.tiktok.com/@univers.web.sa.consulting",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/univers_web_sa_consulting?igsh=ZDcwMXhhaWpjOXE4",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/profile.php?id=61579392244563",
    },
    {
      name: "Twitter",
      icon: Music,
      url: "https://x.com/@web22858",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: "https://wa.me/221775936938",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/univers-web-sa-consulting-235063397",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-background to-muted/30 py-16 border-t border-border/50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(var(--secondary)/0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="space-y-6">
          <div className="inline-block">
            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
              Univers Web SA Consulting
            </h3>
          </div>
          
          <div className="h-px w-40 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent" />
          
          <p className="text-lg text-muted-foreground font-medium">
            Votre partenaire digital au Sénégal
          </p>

          {/* Social Media Links */}
          <div className="flex justify-center gap-4 pt-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 hover:scale-110"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5 text-primary" />
              </a>
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Univers Web SA Consulting. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
