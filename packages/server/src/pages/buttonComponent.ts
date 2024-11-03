import { css, html } from "@calpoly/mustang/server";
import { ButtonConfig } from "../models/button";
import renderPage from "./renderPage";
export class ButtonPage {
  data: ButtonConfig;
  constructor(data: ButtonConfig) {
    this.data = data;
  }
  render() {
    return renderPage({
      body: this.renderBody(),
      stylesheets: ["/styles/custom-button-styles.css"],
      styles: [],
      scripts: [
        `import { define } from "@calpoly/mustang";
         import { ButtonCustomComponent } from "/scripts/buttonComponent.js";
        define({
          "button-custom": ButtonCustomComponent
        });`,
      ],
    });
  }
  renderBody() {
    const { variant, iconOnly, icon, iconLabel, text } = this.data;
    console.log("DATA", this.data);
    return html`
      <body>
        <main class="page">
          <button-custom
            data-variant="${variant}"
            ${iconOnly ? "data-icon-only" : ""}
          >
            ${icon
              ? html`<svg slot="icon" class="icon" alt="Icon">
                  <use href="${icon}" />
                </svg>`
              : ""}
            ${iconLabel ? html`<p slot="icon-label">${iconLabel}</p>` : ""}
            ${text ? `${text}` : ""}
          </button-custom>
        </main>
      </body>
    `;
  }
}
