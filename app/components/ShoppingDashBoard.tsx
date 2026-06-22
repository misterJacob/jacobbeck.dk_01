import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router"; // 🍏 Added useLocation
import { ShoppingBag, LogOut } from "lucide-react";

export default function ShoppingDashBoard() {
  const navigate = useNavigate();
  const location = useLocation(); // 🍏 Tracks the active URL track
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // This now re-runs every time the user moves between pages
    const storedUser = localStorage.getItem("username");
    setUsername(storedUser);
  }, [location]); // 🍏 Re-evaluate authentication state on route changes

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/login");
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white flex flex-col">
      <header className="w-full bg-neutral-900 border-b border-neutral-800 p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between font-mono">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <ShoppingBag className="w-5 h-5" />
            <span>PROJECT HUB SHOP</span>
          </div>

          <div className="flex items-center gap-4">
            {username ? (
              <>
                <span className="text-xs text-neutral-400">
                  Operator:{" "}
                  <strong className="text-emerald-400">{username}</strong>
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 border border-red-500/20 rounded bg-red-500/5 hover:bg-red-500/10 transition-all duration-150 cursor-pointer"
                  title="Terminate Session"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Exit</span>
                </button>
              </>
            ) : (
              <span className="text-xs text-neutral-500">
                Public Marketplace Node
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
