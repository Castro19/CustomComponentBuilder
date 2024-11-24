import {
  css,
  define,
  html,
  shadow,
  Dropdown,
  Events,
  Observer,
} from "@calpoly/mustang";
import reset from "../styles/reset.css.js";
import headings from "../styles/headings.css.js";

export class HeaderElement extends HTMLElement {
  static uses = define({
    "mu-dropdown": Dropdown.Element,
  });

  static template = html`<template>
    <header>
      <h1>CUSTOM UI</h1>
      <nav>
        <p><slot> Unnamed Tour </slot></p>
        <mu-dropdown>
          <a slot="actuator">
            Hello,
            <span id="userid"></span>
          </a>
          <menu>
            <li>
              <label id="lightModeLabel">
                <input
                  type="checkbox"
                  autocomplete="off"
                  id="lightModeToggle"
                />
                Light Mode
              </label>
            </li>
            <li class="when-signed-in">
              <a id="signout">Sign Out</a>
            </li>
            <li class="when-signed-out">
              <a href="/login">Sign In</a>
            </li>
          </menu>
        </mu-dropdown>
      </nav>
    </header>
  </template>`;

  static styles = css`
    :host {
      display: block;
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--padding-medium);
      background-color: var(--color-background-header);
      color: var(--color-white);
      width: 100vw;
      box-sizing: border-box;
    }
    h1 {
      font-size: var(--font-size-lg);
      margin: 0;
    }
    nav {
      display: flex;
      align-items: center;
    }
    a[slot="actuator"] {
      color: var(--color-link-inverted);
      cursor: pointer;
      text-decoration: none;
      padding: var(--padding-small);
      border-radius: var(--size-border-radius-small);
      transition: background-color 0.3s;
    }
    a[slot="actuator"]:hover {
      background-color: var(--color-background-hover);
    }
    #userid:empty::before {
      content: "traveler";
    }
    menu a {
      color: var(--color-link);
      cursor: pointer;
      text-decoration: underline;
      padding: var(--padding-small);
      border-radius: var(--size-border-radius-small);
      transition: background-color 0.3s;
    }
    menu a:hover {
      background-color: var(--color-background-hover);
    }
    a:has(#userid:empty) ~ menu > .when-signed-in,
    a:has(#userid:not(:empty)) ~ menu > .when-signed-out {
      display: none;
    }
  `;

  get userid() {
    return this._userid.textContent;
  }

  set userid(id) {
    if (id === "anonymous") {
      this._userid.textContent = "";
    } else {
      this._userid.textContent = id;
    }
  }

  constructor() {
    super();
    shadow(this)
      .template(HeaderElement.template)
      .styles(reset.styles, headings.styles, HeaderElement.styles);

    const lmSwitch = this.shadowRoot.querySelector("#lightModeToggle");

    lmSwitch.addEventListener("change", (event) =>
      Events.relay(event, "light-mode", {
        checked: event.target.checked,
      })
    );

    this._userid = this.shadowRoot.querySelector("#userid");
    this._signout = this.shadowRoot.querySelector("#signout");

    this._signout.addEventListener("click", (event) =>
      Events.relay(event, "auth:message", ["auth/signout"])
    );
  }

  _authObserver = new Observer(this, "blazing:auth");

  connectedCallback() {
    this._authObserver.observe(({ user }) => {
      if (user && user.username !== this.userid) {
        this.userid = user.username;
      }
    });
  }

  static initializeOnce() {
    function toggleLightMode(page, checked) {
      page.classList.toggle("light-mode", checked);
    }

    document.body.addEventListener("light-mode", (event) =>
      toggleLightMode(document.body, event.detail.checked)
    );
  }
}
