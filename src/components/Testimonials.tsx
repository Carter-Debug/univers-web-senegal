import amadou from "@/assets/testimonial-amadou.jpg";
import fatou from "@/assets/testimonial-fatou.jpg";
import mamadou from "@/assets/testimonial-mamadou.jpg";
import khady from "@/assets/testimonial-khady.jpg";

const quotes = [
  { name: "Mamadou Ba", role: "Ba Commerce, Saint-Louis", img: mamadou, text: "On vend maintenant à Dakar et Ziguinchor sans bouger. Les clients paient par Wave directement sur le site." },
  { name: "Fatou Sène", role: "ONG Solidarité Sénégal", img: fatou, text: "Omar a compris ce qu'on voulait dès le premier appel. Les donateurs trouvent enfin nos projets." },
  { name: "Amadou Diop", role: "Diop & Frères SARL", img: amadou, text: "Livré en trois semaines. Quand j'ai eu un souci de mot de passe, il a répondu le soir même." },
  { name: "Khady Diallo", role: "Diallo Consulting", img: khady, text: "Simple, rapide, et je peux changer mes textes toute seule." },
];

const Testimonials = () => {
  const [first, ...rest] = quotes;
  return (
    <section className="max-w-3xl mx-auto px-5 py-20 border-t border-border">
      <h2 className="text-4xl mb-10">Ils en parlent</h2>
      <figure className="border-l-2 border-primary pl-6">
        <blockquote className="font-serif text-3xl leading-snug">« {first.text} »</blockquote>
        <figcaption className="mt-5 flex items-center gap-3 text-sm">
          <img src={first.img} alt="" className="w-10 h-10 rounded-full object-cover" />
          <span><strong className="font-medium">{first.name}</strong> — {first.role}</span>
        </figcaption>
      </figure>
      <div className="mt-14 grid sm:grid-cols-3 gap-8">
        {rest.map((q) => (
          <figure key={q.name} className="text-sm">
            <blockquote className="text-muted-foreground">« {q.text} »</blockquote>
            <figcaption className="mt-3 flex items-center gap-2">
              <img src={q.img} alt="" className="w-7 h-7 rounded-full object-cover" />
              <span className="font-medium">{q.name}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
