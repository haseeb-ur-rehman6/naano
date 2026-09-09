import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Quote from "@/components/Quote";
import CreatorMarketplace from "@/components/CreatorMarketplace";
import HowItWorks from "@/components/HowItWorks";
import CaseStudy from "@/components/CaseStudy";
import Results from "@/components/Results";
import CreatorCards from "@/components/CreatorCards";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
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
