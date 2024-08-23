import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        250: "clamp(0.80rem, calc(0.785rem + 0.04vw), 0.92rem)",
        300: "clamp(0.94rem, calc(0.92rem + 0.08vw), 0.98rem)",
        350: "clamp(1rem, calc(0.97rem + 0.17vw), 1.15rem)",
        400: "clamp(1.13rem, calc(1.06rem + 0.33vw), 1.31rem)",
        500: "clamp(1.35rem, calc(1.21rem + 0.69vw), 1.75rem)",
        600: "clamp(1.62rem, calc(1.37rem + 1.24vw), 2.33rem)",
        700: "clamp(1.94rem, calc(1.54rem + 2.03vw), 3.11rem)",
        800: "clamp(2.33rem, calc(1.7rem + 3.15vw), 4.14rem)",
        900: "clamp(2.8rem, calc(1.85rem + 4.74vw), 5.52rem)",
      },
      colors: {
        black: "#000000",
        "off-black": "#131313",
        accent: "#D87D4A",
        "accent-hover": "#fbaf85",
        grey: "#F1F1F1",
        "light-grey" : "#FAFAFA",
        white: "#FFFFFF",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
