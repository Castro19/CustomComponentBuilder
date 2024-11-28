export type Instructions = Map<number, { title: string; description: string }>;
export type Instruction = { title: string; description: string };
export interface ComponentConfig {
  type: string; // "button" | "others could be added"
  variants: ("primary" | "secondary" | "destructive" | "code")[];
  options: ("type" | "font" | "border")[];
  instructions: { [key: string]: Instruction };
}
