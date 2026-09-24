import { useEffect, useState } from "react";
import { Outlet } from "react-router";

import Navigation from "~/components/NavBarAI";
import Footer from "~/components/Footer";

export default function SiteLayout() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navigation scrolled={scrolled} />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
