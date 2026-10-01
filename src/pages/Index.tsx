import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import QuoteRequest from "@/components/QuoteRequest";
import PaymentOptions from "@/components/PaymentOptions";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";

const Index = () => (
  <div className="min-h-screen">
    <Hero />
    <main>
      <Services />
      <Portfolio />
      <Testimonials />
      <QuoteRequest />
      <PaymentOptions />
      <Contact />
    </main>
    <Footer />
    <AIAssistant />
  </div>
);

export default Index;
