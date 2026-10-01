const offers = [
  { name: "Site vitrine", detail: "Jusqu'à 5 pages, formulaire de contact, adapté au mobile.", before: "120 000", price: "90 000" },
  { name: "Site d'entreprise", detail: "Pages services, équipe, actualités. Vous modifiez les textes vous-même.", before: "200 000", price: "150 000" },
  { name: "ONG, fondation, association", detail: "Présentation des projets, page de dons, galerie photos.", before: "250 000", price: "180 000" },
  { name: "Boutique en ligne", detail: "Catalogue, panier, paiement Wave / Orange Money / carte, suivi des commandes.", before: "300 000", price: "200 000" },
];

const premium = [
  { name: "Site sur mesure", price: "800 000" },
  { name: "Plateforme multi-services", price: "1 200 000" },
  { name: "Application web", price: "1 500 000" },
  { name: "Site + application mobile", price: "2 500 000" },
];

const Services = () => (
  <section id="services" className="max-w-3xl mx-auto px-5 py-20">
    <div className="flex items-baseline justify-between gap-4 mb-8">
      <h2 className="text-4xl">Tarifs</h2>
      <span className="text-xs text-muted-foreground">En FCFA, hébergement de la 1ʳᵉ année inclus</span>
    </div>

    <ul className="divide-y divide-border border-y border-border">
      {offers.map((o) => (
        <li key={o.name} className="py-6 grid sm:grid-cols-[1fr_auto] gap-3 sm:gap-8">
          <div>
            <h3 className="text-2xl">{o.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{o.detail}</p>
          </div>
          <div className="sm:text-right">
            <div className="text-xs text-muted-foreground line-through">{o.before}</div>
            <div className="text-2xl font-medium tabular-nums">{o.price}</div>
            <a href="#quote" className="text-sm text-primary hover:underline underline-offset-4">Demander ce site →</a>
          </div>
        </li>
      ))}
    </ul>

    <div className="mt-14 bg-foreground text-background p-6 sm:p-8 rounded-sm">
      <p className="text-xs uppercase tracking-widest opacity-70">Projets à partir de 500 000 FCFA</p>
      <h3 className="text-3xl mt-2">−40 % avec le code <span className="italic text-primary-light">UniversWeb25</span></h3>
      <p className="text-sm opacity-80 mt-2">Le code est refusé automatiquement en dessous de 500 000 FCFA.</p>
      <ul className="mt-6 text-sm divide-y divide-background/15">
        {premium.map((p) => (
          <li key={p.name} className="py-2 flex justify-between gap-4">
            <span>{p.name}</span>
            <span className="tabular-nums opacity-80">dès {p.price}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Services;
