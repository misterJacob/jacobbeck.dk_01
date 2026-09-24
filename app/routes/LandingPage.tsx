import { entryData } from "~/data/EntryData";
import HeroSection from "../components/Hero";
import Landing from "~/components/Landing";

export function loader() {
  return { navigationEntries: entryData };
}

export default function LandingPage({ loaderData }: { loaderData: ReturnType<typeof loader> }) {
  return (
    <>
      <HeroSection />
      <Landing entries={loaderData.navigationEntries} />
    </>
  );
}
