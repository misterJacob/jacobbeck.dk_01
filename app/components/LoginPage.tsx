import { useState, type SubmitEvent } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";

const API_BASE = "https://preview-api.jacobbeck.dk";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Authentication entry rejected");
      }

      // --- CRUCIAL: STORE TOKEN IN BROWSER ---
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("username", data.username);

      // Redirect user to home dashboard or your premium shop page here!
      window.location.href = "/shop";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl flex flex-col gap-6"
      >
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            System Node Authentication
          </h2>
          <p className="text-xs text-neutral-400 mt-1 font-mono">
            Sign in to unlock cluster management access.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono p-3 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* Email Box Inputs */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase font-mono text-neutral-400">
              Email Vector
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@jacobbeck.dk"
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white font-mono outline-none transition-colors"
              />
            </div>
          </div>

          {/* Password Box Inputs */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase font-mono text-neutral-400">
              Secret Token Key
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 rounded-xl py-2.5 pl-10 pr-10 text-sm text-white font-mono outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-neutral-800 disabled:to-neutral-800 text-white rounded-xl text-xs font-bold tracking-wider uppercase font-mono shadow-lg transition-all duration-200"
          >
            {loading ? "VERIFYING CREDENTIALS..." : "INITIALIZE LOGIN SEQUENCE"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
