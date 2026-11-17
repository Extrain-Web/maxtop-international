import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import HowWeWork from "./components/HowWeWork";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Recognitions from "./components/Recognitions";
import Services from "./components/Services";
import SourcingFaq from "./components/SourcingFaq";
import StatsBanner from "./components/StatsBanner";
import WhyChooseUs from "./components/WhyChooseUs";
import { getSiteContent } from "@/lib/api";

export default async function Home() {
  // Stats Banner & Gallery can be switched on/off from Admin → Settings → Home Page Sections
  const { settings } = await getSiteContent();
  return (
    <main>
      <Navbar />
      <Hero></Hero>
      <Products/>
      {settings.showStatsBanner && <StatsBanner />}
      <AboutUs/>
      <Services/>
      <HowWeWork/>
      <WhyChooseUs/>
      <Recognitions/>
      {settings.showGallery && <Gallery />}
      <SourcingFaq/>
      <Footer/>
    </main>
  );
}
