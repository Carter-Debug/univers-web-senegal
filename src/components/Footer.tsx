const Footer = () => {
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
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Univers Web SA Consulting. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
