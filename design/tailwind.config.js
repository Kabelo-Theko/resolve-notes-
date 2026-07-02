/**
 * resolve-notes "The Print Shop" — Tailwind consumption of tokens.css
 * Tokens are CSS custom properties (theme via html[data-theme]).
 */
module.exports = {
  content: ["./docs/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: ["selector", '[data-theme="ink-room"]'],
  theme: {
    fontFamily: {
      display: ["Anton", "Impact", "sans-serif"],
      sans: ["Schibsted Grotesk", "system-ui", "sans-serif"],
      mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
    },
    extend: {
      colors: {
        paper: { DEFAULT: "var(--bg)", card: "var(--surface)", well: "var(--paper)" },
        ink: { DEFAULT: "var(--ink)", soft: "var(--soft)", mute: "var(--mute)" },
        raspberry: {
          DEFAULT: "var(--accent)",
          press: "var(--accent-press)",
          text: "var(--accent-text)",
          soft: "var(--accent-soft)",
          on: "var(--on-accent)",
        },
        stamp: {
          review: "var(--review)", "review-bg": "var(--review-bg)",
          ok: "var(--ok)", "ok-bg": "var(--ok-bg)",
        },
      },
      borderColor: { DEFAULT: "var(--line)", soft: "var(--line-soft)" },
      borderRadius: { well: "var(--radius)", card: "var(--radius-lg)", pill: "999px" },
      boxShadow: { 1: "var(--shadow)", 2: "var(--shadow-md)", focus: "var(--focus)" },
      maxWidth: { page: "1080px" },
      transitionTimingFunction: {
        spring: "cubic-bezier(.34,1.26,.5,1)",
        emphasized: "cubic-bezier(.05,.7,.1,1)",
      },
    },
  },
  plugins: [],
};
