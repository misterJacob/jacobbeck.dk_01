import type { Route } from "./+types/Home";

import { entryData } from "~/data/EntryData";
import HeroSection from "~/components/Hero";
import Landing from "~/components/Landing";

export function loader() {
  return { navigationEntries: entryData };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Jacob Beck 2026" },
    { name: "description", content: "Getting  back in the saddel!" },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <HeroSection />
      <Landing entries={loaderData.navigationEntries} />
    </>
  );
}
