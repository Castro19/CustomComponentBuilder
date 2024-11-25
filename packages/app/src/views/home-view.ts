import { Auth, Observer } from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import reset from "../styles/reset.css.js";
import frontPage from "../styles/frontPage.css.js";
import gridUtility from "../styles/gridUtility.css.js";

export class HomeViewElement extends LitElement {
  @state()
  _authObserver = new Observer<Auth.Model>(this, "blazing:auth");

  _user = new Auth.User();

  render() {
    return html`
      <main>
        <div class="magazine-page magazine-page-right magazine-cover">
          <h1 class="title">PublishUI</h1>
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

  static styles = [reset.styles, frontPage.styles, gridUtility.styles];
}
