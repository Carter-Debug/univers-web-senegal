import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Smartphone, Building2 } from "lucide-react";

const PaymentOptions = () => {
  const paymentMethods = [
    {
      category: "Mobile Money",
      icon: Smartphone,
      methods: [
        { name: "Wave", color: "text-blue-600" },
        { name: "Orange Money", color: "text-orange-600" },
        { name: "YAS", color: "text-green-600" },
        { name: "Wizall", color: "text-purple-600" },
        { name: "Keyzen", color: "text-indigo-600" }
      ]
    },
    {
      category: "Cartes Bancaires",
      icon: CreditCard,
      methods: [
        { name: "Visa", color: "text-blue-700" },
        { name: "UBA", color: "text-red-600" }
      ]
    },
    {
      category: "Paiement International",
      icon: Building2,
      methods: [
        { name: "PayPal", color: "text-blue-500" }
      ]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--secondary)/0.05),transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-6 animate-fade-in">
          <div className="inline-block px-6 py-2 bg-primary/10 rounded-full mb-2">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Paiement sécurisé</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight">
            Moyens de paiement
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
            Payez facilement avec votre méthode préférée
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {paymentMethods.map((category, idx) => (
            <Card 
              key={idx}
              className="border-border/50 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-card to-card/50 animate-scale-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary-glow)))] flex items-center justify-center mb-4 shadow-[var(--shadow-card)]">
                  <category.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl font-bold">{category.category}</CardTitle>
                <CardDescription>Paiement sécurisé</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {category.methods.map((method, i) => (
                    <li 
                      key={i}
                      className="flex items-center justify-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200"
                    >
                      <span className={`font-semibold ${method.color}`}>
                        {method.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto border-border/50 bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm">
            <CardContent className="pt-6">
              <p className="text-lg text-muted-foreground">
                💳 Tous les paiements sont sécurisés et traités avec les plus hauts standards de sécurité
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PaymentOptions;
