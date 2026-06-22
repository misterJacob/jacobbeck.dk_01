import React from "react";
import { Link } from "react-router";
import type { NavigationEntry } from "~/data/EntryData";
import { getImageUrl } from "~/utils/getImageUrl";
import { Sparkles, ArrowBigRight } from "lucide-react";


interface LandingProps {
  entries: NavigationEntry[];
}
console.log(getImageUrl);

function Landing({ entries }: LandingProps) {
  return (
    <div className="relative flex flex-col gap-16 sm:gap-24 max-w-6xl mx-auto px-4 py-12">
      {entries.map((entry) => {

        const isEven = entry.id % 2 === 0;
        return (
          <div
            key={entry.id}
            className={`relative group flex flex-col lg:flex-row items-center gap-8 lg:gap-16 p-6 sm:p-8 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-md transition-all duration-300 hover:border-white/10 ${
              isEven ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div
              className={`absolute inset-0 opacity-40 group-hover:opacity-60 rounded-2xl transition-all duration-500 blur-xl -z-10 ${entry.bgColor}`}
            />
            <div className="flex-1 space-y-4 w-full">
              <h1
                className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${entry.iconColor}`}
              >
                {entry.title}
              </h1>
              <div className="flex flex-col space-y-3">
                <span
                  className={`text-base sm:text-lg font-medium tracking-wide ${entry.textColor}`}
                >
                  {entry.description}
                </span>
                <p
                  className={`text-sm leading-relaxed font-light ${entry.contentColor}`}
                >
                  {entry.information}
                </p>
              </div>
            </div>
            <div className="flex-1 w-full max-w-md lg:max-w-none">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-slate-950/50 group-hover:scale-[1.01] transition-transform duration-300">
                <img
                  src={getImageUrl(entry.image)}
                  alt="{entry.description}"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />

                {/* FLOATING BUTTON: Pinned inside the bottom-right corner of the image structure */}
                <div className="absolute bottom-4 right-4 z-10">
                  <Link to={entry.pathUrl} className="flex">
                    <div
                      className={`group px-4 py-2.5 sm:px-5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-98 flex items-center space-x-2 border border-white/10 bg-slate-900/60 hover:bg-slate-800/80 ${entry.textColor}`}
                    >
                      {/* Sparkles uses the unique text token color */}
                      <Sparkles
                        className={`w-3.5 h-3.5 animate-pulse currentColor`}
                      />
                      <span>Go To {entry.title}</span>
                      <ArrowBigRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 fill-current" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Your layout mapping code here */}
          </div>
        );
})}
    </div>
  );
}

export default Landing;
