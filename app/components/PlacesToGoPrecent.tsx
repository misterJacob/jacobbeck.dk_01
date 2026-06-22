import React, { use } from "react";
import { Link } from "react-router";
import { useState } from "react";
import ButtonGoTo from "./ButtonGoTo";

import { entryData, type NavigationEntry } from "../data/EntryData";
import type { Route } from "../"; 

export function loader() {
  return { navigationEntries: entryData };
}
export default function PlacesToGo({ loaderData }: Route.ComponentProps) {
  const { navigationEntries } = loaderData;
  console.log("loaderData");
  return (
    <div
      id="placestogo"
      className=" min-h-screen py-16 sm:py-20 px-10 sm:px-6 lg:px-8 relative"
    >
      {navigationEntries.map((entry) => (
        <div key={entry.id}>{entry.title}</div>
      ))}
      <h1>Places To GO </h1>

      <ButtonGoTo />
    </div>
  );
}
