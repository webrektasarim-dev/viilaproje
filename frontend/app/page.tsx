import VideoHero from "@/components/home/VideoHero";
import SearchSection from "@/components/home/SearchSection";
import FeaturedVillas from "@/components/home/FeaturedVillas";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <>
      <VideoHero />
      <SearchSection />
      <FeaturedVillas />
      <Features />
      <Testimonials />
      <CallToAction />
    </>
  );
}

