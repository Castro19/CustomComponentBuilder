import { Auth, define, History, Store, Switch } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { html, LitElement } from "lit";
import { HeaderElement } from "./components/blazing-header";
import { HomeViewElement } from "./views/home-view.ts";
import { TableOfContentsViewElement } from "./views/table-of-contents-view.ts";
import { ButtonComponentViewElement } from "./views/button-component-view.ts";
import { CreditsViewElement } from "./views/credits-view.ts";
import { LoginViewElement } from "./views/login-view.ts";

const routes: Switch.Route[] = [
  {
    auth: "protected",
    path: "/app",
    view: () => html`<home-view></home-view>`,
  },
  {
    path: "/",
    redirect: "/app",
  },
  {
    path: "/tableContents",
    view: () => html`<table-of-contents-view></table-of-contents-view>`,
  },
  {
    path: "/components/button",
    view: () => html`<button-component-view></button-component-view>`,
  },

  {
    path: "/credits",
    view: () => html`<credits-view></credits-view>`,
  },
];

class AppElement extends LitElement {
  render() {
    return html`<mu-switch></mu-switch>`;
  }

  connectedCallback() {
    super.connectedCallback();
    HeaderElement.initializeOnce();
  }
}

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-store": class AppStore extends Store.Provider<Model, Msg> {
    constructor() {
      super(update, init, "blazing:auth");
    }
  },
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "blazing:history", "blazing:auth");
    }
  },
  "blazing-app": AppElement,
  "blazing-header": HeaderElement,
  "home-view": HomeViewElement,
  "table-of-contents-view": TableOfContentsViewElement,
  "button-component-view": ButtonComponentViewElement,
  "credits-view": CreditsViewElement,
  "login-view": LoginViewElement,
});
