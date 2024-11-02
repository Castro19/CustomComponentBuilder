export interface ButtonConfig {
  variant: "primary" | "secondary" | "destructive";
  iconOnly?: boolean;
  icon?: string; // URL or SVG content
  iconLabel?: string;
  text?: string;
}
