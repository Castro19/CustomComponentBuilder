import { Auth, Observer } from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import index from "../styles/index.css.js";
import gridUtility from "../styles/gridUtility.css.js";

export class CreditsViewElement extends LitElement {
  @state()
  _authObserver = new Observer<Auth.Model>(this, "blazing:auth");

  _user = new Auth.User();

  render() {
    return html`
      <main>
        <div class="magazine-page magazine-page-left magazine-credits">
          <h1 class="title">Credits</h1>
          <div class="content">
            <ul class="credits-list">
              <li>“Arrow” icon by Icon Trip from thenounproject.com.</li>
              <li>“Options” icon by Etika Ariatna from thenounproject.com.</li>
              <li>“Font” icon by Yogi Aprelliyanto from thenounproject.com.</li>
              <li>“Border” icon by Darwin Mulya from thenounproject.com.</li>
            </ul>
          </div>
          <div class="footer-container footer-container-left-page">
            <button class="arrow-button">
              <a href="/components/button">
                <svg class="icon arrow arrow-left" width="50" height="50">
                  <use href="/componentOptions.svg#icon-arrow" />
                </svg>
              </a>
            </button>
          </div>
        </div>
      </main>
    `;
  }

  static styles = [index.styles, gridUtility.styles];
}
