// uno.config.ts
import { defineConfig, presetUno, presetIcons } from "unocss";
import presetWebFonts from "unocss/preset-web-fonts";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetWebFonts({
      provider: "google", // you can swap to 'bunny' if you want faster CDN
      fonts: {
        // General purpose
        sans: "Montserrat",
        serif: "Playfair Display",
        mono: "Fira Code",

        // Fancy calligraphy set
        calli: [
          "Dancing Script",
          "Parisienne",
          "Great Vibes",
          "Sacramento",
        ],
      },
    }),
  ],
  theme: {
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  }
});
