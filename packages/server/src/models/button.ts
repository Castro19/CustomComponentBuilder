// models/button.ts
export interface ButtonConfig {
  variant: string;
  text?: string;
  iconOnly?: boolean;
  icon?: string;
  iconLabel?: string;
  tokensCode?: string;
  htmlCode?: string;
  cssCode?: string;
  jsCode?: string;
}

export interface ButtonConfigWithId extends ButtonConfig {
  buttonId: string;
}
