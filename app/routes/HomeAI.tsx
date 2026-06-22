import { useEffect, useState } from "react";
import { Outlet } from "react-router"; // <-- Crucial for layout rendering
import Navigation from "~/components/NavBarAI";
import Footer from "~/components/Footer";

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
      {/* The navbar stays fixed across all sub-pages */}
      <Navigation scrolled={scrolled} />

      {/* This renders whatever child route is active (LandingPage, About, Portfolio, or Contact) */}
      <div className="pt-14 sm:pt-16 md:pt-20">
        <Outlet />
      </div>

      {/* The footer stays fixed at the bottom across all sub-pages */}
      <Footer />
    </main>
  );
}
