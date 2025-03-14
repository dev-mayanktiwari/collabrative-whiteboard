import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages//*.{js,ts,jsx,tsx,mdx}",
    "./components//.{js,ts,jsx,tsx,mdx}",
    "./app/**/.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "var(--main)",
        overlay: "var(--overlay)",
        blueCustom: "var(--blueCustom)",
        pinkCustom: "var(--pinkCustom)",
        bg: "var(--bg)",
        bw: "var(--bw)",
        blank: "var(--blank)",
        text: "var(--text)",
        mtext: "var(--mtext)",
        border: "var(--border)",
        ring: "var(--ring)",
        ringOffset: "var(--ring-offset)",

        secondaryBlack: "#212121",
      },
      borderRadius: {
        base: "5px",
      },
      boxShadow: {
        shadow: "var(--shadow)",
      },
      translate: {
        boxShadowX: "6px",
        boxShadowY: "6px",
        reverseBoxShadowX: "-6px",
        reverseBoxShadowY: "-6px",
      },
      fontFamily: {
        lexend: ["Lexend Mega", "sans-serif"],
      },
      fontWeight: {
        base: "500",
        heading: "800",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
