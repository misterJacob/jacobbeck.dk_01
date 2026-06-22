import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  UserPlus,
  LogIn,
  ArrowLeft,
} from "lucide-react";

const API_BASE = "https://preview-api.jacobbeck.dk";

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // --- MODE STATE ---
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  // --- FORM STATE ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    // Client-side barrier validation for account registration
    if (isSignUpMode && password !== confirmPassword) {
      setError("Passphrase mismatch. Ciphers must match exactly.");
      setLoading(false);
      return;
    }

    // Determine target API endpoints based on user layout preference
    const endpoint = isSignUpMode ? "/api/auth/register" : "/api/auth/login";

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Database authorization sequence rejected.",
        );
      }

      if (isSignUpMode) {
        // If they just made an account, notify them and switch back to sign-in smoothly
        setSuccess(
          "Account database record initialized! You can now authenticate.",
        );
        setIsSignUpMode(false);
        setPassword("");
        setConfirmPassword("");
      } else {
        // SUCCESS: Mount the verified token safely in browser storage
        localStorage.setItem("username", data.username);
        localStorage.setItem("token", data.token);

        // SEAMLESS REDIRECTION: Bounce back to shopping context if present
        const returnPath = searchParams.get("redirect");
        if (returnPath) {
          navigate(decodeURIComponent(returnPath));
        } else {
          navigate("/shop");
        }
      }
    } catch (err: any) {
      console.error("Auth cluster error:", err);
      setError(
        err.message || "Failure connecting to central auth cluster nodes.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 selection:bg-emerald-500/30">
      <motion.div
        layout
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-md bg-neutral-900 border border-neutral-800/80 rounded-3xl p-8 shadow-2xl flex flex-col gap-6"
      >
        <button
          type="button"
          onClick={() => navigate("/shop")} // Change to "/" if your root is different
          className="absolute rounded-xl py-1 px-1 top-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 left-6 text-neutral-500 hover:text-emerald-400 transition-colors duration-200 flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase font-bold opacity-80 hover:opacity-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Abort</span>
        </button>
        {/* BRAND HEADER MODULE */}
        <div className="text-center">
          <h2 className="text-2xl font-black bg-gradient-to-r from-white via-neutral-200 to-emerald-400 bg-clip-text text-transparent tracking-tight font-mono">
            {isSignUpMode ? "INITIALIZE ACCOUNT" : "SECURE ACCESS GATEWAY"}
          </h2>
          <p className="text-xs text-neutral-400 mt-1 font-mono">
            {isSignUpMode
              ? "Create a cluster profile to interact with marketplace assets."
              : "Identity verification required to acquire database assets."}
          </p>
        </div>

        {/* FEEDBACK STATUS ALERTS */}
        <AnimatePresence mode="popLayout">
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl p-3.5 text-xs font-mono text-red-400"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-start gap-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3.5 text-xs font-mono text-emerald-400"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
              <span>{success}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* COMPACT INPUT FORM MATRIX */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase font-mono">
              Identity Email Matrix
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@domain.com"
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 outline-none transition-all font-mono"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase font-mono">
              Cipher Passphrase
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 outline-none transition-all font-mono"
              />
            </div>
          </div>

          {/* DYNAMIC CONFIRM ENTRY FIELDS IF IN SIGNUP MODE */}
          {isSignUpMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex flex-col gap-1.5 overflow-hidden"
            >
              <label className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase font-mono">
                Verify Passphrase
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 outline-none transition-all font-mono"
                />
              </div>
            </motion.div>
          )}

          {/* SUBMIT EXECUTE CONTROL */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-neutral-800 disabled:to-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed transition-all duration-200 text-white rounded-xl text-xs font-bold tracking-wider uppercase font-mono shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
            ) : isSignUpMode ? (
              <>
                Register Account <UserPlus className="w-4 h-4" />
              </>
            ) : (
              <>
                Authorize Session <LogIn className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* TOGGLE ARCHITECTURE LINKS */}
        <div className="text-center font-mono text-xs">
          <span className="text-neutral-500">
            {isSignUpMode ? "Already verified? " : "First deployment here? "}
          </span>
          <button
            type="button"
            onClick={() => {
              setIsSignUpMode(!isSignUpMode);
              setError(null);
              setSuccess(null);
            }}
            className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors underline underline-offset-4"
          >
            {isSignUpMode ? "Sign In Here" : "Create Account Listing"}
          </button>
        </div>

        {/* HARDWARE OVERLAY SIGNATURE */}
        <div className="border-t border-neutral-800/60 pt-4 text-[10px] font-mono text-center text-neutral-500">
          Encryption Level: AES-256 SSL Handshake via API Engine.
        </div>
      </motion.div>
    </div>
  );
}
