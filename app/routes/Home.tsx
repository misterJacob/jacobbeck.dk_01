import type { Route } from "./+types/Home";
import { useEffect, useState } from "react";

import { entryData } from "~/data/EntryData";

import Navigation from "~/components/NavBar";
import HeroSection from "../components/Hero";
import Landing from "~/components/Landing";
import Footer from "~/components/Footer";


export function loader() {
  // The route file acts as the data gatekeeper
  return { navigationEntries: entryData };
}


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Jacob Beck 2026" },
    { name: "description", content: "Getting  back in the saddel!" },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
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
      <Landing entries={loaderData.navigationEntries} />
      <Footer />
    </main>
  );
}
