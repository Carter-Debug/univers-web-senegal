const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold">Univers Web SA Consulting</h3>
          <p className="text-primary-foreground/80">
            Votre partenaire digital au Sénégal
          </p>
          <div className="pt-4 border-t border-primary-foreground/20">
            <p className="text-sm text-primary-foreground/70">
              © {new Date().getFullYear()} Univers Web SA Consulting. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
