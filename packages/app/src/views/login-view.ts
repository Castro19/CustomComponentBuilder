import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import frontPage from "../styles/frontPage.css.js";
import index from "../styles/index.css.js";
import { reset } from "../styles/reset.css.js";
import "../components/login-form.js";

@customElement("login-view")
export class LoginViewElement extends LitElement {
  render() {
    return html`
      <main>
        <div class="login-container">
          <h1 class="title">Login</h1>
          <login-form api="/auth/login" redirect="/app">
            <span slot="title">Sign in to your account</span>
            <button slot="submit" type="submit">Login</button>
          </login-form>
        </div>
      </main>
    `;
  }

  static styles = [index.styles, frontPage.styles, reset];
}
