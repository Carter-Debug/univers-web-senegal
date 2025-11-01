import Hero from "@/components/Hero";
import Company from "@/components/Company";
import Services from "@/components/Services";
import PremiumServices from "@/components/PremiumServices";
import Portfolio from "@/components/Portfolio";
import Video from "@/components/Video";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Company />
      <Services />
      <PremiumServices />
      <Portfolio />
      <Video />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Index;
