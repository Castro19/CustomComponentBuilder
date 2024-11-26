// src/components/blazing-header.ts
import { Auth, define, Dropdown, Events, Observer } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { reset } from "../styles/reset.css.ts";

function toggleLightMode(ev: InputEvent) {
  const target = ev.target as HTMLInputElement;
  const checked = target.checked;

  Events.relay(ev, "light-mode", { checked });
}

function signOut(ev: MouseEvent) {
  Events.relay(ev, "auth:message", ["auth/signout"]);
}

export class HeaderElement extends LitElement {
  static uses = define({
    "mu-dropdown": Dropdown.Element,
  });

  @state()
  userid: string = "traveler";

  render() {
    return html`
      <header>
        <h1>CUSTOM UI</h1>
        <nav>
          <p><slot> Unnamed Tour </slot></p>
          <drop-down>
            <a slot="actuator">
              Hello,
              <span id="userid"></span>
            </a>
            <menu>
              <li>
                <label @change=${toggleLightMode}>
                  <input
                    type="checkbox"
                    autocomplete="off"
                    id="lightModeToggle"
                  />
                  Light Mode
                </label>
              </li>
              <li class="when-signed-in">
                <a id="signout" @click=${signOut}>Sign Out</a>
              </li>
              <li class="when-signed-out">
                <a href="/login">Sign In</a>
              </li>
            </menu>
          </drop-down>
        </nav>
      </header>
    `;
  }

  static styles = [
    reset,
    css`
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
    `,
  ];
  _authObserver = new Observer<Auth.Model>(this, "blazing:auth");

  connectedCallback() {
    super.connectedCallback();

    this._authObserver.observe(({ user }) => {
      if (user && user.username !== this.userid) {
        this.userid = user.username;
      }
    });
  }

  static initializeOnce() {
    function toggleLightMode(page: HTMLElement, checked: boolean) {
      page.classList.toggle("light-mode", checked);
    }

    document.body.addEventListener("light-mode", (event) =>
      toggleLightMode(
        event.currentTarget as HTMLElement,
        (event as CustomEvent).detail?.checked
      )
    );
  }
}
