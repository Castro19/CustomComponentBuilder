export type Instructions = Map<number, { title: string; description: string }>;

export interface ComponentConfig {
  variants: ("primary" | "secondary" | "destructive" | "code")[];
  options: ("type" | "font" | "border")[];
  instructions: Instructions;
}
