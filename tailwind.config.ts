import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#F8F7F3", // Warm Ivory
          pure: "#FFFFFF",    // Pure White
          subtle: "#F2F1EB",  // Slightly deeper ivory for subtle contrast
        },
        brand: {
          forest: "#243D32",       // Primary Brand - Deep Forest Green
          "forest-hover": "#355746",// Primary Hover - Muted Forest Green
          "forest-dark": "#182B23", // Darker Forest for accents/footers
          "forest-light": "#E9EFEA",// Very soft forest tint for badges/tags
          charcoal: "#20251F",     // Main Text - Rich Charcoal
          muted: "#777C75",        // Secondary Text - Soft Grey
          gold: "#C5A675",         // Accent - Muted Champagne Gold
          "gold-hover": "#B3935F",
          "gold-light": "#F7F2E8",  // Champagne tint for badges
          border: "#E8E7E1",       // Border - Warm Light Grey
          success: "#39805B",      // Success Green
          error: "#C65B52",        // Error Red
          sale: "#B85C48",         // Sale Badge Terracotta
        },
      },
      fontFamily: {
        sans: ["'Manrope'", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        serif: ["'Playfair Display'", "Georgia", "'Times New Roman'", "serif"],
      },
      fontSize: {
        "hero": ["clamp(2.5rem, 5vw, 4.75rem)", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        "page-title": ["clamp(2rem, 3.5vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.025em" }],
        "section-title": ["clamp(1.75rem, 2.5vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "product-title": ["1.0625rem", { lineHeight: "1.35", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        btn: "8px",
        card: "10px",
        pill: "9999px",
      },
      boxShadow: {
        subtle: "0 2px 8px -2px rgba(32, 37, 31, 0.04), 0 4px 16px -4px rgba(32, 37, 31, 0.06)",
        float: "0 10px 30px -10px rgba(36, 61, 50, 0.12), 0 4px 10px -2px rgba(32, 37, 31, 0.04)",
        dropdown: "0 12px 32px -8px rgba(32, 37, 31, 0.12), 0 4px 12px -2px rgba(32, 37, 31, 0.05)",
      },
      aspectRatio: {
        "product": "4 / 5",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        slideDown: "slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
