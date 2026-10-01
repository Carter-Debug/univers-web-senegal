const groups = [
  { label: "Mobile money", items: ["Wave", "Orange Money", "Yas", "Wizall", "Keyzen"] },
  { label: "Carte & international", items: ["Visa", "UBA", "PayPal"] },
];

const PaymentOptions = () => (
  <section className="max-w-3xl mx-auto px-5 py-16 border-t border-border">
    <h2 className="text-3xl">Paiement</h2>
    <p className="text-sm text-muted-foreground mt-2">50 % à la commande, le reste à la mise en ligne.</p>
    <dl className="mt-6 grid sm:grid-cols-[180px_1fr] gap-y-4 text-sm">
      {groups.map((g) => (
        <div key={g.label} className="contents">
          <dt className="text-muted-foreground">{g.label}</dt>
          <dd className="flex flex-wrap gap-2">
            {g.items.map((i) => (
              <span key={i} className="px-2 py-0.5 border border-border rounded-sm">{i}</span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  </section>
);

export default PaymentOptions;
