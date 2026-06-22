import jacobAboutImg from "../assets/images/jacob_about.jpg";
import Navigation from "../components/NavBar";
export default function AboutMinimal() {
  return (
    <section className="w-full min-h-screen bg-slate-950 text-neutral-200 flex flex-col md:flex-row">
      <Navigation scrolled={false} />
      {/* LEFT COLUMN: TEXT CONTENT */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-16 lg:p-24 gap-6 max-w-3xl">
        <h4 className="font-mono text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase">
          Background // Insight
        </h4>
        <h2 className="text-4xl lg:text-5xl font-mono font-black tracking-tight text-white uppercase">
          The Journey of <br />
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Jacob Beck
          </span>
        </h2>

        <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />

        <div className="space-y-4 font-sans text-neutral-400 text-base leading-relaxed">
          <p>
            With **15 years of professional taxi driving** experience, I have
            developed deep expertise in real-world spatial navigation, timeline
            planning, and client management. Combined with a **2-year background
            in hotel hospitality**, my foundation is rooted deeply in service
            and precision.
          </p>
          <p>
            Parallel to my professional background runs a profound fascination
            with next-generation technology. I channel my curiosity into
            building out networks, web tools, and self-hosted server
            spaces—applying the same discipline to my code repositories that I
            use to stay active and fit every day.
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN: HERO VISUAL STAGE */}
      <div className="flex-1 relative min-h-[400px] md:min-h-screen bg-neutral-900">
        <img
          src={jacobAboutImg}
          alt="Jacob Beck"
          className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-luminosity brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-700 object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950 via-transparent to-transparent pointer-events-none w-full h-full" />
      </div>
    </section>
  );
}
