// scripts/codeContainer.ts
import { LitElement, html, css, unsafeCSS } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { customElement, property } from "lit/decorators.js";
import { reset } from "../styles/reset.css.js";

@customElement("code-container")
export class CodeContainer extends LitElement {
  @property({ type: String, attribute: "html-code" }) htmlCode = "";
  @property({ type: String, attribute: "css-code" }) cssCode = "";
  @property({ type: String, attribute: "tokens-code" }) tokensCode = "";
  @property({ type: String, attribute: "js-code" }) jsCode = "";

  static styles = [
    unsafeCSS(reset),
    unsafeCSS(css`
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
        background-color: var(--color-gray-dark);
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
    `),
  ];

  render() {
    return html`
      <div class="code-container">
        <div class="code-tabs">
          <button class="code-tab" data-tab="html">HTML</button>
          <button class="code-tab active" data-tab="css">CSS</button>
          <button class="code-tab" data-tab="tokens">CSS Tokens</button>
          <button class="code-tab" data-tab="js">JavaScript</button>
        </div>
        <div class="code-content">
          <pre class="code-panel" id="htmlCode">
            ${unsafeHTML(this.formatCode(this.htmlCode, "html"))}
          </pre
          >
          <pre class="code-panel active" id="cssCode">
            ${unsafeHTML(this.formatCode(this.cssCode, "css"))}
          </pre
          >
          <pre class="code-panel" id="tokensCode">
            ${unsafeHTML(this.formatCode(this.tokensCode, "css"))}
          </pre
          >
          <pre class="code-panel" id="jsCode">
            ${unsafeHTML(this.formatCode(this.jsCode, "js"))}
          </pre
          >
        </div>
      </div>
    `;
  }

  firstUpdated() {
    this.setupTabs();
  }

  formatCode(code: string, type: string) {
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
      // Basic JavaScript syntax highlighting
      formattedCode = formattedCode
        // Handle comments
        .replace(
          /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g,
          '<span class="code-comment">$1</span>'
        )
        // Handle strings
        .replace(
          /(&quot;.*?&quot;|'.*?')/g,
          '<span class="code-string">$1</span>'
        )
        // Handle keywords
        .replace(
          /\b(const|let|var|function|if|else|return|for|while|class|new|this|super|extends|import|from|export)\b/g,
          '<span class="code-keyword">$1</span>'
        );
    }

    return formattedCode;
  }

  setupTabs() {
    const codeTabs = this.shadowRoot?.querySelectorAll(".code-tab");
    const codePanels = this.shadowRoot?.querySelectorAll(".code-panel");

    const switchTab = (tabId: string) => {
      if (!codeTabs || !codePanels) {
        return;
      }
      codeTabs.forEach((tab) => tab.classList.remove("active"));
      codePanels.forEach((panel) => panel.classList.remove("active"));
      const selectedTab = this.shadowRoot?.querySelector(
        `.code-tab[data-tab="${tabId}"]`
      );
      const selectedPanel = this.shadowRoot?.querySelector(`#${tabId}Code`);

      if (selectedTab && selectedPanel) {
        selectedTab.classList.add("active");
        selectedPanel.classList.add("active");
      }
    };

    codeTabs?.forEach((tab) => {
      tab.addEventListener("click", () => {
        const tabId = tab.getAttribute("data-tab");
        if (tabId) {
          switchTab(tabId);
        }
      });
    });
  }
}
