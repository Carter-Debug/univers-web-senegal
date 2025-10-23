import { Card, CardContent } from "@/components/ui/card";
import portfolioVitrine from "@/assets/portfolio-vitrine.jpg";
import portfolioEntreprise from "@/assets/portfolio-entreprise.jpg";
import portfolioOng from "@/assets/portfolio-ong.jpg";
import portfolioEcommerce from "@/assets/portfolio-ecommerce.jpg";

const projects = [
  {
    title: "Sites Vitrine Modernes",
    description: "Design élégant et responsive pour mettre en valeur votre activité",
    image: portfolioVitrine,
    category: "Vitrine"
  },
  {
    title: "Sites Entreprise & Professionnels",
    description: "Solutions complètes adaptées aux besoins de votre entreprise",
    image: portfolioEntreprise,
    category: "Entreprise"
  },
  {
    title: "Sites ONG & Fondations",
    description: "Plateformes dédiées aux organisations pour amplifier leur impact",
    image: portfolioOng,
    category: "ONG"
  },
  {
    title: "Sites E-commerce",
    description: "Boutiques en ligne performantes pour vendre vos produits",
    image: portfolioEcommerce,
    category: "E-commerce"
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 bg-gradient-to-b from-background via-background to-muted/20 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.05),transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 space-y-6 animate-fade-in">
          <div className="inline-block px-6 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight">
            Nos Réalisations
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
            Découvrez les sites web que nous avons créés pour nos clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all duration-500 hover:-translate-y-3 border-border/50 bg-card animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image container with overlay */}
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Category badge */}
                <div className="absolute top-4 left-4 px-4 py-2 bg-primary/90 backdrop-blur-sm rounded-full">
                  <span className="text-xs font-bold text-primary-foreground uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>

              <CardContent className="p-6 space-y-3">
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </CardContent>

              {/* Hover border effect */}
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-lg transition-colors duration-500 pointer-events-none" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
