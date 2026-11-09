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
          DEFAULT: "#FAF9F5", // Contemporary Alabaster Ivory
          pure: "#FFFFFF",    // Pure White
          subtle: "#F2EFE9",  // Muted Warm Architectural Surface
          card: "#FFFFFF",
          dark: "#121312",    // Obsidian Noir
        },
        brand: {
          // Primary Atelier Noir
          primary: "#141514",
          "primary-hover": "#262827",
          forest: "#141514",       // Obsidian Noir (replaces forest green with high-end luxury black)
          "forest-hover": "#282A29",
          "forest-dark": "#0B0C0B",
          "forest-light": "#EFECE4", // Warm stone tint
          
          // Neutral Text
          charcoal: "#171817",     // Deepest Neutral Text
          muted: "#6B6F68",        // Architectural Medium Grey
          "muted-light": "#969A93",
          
          // Accents
          gold: "#B88E4C",         // Tuscan Burnished Bronze Gold
          "gold-hover": "#A27938",
          "gold-light": "#F7F2E7",
          accent: "#B88E4C",
          "accent-light": "#F7F2E7",
          
          // UI States & Borders
          border: "#E5E2D9",       // Fine Warm Hairline Border
          "border-subtle": "rgba(23, 24, 23, 0.07)",
          success: "#2D6A4F",      // Understated Muted Green
          error: "#B54134",        // Terracotta Red
          sale: "#B54134",
        },
      },
      fontFamily: {
        sans: [
          "'Plus Jakarta Sans'",
          "'Manrope'",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
        serif: [
          "'Playfair Display'",
          "'Cormorant Garamond'",
          "Georgia",
          "'Times New Roman'",
          "serif",
        ],
      },
      fontSize: {
        "hero": ["clamp(2.75rem, 5.5vw, 5rem)", { lineHeight: "1.04", letterSpacing: "-0.035em" }],
        "page-title": ["clamp(2.25rem, 3.8vw, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "section-title": ["clamp(1.75rem, 2.5vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.025em" }],
        "product-title": ["1.0625rem", { lineHeight: "1.3", letterSpacing: "-0.015em" }],
      },
      borderRadius: {
        btn: "10px",
        card: "14px",
        "card-lg": "20px",
        pill: "9999px",
      },
      boxShadow: {
        subtle: "0 2px 12px -2px rgba(20, 21, 20, 0.04), 0 1px 3px 0 rgba(20, 21, 20, 0.02)",
        float: "0 20px 40px -15px rgba(20, 21, 20, 0.12), 0 8px 16px -6px rgba(20, 21, 20, 0.04)",
        dropdown: "0 24px 48px -12px rgba(20, 21, 20, 0.14), 0 8px 16px -4px rgba(20, 21, 20, 0.06)",
        glow: "0 0 20px -3px rgba(184, 142, 76, 0.25)",
      },
      aspectRatio: {
        "product": "4 / 5",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        slideDown: "slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
