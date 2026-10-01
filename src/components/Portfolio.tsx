import { useState } from "react";
import v1 from "@/assets/portfolio-vitrine.jpg";
import v2 from "@/assets/portfolio-vitrine-2.jpg";
import v3 from "@/assets/portfolio-vitrine-3.jpg";
import e1 from "@/assets/portfolio-entreprise.jpg";
import e2 from "@/assets/portfolio-entreprise-2.jpg";
import e3 from "@/assets/portfolio-entreprise-3.jpg";
import o1 from "@/assets/portfolio-ong.jpg";
import o2 from "@/assets/portfolio-ong-2.jpg";
import o3 from "@/assets/portfolio-ong-3.jpg";
import c1 from "@/assets/portfolio-ecommerce.jpg";
import c2 from "@/assets/portfolio-ecommerce-2.jpg";
import c3 from "@/assets/portfolio-ecommerce-3.jpg";

type Cat = "Tous" | "Vitrine" | "Entreprise" | "ONG" | "E-commerce";
const projects: { title: string; place: string; cat: Exclude<Cat, "Tous">; img: string }[] = [
  { title: "Restaurant Teranga", place: "Plateau", cat: "Vitrine", img: v2 },
  { title: "Diop & Frères", place: "Dakar", cat: "Entreprise", img: e1 },
  { title: "Solidarité Sénégal", place: "Thiès", cat: "ONG", img: o1 },
  { title: "Ba Commerce", place: "Saint-Louis", cat: "E-commerce", img: c1 },
  { title: "Hôtel Les Filaos", place: "Saly", cat: "Vitrine", img: v3 },
  { title: "Kaay Tech", place: "Dakar", cat: "Entreprise", img: e3 },
  { title: "École pour tous", place: "Kaolack", cat: "ONG", img: o2 },
  { title: "Artisanat Soumbédioune", place: "Dakar", cat: "E-commerce", img: c2 },
  { title: "Cabinet Ndiaye", place: "Dakar", cat: "Vitrine", img: v1 },
  { title: "Fintech Jàmm", place: "Dakar", cat: "Entreprise", img: e2 },
  { title: "Santé Communautaire", place: "Ziguinchor", cat: "ONG", img: o3 },
  { title: "Lekk Livraison", place: "Mbour", cat: "E-commerce", img: c3 },
];
const cats: Cat[] = ["Tous", "Vitrine", "Entreprise", "ONG", "E-commerce"];

const Portfolio = () => {
  const [cat, setCat] = useState<Cat>("Tous");
  const [all, setAll] = useState(false);
  const list = projects.filter((p) => cat === "Tous" || p.cat === cat);
  const shown = all ? list : list.slice(0, 4);

  return (
    <section id="portfolio" className="max-w-3xl mx-auto px-5 py-20 border-t border-border">
      <h2 className="text-4xl">Quelques sites livrés</h2>
      <div className="mt-6 flex flex-wrap gap-2 text-sm" role="tablist">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => { setCat(c); setAll(false); }}
            className={`px-3 py-1 border rounded-sm transition-colors ${cat === c ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-10">
        {shown.map((p, i) => (
          <article key={p.title} className={i % 3 === 0 ? "sm:col-span-2" : ""}>
            <img src={p.img} alt={p.title} loading="lazy" className="w-full aspect-[16/10] object-cover rounded-sm bg-muted" />
            <div className="mt-3 flex justify-between text-sm">
              <span className="font-medium">{p.title}</span>
              <span className="text-muted-foreground">{p.cat} · {p.place}</span>
            </div>
          </article>
        ))}
      </div>

      {list.length > 4 && (
        <button onClick={() => setAll(!all)} className="mt-10 text-sm underline underline-offset-4">
          {all ? "Afficher moins" : `Voir les ${list.length - 4} autres`}
        </button>
      )}
    </section>
  );
};

export default Portfolio;
