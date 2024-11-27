import { define, Events, Rest } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

define({ "restful-form": Rest.FormElement });

@customElement("login-form")
export class LoginFormElement extends LitElement {
  @property()
  message = "";

  render() {
    const init = { username: "", password: "" };
    return html`
      <body>
        <restful-form
          new
          .init=${init}
          src="/auth/login"
          @mu-rest-form:created=${this._handleSuccess}
          @mu-rest-form:error=${this._handleError}
        >
          <slot></slot>
        </restful-form>
        <p class="error">
          ${this.message ? "Invalid Username or Password" : ""}
        </p>
        <pre>${this.message}</pre>
      </body>
    `;
  }

  static styles = css`
    .error {
      color: firebrick;
    }
  `;

  get next() {
    let query = new URLSearchParams(document.location.search);
    return query.get("next");
  }

  _handleSuccess(event: CustomEvent) {
    const detail = event.detail;
    const { token } = detail.created;
    const redirect = this.next || "/";
    console.log("Login successful", detail, redirect);

    Events.relay(event, "auth:message", ["auth/signin", { token, redirect }]);
  }

  _handleError(event: CustomEvent) {
    const { error } = event.detail as { error: Error };
    console.log("Login failed", event.detail);
    this.message = error.toString();
  }
}
