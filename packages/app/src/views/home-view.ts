import { View } from "@calpoly/mustang";
import { html } from "lit";
import frontPage from "../styles/frontPage.css.js";
import index from "../styles/index.css.js";
import { reset } from "../styles/reset.css.js";
import { Model } from "../model.js";
import { Msg } from "../messages.js";

export class HomeViewElement extends View<Model, Msg> {
  constructor() {
    super("blazing:model");
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <main>
        <div class="magazine-page magazine-page-right magazine-cover">
          <h1 class="title">Publish UI</h1>
          <h2 class="subtitle-cover">Another UI Component Library</h2>
          <div class="footer-container-cover">
            <p class="author-cover">By Cristian Castro Oliva</p>
            <button class="arrow-button">
              <a href="/tableContents">
                <svg class="icon arrow" width="50" height="50">
                  <use href="/componentOptions.svg#icon-arrow" />
                </svg>
              </a>
            </button>
          </div>
        </div>
      </main>
    `;
  }

  static styles = [index.styles, frontPage.styles, reset];
}
