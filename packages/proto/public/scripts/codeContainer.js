// scripts/codeContainer.js
import { css, html, shadow } from "@calpoly/mustang";
import reset from "../styles/reset.css.js";

export class CodeContainer extends HTMLElement {
  static template = html`
    <template>
      <div class="code-container">
        <div class="code-tabs">
          <button class="code-tab" data-tab="html">HTML</button>
          <button class="code-tab active" data-tab="css">CSS</button>
          <button class="code-tab" data-tab="tokens">CSS Tokens</button>
          <button class="code-tab" data-tab="js">JavaScript</button>
        </div>
        <div class="code-content">
          <pre class="code-panel" id="htmlCode"></pre>
          <pre class="code-panel active" id="cssCode"></pre>
          <pre class="code-panel" id="tokensCode"></pre>
          <pre class="code-panel" id="jsCode"></pre>
        </div>
      </div>
    </template>
  `;

  static styles = css`
    :host {
      --color-black-light: #333;
      --color-black: #000;
      --color-white: #fff;
      --color-gold: #cda434;
      --spacing-md: 16px;
      --spacing-sm: 8px;
      --spacing-xs: 4px;
      --font-size-sm: 14px;
      --font-size-xs: 12px;
    }

    /* Code Display Container Styles */
    .code-container {
      background-color: var(--color-black-light);
      border-radius: 8px;
      padding: var(--spacing-md);
      height: 100%;
      justify-self: stretch;
      align-self: start;
      width: 100%;
    }

    .code-tabs {
      display: flex;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-sm);
    }

    .code-tab {
      padding: var(--spacing-xs) var(--spacing-sm);
      background: transparent;
      border: 1px solid var(--color-white);
      color: var(--color-white);
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .code-tab.active {
      background: var(--color-gold);
      border-color: var(--color-gold);
      color: var(--color-black);
    }

    .code-content {
      background-color: var(--color-black);
      border-radius: 4px;
      padding: var(--spacing-sm);
      height: calc(100% - 60px);
      overflow-y: auto;
      text-align: left;
      display: block;
    }

    .code-panel {
      display: none;
      white-space: pre-wrap;
      font-family: "Courier New", Courier, monospace;
      font-size: var(--font-size-sm);
      color: var(--color-white);
      margin: 0;
      padding: 0;
      text-align: left;
    }

    .code-panel.active {
      display: block;
    }

    /* Syntax Highlighting Styles */
    .code-keyword {
      color: #ff79c6;
    }
    .code-string {
      color: #f1fa8c;
    }
    .code-comment {
      color: #6272a4;
    }
    .code-tag {
      color: #ff79c6;
    }
    .code-attribute {
      color: #50fa7b;
    }
    .code-value {
      color: #f1fa8c;
    }
  `;

  static get observedAttributes() {
    return ["html-code", "css-code", "tokens-code", "js-code"];
  }

  constructor() {
    console.log("WORK");
    super();
    shadow(this)
      .template(CodeContainer.template)
      .styles(reset.styles, CodeContainer.styles);
  }

  connectedCallback() {
    this.render();
    this.setupTabs();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }
  render() {
    const htmlCode = this.getAttribute("html-code") || "";
    const cssCode = this.getAttribute("css-code") || "";
    const cssTokens = this.getAttribute("tokens-code") || "";
    const jsCode = this.getAttribute("js-code") || "";

    // Update code panels
    const htmlPanel = this.shadowRoot.querySelector("#htmlCode");
    const cssPanel = this.shadowRoot.querySelector("#cssCode");
    const cssTokensPanel = this.shadowRoot.querySelector("#tokensCode");
    const jsPanel = this.shadowRoot.querySelector("#jsCode");

    if (htmlPanel) {
      htmlPanel.innerHTML = this.formatCode(htmlCode, "html");
    }
    if (cssPanel) {
      cssPanel.innerHTML = this.formatCode(cssCode, "css");
    }
    if (cssTokensPanel) {
      cssTokensPanel.innerHTML = this.formatCode(cssTokens, "css");
    }
    if (jsPanel) {
      jsPanel.innerHTML = this.formatCode(jsCode, "js");
    }
  }
  formatCode(code, type) {
    // Escape HTML entities
    let formattedCode = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Basic syntax highlighting
    if (type === "html") {
      formattedCode = formattedCode
        // Handle HTML comments
        .replace(
          /(&lt;!--[\s\S]*?--&gt;)/g,
          '<span class="code-comment">$1</span>'
        )
        // Handle attributes first
        .replace(
          /(\s+)([\w-]+)(=)(&quot;|')(.*?)(&quot;|')/g,
          '$1<span class="code-attribute">$2</span>$3<span class="code-value">$4$5$6</span>'
        )
        // Then handle the full tags (including their content)
        .replace(
          /(&lt;\/?)(\w+)(.*?)(&gt;)/g,
          '<span class="code-tag">$1$2</span>$3<span class="code-tag">$4</span>'
        );
    } else if (type === "css") {
      formattedCode = formattedCode
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="code-comment">$1</span>')
        .replace(
          /([\w-]+)(\s*:\s*)([^;]+);/g,
          '<span class="code-attribute">$1</span>$2<span class="code-value">$3</span>;'
        )
        .replace(/([.#]?\w[\w-]*)\s*\{/g, '<span class="code-tag">$1</span> {');
    } else if (type === "js") {
      // [TO-DO] JavaScript syntax highlighting
      formattedCode = formattedCode;
    }
    return formattedCode;
  }

  setupTabs() {
    const codeTabs = this.shadowRoot.querySelectorAll(".code-tab");
    const codePanels = this.shadowRoot.querySelectorAll(".code-panel");

    const switchTab = (tabId) => {
      codeTabs.forEach((tab) => tab.classList.remove("active"));
      codePanels.forEach((panel) => panel.classList.remove("active"));
      console.log("tabId:", tabId);
      const selectedTab = this.shadowRoot.querySelector(
        `.code-tab[data-tab="${tabId}"]`
      );
      const selectedPanel = this.shadowRoot.querySelector(`#${tabId}Code`);

      if (selectedTab && selectedPanel) {
        selectedTab.classList.add("active");
        selectedPanel.classList.add("active");
      }
    };

    codeTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const tabId = tab.getAttribute("data-tab");
        switchTab(tabId);
      });
    });
  }
}
