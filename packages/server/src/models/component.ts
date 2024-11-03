export interface ComponentConfig {
  variants: ("primary" | "secondary" | "destructive" | "code")[];
  options: ("type" | "font" | "border")[];
  instructions: Map<
    number,
    {
      title: string;
      description: string;
    }
  >;
}
