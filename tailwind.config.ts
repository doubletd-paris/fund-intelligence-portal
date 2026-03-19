import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f4f2ee",
        ink: "#17212b",
        line: "#d9ddd7",
        panel: "#fbfaf8",
        accent: {
          DEFAULT: "#204a74",
          soft: "#e8eff5"
        },
        success: "#2f6b57",
        warning: "#9b6a24",
        danger: "#9e3d36"
      },
      boxShadow: {
        card: "0 10px 30px rgba(23, 33, 43, 0.06)"
      },
      borderRadius: {
        xl2: "1.5rem"
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Iowan Old Style", "Palatino Linotype", "Book Antiqua", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
