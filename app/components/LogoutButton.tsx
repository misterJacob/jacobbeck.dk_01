import { useNavigate } from "react-router";

interface LogoutButtonProps {
  setUsername: (username: string | null) => void;
}

export default function LogoutButton({ setUsername }: LogoutButtonProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Wipe the security tokens out of the browser storage
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    // 2. Clear the global React auth state so the UI updates instantly
    setUsername(null);

    // 3. Bounce the user back to the login screen
    navigate("/api/auth/login"); // Or wherever your login route sits, e.g., "/login"
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 border border-red-500/30 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all duration-200 shadow-sm backdrop-blur-sm"
    >
      {/* Tiny clean exit icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
        />
      </svg>
      Sign Out
    </button>
  );
}
