// src/pages/renderPage.ts
import { PageParts, renderWithDefaults } from "@calpoly/mustang/server";

const defaults = {
  stylesheets: [
    "/styles/reset.css.js",
    "/styles/tokens.css",
    "/styles/index.css",
    "/styles/gridUtility.css",
  ],
  googleFontURL: "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
  styles: [],
  scripts: [
    `
    import { define } from "@calpoly/mustang";
    import { HeaderElement } from "/scripts/header.js";
    define({
      "blz-header": HeaderElement,
    });
    HeaderElement.initializeOnce();
    `,
  ],
  imports: {
    "@calpoly/mustang": "https://unpkg.com/@calpoly/mustang",
  },
};

export default function renderPage(page: PageParts) {
  return renderWithDefaults(page, defaults);
}
