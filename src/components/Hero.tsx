import heroImage from "@/assets/hero-image.jpg";

const nav = [
  { href: "#services", label: "Tarifs" },
  { href: "#portfolio", label: "Réalisations" },
  { href: "#quote", label: "Devis" },
  { href: "#contact", label: "Contact" },
];

const Hero = () => (
  <header className="max-w-3xl mx-auto px-5 pt-6">
    <nav className="flex items-center justify-between text-sm border-b border-border pb-4">
      <a href="#" className="font-serif text-xl">Univers Web <span className="italic">SA Consulting</span></a>
      <ul className="hidden sm:flex gap-6 text-muted-foreground">
        {nav.map((n) => (
          <li key={n.href}><a href={n.href} className="hover:text-foreground underline-offset-4 hover:underline">{n.label}</a></li>
        ))}
      </ul>
      <a href="tel:+221775936938" className="sm:hidden text-primary">Appeler</a>
    </nav>

    <section className="pt-16 pb-12">
      <p className="text-sm text-muted-foreground mb-6">Dakar · Création de sites web depuis 2020</p>
      <h1 className="text-5xl sm:text-7xl leading-[1.02]">
        On fait votre site.<br />
        <span className="italic text-primary">Vous gérez votre affaire.</span>
      </h1>
      <p className="mt-8 text-lg max-w-xl text-muted-foreground">
        Sites vitrines, sites d'entreprise, ONG et boutiques en ligne. Prix fixes, affichés plus bas.
        Livraison en 2 à 4 semaines selon le projet.
      </p>
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 items-center">
        <a href="#quote" className="bg-foreground text-background px-5 py-3 rounded-sm text-sm font-medium hover:bg-primary transition-colors">
          Demander un devis
        </a>
        <a href="https://wa.me/221775936938" target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4">
          Écrire sur WhatsApp — 77 593 69 38
        </a>
      </div>
    </section>

    <figure className="-mx-5 sm:mx-0">
      <img src={heroImage} alt="Notre équipe au travail à Dakar" className="w-full aspect-[16/9] object-cover sm:rounded-sm" />
      <figcaption className="px-5 sm:px-0 mt-2 text-xs text-muted-foreground">L'atelier, à Dakar.</figcaption>
    </figure>
  </header>
);

export default Hero;
