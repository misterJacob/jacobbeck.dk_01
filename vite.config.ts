import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// Get the actual directory of the config file
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: __dirname, // Explicitly set the root to the current folder
  base: "/",
  server: {
    host: true, // Listens on 0.0.0.0 inside the container
    port: 5173, // Force lock to 5173
    strictPort: true, // Keeps it on 5173 instead of shifting to 5174
    allowedHosts: ["preview.jacobbeck.dk"],
    hmr: {
      // This is the "Magic Fix" for Tailscale/Remote tunnels
      overlay: false,
      clientPort: 443,
      host: "preview.jacobbeck.dk",
      protocol: "wss",
    },
    watch: {
      usePolling: true,
      interval: 300,
      ignored: ["**/node_modules/**", "**/.react-router/**", "**/.git/**"],
    },
    // Allows the tunnel to bypass header checks
  },
  ssr: {
    noExternal: ["react-lorem-ipsum"],
    optimizeDeps: {
      include: ["react-lorem-ipsum"],
    },
  },
  plugins: [
    tailwindcss(),
    reactRouter(),
    // tsconfigPaths()
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
