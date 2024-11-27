// src/components/blazing-header.ts
import {
  Auth,
  define,
  Dropdown,
  Events,
  Observer,
  View,
} from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { reset } from "../styles/reset.css.ts";
import { Profile } from "server/models";
import { Model } from "../model.ts";
import { Msg } from "../messages.ts";

function toggleLightMode(ev: InputEvent) {
  const target = ev.target as HTMLInputElement;
  const checked = target.checked;

  Events.relay(ev, "light-mode", { checked });
}

function signOut(ev: MouseEvent) {
  Events.relay(ev, "auth:message", ["auth/signout"]);
}

export class HeaderElement extends View<Model, Msg> {
  static uses = define({
    "mu-dropdown": Dropdown.Element,
  });

  @property()
  username = "anonymous";

  @state()
  get profile(): Profile | undefined {
    return this.model.profile;
  }
  constructor() {
    super("blazing:model");
  }
  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      if (user && user.username !== this.username) {
        this.username = user.username;
        this.dispatchMessage(["profile/select", { userid: this.username }]);
      }
    });
  }

  render() {
    return html`
      <header>
        <h1><a href="/app">CustomUI</a></h1>
        <nav>
          <drop-down>
            <a href="#" slot="actuator">
              <slot name="greeting">Hello, ${this.username}</slot>
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
                <a href="/login.html">Sign In</a>
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
