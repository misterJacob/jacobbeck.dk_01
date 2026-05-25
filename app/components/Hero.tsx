import React from "react";
import { ArrowRight, ChevronDown, Sparkles, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { entryData, type NavigationEntry } from "../data/EntryData";
import { Link } from "react-router";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("PlacesToGo");
  const currentCard = entryData.find((item) => item.title === activeTab);

  const getImageUrl = (imageName: string) => {
    return `/images/hero_images/${imageName}`;
  };

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // const activeTab: string = "PlacesToGo";
  const currentFloatingCard = entryData.find(
    (item) => item.title === activeTab,
  );
  // console.log(activeTab);
  // const currentFloatingCard = entryData[activeTab];
  return (
    <section
      id="top"
      className="Hero relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />
      <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="hero_card_wrapper max-w-7xl mx-auto text-center relative w-full">
        <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-2 text-center lg:text-left gap-6 sm:gap-8 lg:gap-12 items-center relative">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4 sm:mb-6 animate-in slide-in-from-bottom duration-700">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-xs sm:text-sm text-blue-300">
                Places To Go
              </span>
            </div>

            <h1 className="text-5xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-4 sm:mb-6 animate-in slide-in-from-bottom duration-700 delay-100 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent block mb-1 sm:mb-2">
                Absolute The
              </span>
              <span className="bg-gradient-to-b from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent block mb-1 sm:mb-2">
                Places You
              </span>
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent block mb-1 sm:mb-2">
                Must See
              </span>
            </h1>
            {/* rightside */}
            <p className="text-md sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8 animate-in slide-in-from-bottom duration-700 delay-200 leading-relaxed">
              To explore Gran Canaria is to wander through a miniature continent
              where every hidden caldera and golden dune tells a story. Capture
              the moment as the sun dips below the Atlantic, turning the peaks
              into a timeless silhouette of pure wonder.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-12 animate-in slide-in-from-bottom duration-700 delay-300">
              <button className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-b from-blue-600 to-blue-400 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-102 flex items-center justify-center space-x-2">
                <span>
                  Go Explore some secondhand items in online marketplaces
                </span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <button className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-white/10 flex items-center justify-center space-x-2">
                <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 duration-300 transition-colors">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                </div>
                <span>Watch a short photo compilation of the island</span>
              </button>
            </div>
          </div>
          <div className="relative order-2 w-full">
            <div className="relative bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/10">
              <div className="bg-gradient-to-br from-gray-900/20 to-gray-800/20 backdrop-blur-sm rounded-lg overflow-hidden h-[280px] sm:h-[350px] lg:h-[450px] border border-white/5">
                {/* IDE HEADER */}
                <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-white/5 backdrop-blur-sm border-b border-white/10">
                  <div className="flex items-center space-x-1 sm-space-x-2">
                    <div className="flex items-center space-x-1 sm:space-x-2 ">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-xs sm-text-sm text-grey-300">
                      Enjoy The GC
                    </span>
                  </div>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                </div>
                {/* content */}
                <div className="p-3 sm:p-4 relative h-full">
                  <div className="card-nav-container flex space-x-1 sm:space-x-2 mb-3 sm:mb-4 overflow-x-auto">
                    {entryData.map((tab) => {
                      const isSelected = activeTab === tab.title;

                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.title)}
                          className={`px-4 py-2 text-xs sm:text-sm rounded-t-lg border-t border-x transition-all duration-200 whitespace-nowrap ${
                            isSelected
                              ? "bg-blue-500/30 text-white border-blue-400/20 font-semibold"
                              : "bg-white/5 text-gray-400 border-transparent hover:bg-white/10 hover:text-gray-200"
                          }`}
                        >
                          {/* This replaces hardcoded names with the database labels */}
                          {tab.title === "PlacesToGo"
                            ? "Places To Go"
                            : tab.title}
                        </button>
                      );
                    })}
                  </div>

                  {/* Dunamic Display */}
                  <div>
                    {currentCard && (
                      <div
                        className={`p-6 rounded-2xl border border-white/5 backdrop-blur-md transition-all duration-300 ${currentCard.bgColor}`}
                      >
                        <Link
                          to={currentCard.path}
                          className="hello flex w-full h-full flex-col md:flex-row gap-6 items-center"
                        >
                          {/* Dynamic Image frame */}
                          <div className="w-full h-full md:w-1/3 aspect-video rounded-xl overflow-hidden bg-black/20">
                            <img
                              src={getImageUrl(currentCard.image)}
                              alt={currentCard.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Dynamic Typography using your custom style string tokens */}
                          <div className="flex-1 space-y-2">
                            <h3
                              className={`text-2xl font-bold tracking-tight ${currentCard.textColor}`}
                            >
                              {currentCard.title}
                            </h3>
                            <p
                              className={`text-sm leading-relaxed ${currentCard.contentColor}`}
                            >
                              {currentCard.description}
                            </p>

                            {/* Example icon/action frame using your icon token */}
                            <div
                              className={`text-xs font-mono uppercase tracking-wider pt-2 ${currentCard.iconColor}`}
                            >
                              ★ System Status: Loaded Route {currentCard.path}
                            </div>
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <img src={MyTaxi} alt="" /> */}
      </div>
    </section>
  );
}
// ../assets/images/hero_images/myTaxi.jpg
