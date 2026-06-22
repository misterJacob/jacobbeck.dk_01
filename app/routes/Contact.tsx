import { Mail, Phone } from "lucide-react";
import Navigation from "~/components/NavBar";

export default function CompactContactDossier() {
  const links = [
    {
      name: "Direct Telephone",
      detail: "+34 000 000 000",
      url: "tel:+34000000000",
      color: "hover:bg-neutral-900 border-neutral-800 text-neutral-300",
      icon: <Phone className="w-4 h-4 text-emerald-400" />,
    },
    {
      name: "Direct Mail",
      detail: "contact@jacobbeck.dk",
      url: "mailto:contact@jacobbeck.dk",
      color: "hover:bg-neutral-900 border-neutral-800 text-neutral-300",
      icon: <Mail className="w-4 h-4 text-teal-400" />,
    },
    {
      name: "WhatsApp",
      detail: "Secure Messaging",
      url: "https://wa.me/34000000000",
      color: "hover:bg-green-500/10 border-green-500/20 text-green-400",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.66.986 3.288 1.498 4.76 1.499 5.485 0 9.943-4.46 9.947-9.95.002-2.66-1.019-5.162-2.877-7.02C16.602 1.824 14.108.803 11.45.803c-5.492 0-9.951 4.46-9.955 9.95-.002 1.83.473 3.614 1.378 5.211l-.994 3.63 3.72-.975zm13.167-7.045c-.122-.204-.447-.326-.935-.571-.487-.244-2.879-1.42-3.326-1.582-.447-.162-.773-.243-1.097.244-.325.487-1.26 1.582-1.544 1.907-.285.326-.57.366-1.058.122-.488-.244-2.061-.759-3.925-2.422-1.45-1.294-2.428-2.893-2.713-3.382-.284-.488-.03-.75.213-.993.22-.219.487-.569.731-.853.243-.284.325-.487.487-.813.163-.325.082-.61-.041-.854-.122-.244-1.098-2.641-1.503-3.617-.396-.952-.794-.823-1.097-.823-.284-.001-.61-.001-.936-.001-.325 0-.854.122-1.299.61-.446.488-1.707 1.668-1.707 4.067 0 2.4 1.748 4.717 1.992 5.042.245.325 3.441 5.255 8.337 7.368 1.164.503 2.074.803 2.785 1.029 1.17.371 2.237.319 3.08.193.94-.14 2.88-1.179 3.285-2.317.406-1.139.406-2.114.285-2.317z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      detail: "@JacobBeck",
      url: "https://www.instagram.com/jacob.beck.56/#",
      //url: "https://www.linkedin.com/in/jacob-beck-el-guiri"
      color:
        "hover:bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white",
      icon: (
        <svg
          className="w-4 h-4 fill-none stroke-current"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
        </svg>
      ),
    },
    {
      name: "X / Twitter",
      detail: "@JacobBeck",
      url: "https://x.com/JacobBeckGC",
      color:
        "hover:bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      detail: "Jacob Beck Profile",
      url: "https://facebook.com/yourusername",
      // url: "https://www.facebook.com/guirigandul"
      color:
        "hover:bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full min-h-screen bg-slate-950 text-neutral-400 py-20 px-4 flex flex-col items-center justify-center font-mono select-none selection:bg-emerald-500/30">
      <Navigation scrolled={false} />
      <div className="w-full max-w-md text-center space-y-6">
        {/* BRIEF BIO AVATAR FRAME */}
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">
            Jacob Beck
          </h2>
          <p className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase">
            // 15Y LOGISTICS • 2Y HOSPITALITY • TECH ENTHUSIAST
          </p>
          <p className="text-xs text-neutral-500 font-sans px-4 max-w-sm mx-auto">
            Open-door policy for all incoming data packets. Click any relay path
            below to initialize connection loops.
          </p>
        </div>

        {/* LINK DIRECTORY ARRAY */}
        <div className="flex flex-col gap-3">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={`w-full flex items-center justify-between p-4 border rounded-xl transition-all duration-150 bg-neutral-900/50 backdrop-blur-sm group active:scale-[0.99] ${link.color}`}
            >
              <div className="flex items-center gap-4">
                <div className="shrink-0 p-1 bg-neutral-950 rounded-lg border border-neutral-800 group-hover:border-neutral-700">
                  {link.icon}
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 group-hover:text-neutral-400">
                    {link.name}
                  </div>
                  <div className="text-xs font-bold mt-0.5">{link.detail}</div>
                </div>
              </div>

              {/* Little terminal-style cursor arrow */}
              <span className="text-xs text-neutral-700 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all font-mono">
                &gt;_
              </span>
            </a>
          ))}
        </div>

        {/* SECURE NETWORK NOTE */}
        <div className="text-[9px] text-neutral-600 uppercase tracking-widest pt-2">
          Location Context: Gran Canaria, Spain
        </div>
      </div>
    </section>
  );
}
