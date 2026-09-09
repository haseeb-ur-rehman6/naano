import Header from "@/src/frontend/components/Header";
import Hero from "@/src/frontend/components/Hero";
import Quote from "@/src/frontend/components/Quote";
import CreatorMarketplace from "@/src/frontend/components/CreatorMarketplace";
import HowItWorks from "@/src/frontend/components/HowItWorks";
import CaseStudy from "@/src/frontend/components/CaseStudy";
import Results from "@/src/frontend/components/Results";
import CreatorCards from "@/src/frontend/components/CreatorCards";
import Pricing from "@/src/frontend/components/Pricing";
import FAQ from "@/src/frontend/components/FAQ";
import FinalCTA from "@/src/frontend/components/FinalCTA";
import Footer from "@/src/frontend/components/Footer";

export default function HomeView() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Quote />
        <CreatorMarketplace />
        <HowItWorks />
        <CaseStudy />
        <Results />
        <CreatorCards />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
