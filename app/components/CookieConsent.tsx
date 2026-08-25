import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Runs strictly on the client side to avoid SSR hydration mismatches
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setIsVisible(false);
  };

  return (
    /* 👇 The parser needs these outer tags to know it's looking at UI code */
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 p-5 rounded-2xl bg-neutral-900/95 border border-neutral-800 backdrop-blur-md shadow-2xl text-white"
        >
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold tracking-wide">
              Cookie Preference380296s
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We use minimal essential local storage and cookies to ensure
              smooth navigation and site functionality.
            </p>
            <div className="flex items-center justify-end gap-2 mt-1">
              <button
                onClick={handleDecline}
                className="px-3 py-1.5 text-xs font-medium rounded-lg text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition-colors"
              >
                Essential Only
              </button>
              <button
                onClick={handleAccept}
                className="px-3 py-1.5 text-xs font-medium rounded-lg text-neutral-950 bg-white hover:bg-neutral-200 transition-colors shadow-sm font-semibold"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
