const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: "#31304D",
      },
    },
  },
};

export default config;
