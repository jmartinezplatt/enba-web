/**
 * Pre-render script: generates static HTML for each route after vite build.
 *
 * Usage:
 *   1. npm run build          → builds client bundle into dist/
 *   2. npm run build:server   → builds SSR bundle into dist/server/
 *   3. node scripts/prerender.mjs → renders each route into dist/
 *
 * The "generate" npm script chains all three.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, "..", p);

// All routes to pre-render
const routes = [
  "/",
  "/veleros-en-venta",
  "/veleros-en-venta/belna",
  "/veleros-en-venta/picante",
  "/veleros-en-venta/marejada",
  "/veleros-en-venta/brisa",
  "/travesias",
  "/travesias/colonia",
  "/travesias/carmelo",
  "/travesias/montevideo",
  "/travesias/punta-del-este",
  "/travesias/piriapolis",
  "/travesias/juan-lacaze",
  "/travesias/riachuelo",
  "/travesias/martin-garcia",
  "/travesias/mar-del-plata",
  "/travesias/delta",
  "/escuela-nautica",
  "/servicios-nauticos",
  "/contacto",
];

async function prerender() {
  // Read the client-built index.html as our template
  const template = fs.readFileSync(resolve("dist/index.html"), "utf-8");

  // Import the server-built render function
  const { render } = await import("../dist/server/entry-server.js");

  let ok = 0;
  let failed = 0;

  for (const route of routes) {
    try {
      const { html, head } = render(route);

      // Replace the app placeholder with rendered HTML
      let page = template.replace("<!--app-html-->", html);

      // Replace default SEO tags with page-specific ones from react-helmet-async
      if (head) {
        page = page.replace(
          /<!--head-seo-start-->[\s\S]*?<!--head-seo-end-->/,
          `<!--head-seo-start-->\n  ${head}\n  <!--head-seo-end-->`
        );
      }

      // Write to dist/[route]/index.html (or dist/index.html for "/")
      const filePath =
        route === "/"
          ? resolve("dist/index.html")
          : resolve(`dist${route}/index.html`);

      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, page);
      ok++;
      console.log(`  ✓ ${route}`);
    } catch (err) {
      failed++;
      console.error(`  ✗ ${route}: ${err.message}`);
    }
  }

  console.log(
    `\nPre-rendered ${ok}/${routes.length} routes.${failed ? ` (${failed} failed)` : ""}`
  );

  if (failed > 0) process.exit(1);
}

prerender().catch((err) => {
  console.error("Pre-render failed:", err);
  process.exit(1);
});
