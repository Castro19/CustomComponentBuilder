// src/models/button.ts
export interface ButtonConfig {
  variant: "primary" | "secondary" | "destructive";
  iconOnly?: boolean;
  icon?: string; // URL or SVG content
  iconLabel?: string;
  text?: string;
  htmlCode?: string;
  cssCode?: string;
  tokensCode?: string;
  jsCode?: string;
}

export type ButtonConfigWithId = ButtonConfig & { buttonId: string };
