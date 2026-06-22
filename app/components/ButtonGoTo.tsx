import { Sparkles, ArrowBigRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { entry } from 'virtual:react-router/server-build';
import type { NavigationEntry } from "~/data/EntryData";
interface LandingProps {
  entries: NavigationEntry[];
}


 const ButtonGoTo = ({ entries }: LandingProps) => {

  console.log( entries)
   return (
     <Link to={""} className="flex">
       <button className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-102 flex items-center justify-center space-x-2">
         <Sparkles className="w-4 h-4 text-blue-900" />
         <span>Go To {"places_to_go"}</span>
         <ArrowBigRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
       </button>
     </Link>
   );
 };
export default ButtonGoTo

