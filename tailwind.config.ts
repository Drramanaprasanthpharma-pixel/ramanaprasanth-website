import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        clinical: {
          navy: "#0B3D5C",
          navyDeep: "#082B41",
          teal: "#1B998B",
          tealDeep: "#147468",
          bg: "#F6F8F9",
          surface: "#FFFFFF",
          border: "#E1E7EB",
          ink: "#16232E",
          muted: "#5B6B76",
        },
        status: {
          compatible: "#15803D",
          compatibleBg: "#EFFAF3",
          compatibleBorder: "#BBE8CC",
          incompatible: "#B91C1C",
          incompatibleBg: "#FDF0EF",
          incompatibleBorder: "#F3C6C1",
          caution: "#B45309",
          cautionBg: "#FFF8ED",
          cautionBorder: "#F6DDA8",
        },
      },
      fontFamily: {
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,61,92,0.06), 0 4px 16px rgba(11,61,92,0.06)",
        panel: "0 2px 8px rgba(11,61,92,0.08)",
      },
      borderRadius: {
        card: "10px",
      },
    },
  },
  plugins: [],
};
export default config;
