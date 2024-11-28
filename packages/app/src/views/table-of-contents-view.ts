import { Auth, Observer } from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import index from "../styles/index.css.js";
import tableContents from "../styles/tableContents.css.js";
export class TableOfContentsViewElement extends LitElement {
  @state()
  _authObserver = new Observer<Auth.Model>(this, "blazing:auth");

  _user = new Auth.User();

  render() {
    return html`
      <main>
        <div class="magazine-wrapper">
          <div class="magazine-page magazine-page-left">
            <div class="page-number-left">1</div>
            <h1 class="title">Table of Contents</h1>
            <!-- Table of Contents Section -->
            <div class="toc-container">
              <a href="#" class="toc-item">
                <span class="toc-title">Introduction</span>
                <span class="toc-dots"></span>
                <span class="toc-page-number">3</span>
              </a>
              <a href="#" class="toc-item">
                <span class="toc-title">Setup</span>
                <span class="toc-dots"></span>
                <span class="toc-page-number">4</span>
              </a>
              <a href="../components/button/buttonPage.html" class="toc-item">
                <span class="toc-title">Buttons</span>
                <span class="toc-dots"></span>
                <span class="toc-page-number">5</span>
              </a>
              <a href="#" class="toc-item">
                <span class="toc-title">Form Elements</span>
                <span class="toc-dots"></span>
                <span class="toc-page-number">7</span>
              </a>
              <a href="#" class="toc-item">
                <span class="toc-title">Resources</span>
                <span class="toc-dots"></span>
                <span class="toc-page-number">9</span>
              </a>
            </div>
            <div class="footer-container footer-container-left-page">
              <button class="arrow-button">
                <a href="/app">
                  <svg class="icon arrow arrow-left" width="50" height="50">
                    <use href="/componentOptions.svg#icon-arrow" />
                  </svg>
                </a>
              </button>
            </div>
          </div>
          <div class="magazine-page magazine-page-right">
            <div class="page-number-right">2</div>
            <h1 class="title">Table of Contents</h1>
            <!-- Table of Contents Section -->
            <div class="toc-container">
              <a href="#" class="toc-item">
                <span class="toc-title">Content</span>
                <span class="toc-dots"></span>
                <span class="toc-page-number">#</span>
              </a>
            </div>
            <div class="footer-container footer-container-right-page">
              <button class="arrow-button">
                <a href="/component/button">
                  <svg class="icon arrow" width="50" height="50">
                    <use href="/componentOptions.svg#icon-arrow" />
                  </svg>
                </a>
              </button>
            </div>
          </div>
        </div>
      </main>
    `;
  }

  static styles = [index.styles, tableContents.styles];
}
