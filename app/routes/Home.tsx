import type { Route } from "./+types/Home";
import { useEffect, useState } from "react";

import Navigation from "~/components/NavBar";
import HeroSection from "../components/Hero";

import PhotoPrecent from "../components/PhotoPrecent";
import PlacesToGo from "~/components/PlacesToGo";
import Shop from "~/components/ShopPrecent";
import TaxiTansport from "~/components/TaxiTansport";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Jacob Beck 2026" },
    { name: "description", content: "Getting  back in the saddel!" },
  ];
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navigation scrolled={scrolled} />
      <HeroSection />
      {/* <Landing /> */}
      <PlacesToGo  />
      <Shop />
      <PhotoPrecent />
      <TaxiTansport />
    </main>
  );
}
