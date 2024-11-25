import { css, html, shadow, Events } from "@calpoly/mustang";
import reset from "../styles/reset.css.js";
import headings from "../styles/headings.css.js";

export class RegistrationForm extends HTMLElement {
  static template = html`<template>
    <form>
      <slot name="title">
        <h3>Sign up to create a Username and Password</h3>
      </slot>
      <label>
        <span>
          <slot name="username">Username</slot>
        </span>
        <input name="username" autocomplete="off" />
      </label>
      <label>
        <span>
          <slot name="password">Password</slot>
        </span>
        <input type="password" name="password" />
      </label>
      <slot name="submit">
        <button type="submit">Sign Up</button>
      </slot>
    </form>
  </template>`;

  static styles = css`
    form {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: var(--size-spacing-medium);
      padding: var(--size-spacing-large);
      background-color: var(--color-background-form);
      border-radius: var(--size-border-radius-medium);
      box-shadow: var(--color-shadow-dark);
    }

    h3 {
      color: var(--color-white);
    }

    label {
      display: contents;
    }

    label > span {
      grid-column: 1;
      justify-self: end;
      font-weight: bold;
      color: var(--color-white);
    }

    label > input {
      grid-column: 2;
      padding: var(--size-spacing-small);
      border: 1px solid var(--color-border-input);
      border-radius: var(--size-border-radius-small);
      transition: border-color 0.3s;
    }

    label > input:focus {
      border-color: var(--color-border-focus);
      outline: none;
    }

    ::slotted(*[slot="title"]),
    slot[name="title"] > * {
      grid-column: 1 / -1;
      text-align: center;
      font-size: var(--font-size-xl);
      margin-bottom: var(--size-spacing-medium);
    }

    ::slotted(button[slot="submit"]),
    button[type="submit"] {
      grid-column: 1 / -1;
      justify-self: center;
      padding: var(--size-spacing-small) var(--size-spacing-medium);
      background-color: var(--color-button-background);
      color: var(--color-button-text);
      border: none;
      border-radius: var(--size-border-radius-small);
      cursor: pointer;
      transition: background-color 0.3s;
    }

    button[type="submit"]:hover {
      background-color: var(--color-button-hover);
    }
  `;

  get form() {
    return this.shadowRoot.querySelector("form");
  }

  constructor() {
    super();

    shadow(this)
      .template(RegistrationForm.template)
      .styles(reset.styles, headings.styles, RegistrationForm.styles);

    this.form.addEventListener("submit", (event) =>
      submitRegistrationForm(
        event,
        this.getAttribute("api"),
        this.getAttribute("redirect") || "/"
      )
    );
  }
}

function submitRegistrationForm(event, endpoint, redirect) {
  event.preventDefault();

  const form = event.target.closest("form");
  const data = new FormData(form);
  const method = "POST";
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify(Object.fromEntries(data));

  console.log("POST new user request:", body);

  fetch(endpoint, { method, headers, body })
    .then((res) => {
      if (res.status !== 201)
        throw `Form submission failed: Status ${res.status}`;
      return res.json();
    })
    .then((payload) => {
      const { token } = payload;

      Events.dispatch;
      form.dispatchEvent(
        new CustomEvent("auth:message", {
          bubbles: true,
          composed: true,
          detail: ["auth/signin", { token, redirect }],
        })
      );
    })
    .catch((err) => console.log("Error submitting form:", err));
}

customElements.define("registration-form", RegistrationForm);
