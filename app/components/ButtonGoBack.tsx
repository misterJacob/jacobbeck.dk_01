import { ArrowBigLeft, Sparkles } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { entryData } from "~/data/EntryData";

const ButtonGoBack = () => {
  return (
    <Link to="/" className="flex">
      <div className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-102 flex items-center justify-center space-x-2">
        <Sparkles className="w-4 h-4 text-blue-900" />
        <span>Go Back</span>
        <ArrowBigLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </Link>
  );
};

export default ButtonGoBack;
