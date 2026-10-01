const rows = [
  { k: "Téléphone", v: "+221 77 593 69 38", href: "tel:+221775936938" },
  { k: "WhatsApp", v: "Écrire un message", href: "https://wa.me/221775936938" },
  { k: "Email", v: "universwebsaconsulting090@gmail.com", href: "mailto:universwebsaconsulting090@gmail.com" },
  { k: "Adresse", v: "Dakar, Sénégal" },
  { k: "Horaires", v: "Lun – sam, 9h – 19h" },
];

const Contact = () => (
  <section id="contact" className="max-w-3xl mx-auto px-5 py-20 border-t border-border">
    <h2 className="text-4xl">Nous joindre</h2>
    <p className="mt-2 text-muted-foreground">Le plus rapide : un message WhatsApp. On répond en général dans l'heure.</p>
    <dl className="mt-8 divide-y divide-border border-y border-border text-sm">
      {rows.map((r) => (
        <div key={r.k} className="py-3 grid grid-cols-[110px_1fr] gap-4">
          <dt className="text-muted-foreground">{r.k}</dt>
          <dd className="break-all">
            {r.href ? <a href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="hover:text-primary underline-offset-4 hover:underline">{r.v}</a> : r.v}
          </dd>
        </div>
      ))}
    </dl>
  </section>
);

export default Contact;
