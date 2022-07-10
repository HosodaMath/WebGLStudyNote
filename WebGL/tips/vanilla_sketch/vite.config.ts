import { resolve } from "path";
import { defineConfig } from "vite";

module.exports = defineConfig({
  base: "./",
  build: {
    outDir: "docs",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        top: resolve(__dirname, "./index.html"),
        directionalLight1: resolve(
          __dirname,
          "./pages/directionalLight1/directionalLight1.html"
        ),
        directionalLight2: resolve(
          __dirname,
          "./pages/directionalLight2/directionalLight2.html"
        ),
        directionalLight3: resolve(
          __dirname,
          "./pages/directionalLight3/directionalLight3.html"
        ),
        directionalLight4: resolve(
          __dirname,
          "./pages/directionalLight4/directionalLight4.html"
        ),
        directionalLight5: resolve(
          __dirname,
          "./pages/directionalLight4/directionalLight5.html"
        ),
        directionalLight6: resolve(
          __dirname,
          "./pages/directionalLight6/directionalLight6.html"
        ),
      },
    },
  },
});
