import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import testimonialAmadou from "@/assets/testimonial-amadou.jpg";
import testimonialFatou from "@/assets/testimonial-fatou.jpg";
import testimonialMamadou from "@/assets/testimonial-mamadou.jpg";
import testimonialAissatou from "@/assets/testimonial-aissatou.jpg";
import testimonialOusmane from "@/assets/testimonial-ousmane.jpg";
import testimonialKhady from "@/assets/testimonial-khady.jpg";

const testimonials = [
  {
    name: "Amadou Diop",
    company: "Diop & Frères SARL",
    location: "Dakar",
    content: "Univers Web SA a créé un site vitrine magnifique pour notre entreprise. Leur professionnalisme et leur réactivité sont exceptionnels. Je recommande vivement leurs services !",
    rating: 5,
    avatar: testimonialAmadou
  },
  {
    name: "Fatou Sène",
    company: "ONG Solidarité Sénégal",
    location: "Thiès",
    content: "Grâce à leur expertise, nous avons maintenant une plateforme moderne qui nous permet de mieux communiquer avec nos donateurs. Une équipe à l'écoute et très compétente.",
    rating: 5,
    avatar: testimonialFatou
  },
  {
    name: "Mamadou Ba",
    company: "Ba Commerce",
    location: "Saint-Louis",
    content: "Notre site e-commerce fonctionne parfaitement ! Les ventes ont augmenté de 40% depuis le lancement. Merci à toute l'équipe d'Univers Web SA Consulting.",
    rating: 5,
    avatar: testimonialMamadou
  },
  {
    name: "Aïssatou Ndiaye",
    company: "Cabinet Ndiaye & Associés",
    location: "Dakar",
    content: "Un travail de qualité exceptionnelle. Notre site entreprise reflète parfaitement notre image professionnelle. Support technique au top !",
    rating: 5,
    avatar: testimonialAissatou
  },
  {
    name: "Ousmane Sarr",
    company: "Sarr Distribution",
    location: "Mbour",
    content: "Excellent service ! Notre boutique en ligne est fluide et performante. Les clients peuvent maintenant commander facilement nos produits partout au Sénégal.",
    rating: 5,
    avatar: testimonialOusmane
  },
  {
    name: "Khady Diallo",
    company: "Diallo Consulting",
    location: "Dakar",
    content: "Une équipe professionnelle qui comprend vraiment les besoins des entreprises sénégalaises. Le site est moderne, rapide et optimisé. Bravo !",
    rating: 5,
    avatar: testimonialKhady
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,hsl(var(--primary)/0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,hsl(var(--secondary)/0.08),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 space-y-6 animate-fade-in">
          <div className="inline-block px-6 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Témoignages</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight">
            Ce Que Disent Nos Clients
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
            Des entrepreneurs sénégalais satisfaits de nos services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all duration-500 hover:-translate-y-2 border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient border effect on hover */}
              <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--secondary)))] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" 
                   style={{ padding: '2px' }}>
                <div className="w-full h-full bg-card rounded-lg" />
              </div>
              
              <CardContent className="p-6 space-y-4">
                {/* Rating stars */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))] transition-transform duration-300 group-hover:scale-110"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>

                {/* Testimonial content */}
                <p className="text-muted-foreground leading-relaxed min-h-[120px] group-hover:text-foreground transition-colors duration-300">
                  "{testimonial.content}"
                </p>

                {/* Author info */}
                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  <div className="relative">
                    <img 
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover group-hover:scale-110 transition-transform duration-300 shadow-[var(--shadow-card)] border-2 border-primary/20"
                    />
                    {/* Decorative glow */}
                    <div className="absolute inset-0 w-12 h-12 rounded-full bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.company}
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
