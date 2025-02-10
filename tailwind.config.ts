import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        "noble-black": {
          "100": "#E8E9E9",
          "200": "#CDCECF",
          "300": "#9B9C9E",
          "400": "#686B6E",
          "500": "#363A3D",
          "600": "#1A1D21",
          "700": "#0D0F10",
          "800": "#0D0F10",
          "900": "#060708",
        },
        "day-blue": {
          "100": "#EBEDFC",
          "200": "#D2D8F9",
          "300": "#A6B0F2",
          "400": "#7989EC",
          "500": "#4D62E5",
          "600": "#3045C9",
          "700": "#243497",
          "800": "#182364",
          "900": "#0C1132",
        },
        "purple-blue": {
          "100": "#F0E8FD",
          "200": "#DECCFB",
          "300": "#BD9AF8",
          "400": "#9C67F4",
          "500": "#7C35F1",
          "600": "#5F18D4",
          "700": "#47129F",
          "800": "#300C6A",
          "900": "#180635",
        },
        sunglow: {
          "100": "#FFFAEA",
          "200": "#FFF3D1",
          "300": "#FFE8A3",
          "400": "#FFDC75",
          "500": "#FFD147",
          "600": "#E2B42B",
          "700": "#AA8720",
          "800": "#715A15",
          "900": "#392D0B",
        },
        "stem-green": {
          "100": "#F7FDF4",
          "200": "#EDFBE6",
          "300": "#DBF7CD",
          "400": "#C8F4B4",
          "500": "#B6F09C",
          "600": "#9AD37F",
          "700": "#739F5F",
          "800": "#4D6A3F",
          "900": "#263520",
        },
        "heisenberg-blue": {
          "100": "#F1FBFE",
          "200": "#E0F6FD",
          "300": "#C0EDFB",
          "400": "#A1E4F9",
          "500": "#82DBF7",
          "600": "#65BEDA",
          "700": "#4C8FA4",
          "800": "#335F6D",
          "900": "#193037",
        },
        "happy-orange": {
          "100": "#FFF2E9",
          "600": "#E26F20",
          "900": "#391C08",
        },
        "electric-green": {
          "100": "#F3FBF7",
          "600": "#4AC97E",
          "900": "#122B1D",
        },
        "red-power": {
          "100": "#FBECEC",
          "600": "#D0302F",
          "900": "#2F0F0E",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities }) {
      addBase({});
      addComponents({
        ".container": {
          "@apply max-w-[77.5rem] mx-auto px-6 md:px-12 lg:px-16": {},
        },
        ".h1": {
          "@apply text-[28px] leading-[36px] md:text-[32px] md:leading-[40px] lg:text-[36px] lg:leading-[44px] tracking-[0px] font-semibold":
            {},
        },
        ".h2": {
          "@apply text-[24px] leading-[32px] md:text-[28px] md:leading-[36px] lg:text-[32px] lg:leading-[40px] tracking-[0px] font-semibold":
            {},
        },
        ".h3": {
          "@apply text-[20px] leading-[28px] md:text-[24px] md:leading-[32px] lg:text-[28px] lg:leading-[36px] tracking-[0px] font-semibold":
            {},
        },
        ".h4": {
          "@apply text-[20px] leading-[28px] md:text-[24px] md:leading-[32px] tracking-[0px] font-semibold":
            {},
        },
        ".h5": {
          "@apply text-[20px] leading-[28px] tracking-[0px] font-semibold": {},
        },
        ".body-xl": {
          "@apply text-[18px] leading-[28px] tracking-[0.15px]": {},
        },
        ".body-lg": {
          "@apply text-[16px] leading-[24px] tracking-[0.15px]": {},
        },
        ".body-md": {
          "@apply text-[14px] leading-[20px] tracking-[0.15px]": {},
        },
        ".body-sm": {
          "@apply text-[12px] leading-[18px] tracking-[0.15px]": {},
        },
      });
      addUtilities({
        ".mask-fade-top": {
          "mask-image": "linear-gradient(to top, black 0%, black 60%, transparent 100%)",
          "-webkit-mask-image":
            "linear-gradient(to top, black 0%, black 60%, transparent 100%)",
        },
        ".mask-fade-bottom": {
          "mask-image": "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
          "-webkit-mask-image":
            "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
        },
      });
    }),
    tailwindAnimate,
  ],
} satisfies Config;

export default config;
