import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { ShoppingBag, LogOut } from "lucide-react";

export default function ShoppingDashBoard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // 1. Sync authentication status when the dashboard mounts
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const handleLogout = () => {
    // 2. Clear browser memory
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    
    // 3. Reset local state to instantly clear the UI
    setUsername(null);
    
    // 4. Redirect the user back to the login page
    navigate("/login"); // Change to "/api/auth/login" if that's your designated auth route
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white flex flex-col">
      <h1>Shop Preview</h1>
    </div>
  );
}








// // Inside your main layout / App framework file
// import { useState, useEffect } from "react";
// import LogoutButton from "../components/LogoutButton";

// export default function DashboardLayout() {
//   const [username, setUsername] = useState<string | null>(null);

//   useEffect(() => {
//     // Sync state with local storage on page load
//     const storedUser = localStorage.getItem("username");
//     if (storedUser) setUsername(storedUser);
//   }, []);

//   return (
//     <nav className="flex justify-between items-center p-4 bg-zinc-900 border-b border-zinc-800 text-white">
//       <div>
//         {username ? (
//           <span className="text-zinc-400">
//             Active Identity:{" "}
//             <strong className="text-emerald-400">{username}</strong>
//           </span>
//         ) : (
//           <span className="text-zinc-500">Guest Mode</span>
//         )}
//       </div>

//       {/* Only display the button if a valid token sequence is active */}
//       {username && <LogoutButton setUsername={setUsername} />}
//     </nav>
//   );
// }
