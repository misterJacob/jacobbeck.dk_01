
import React from "react";
import NavBar from "~/components/NavBar";

export default function Portfolio() {
  return (
    <>
      <div>
        <NavBar scrolled/>
        <div className="Hero relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <h1>Portfolio</h1>
        </div>
      </div>
    </>
  );
}
