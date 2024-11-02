export interface ComponentConfig {
  variants: ("primary" | "secondary" | "destructive" | "code")[];
  options: ("type" | "font" | "border")[];
  instructions: {
    [instruction: number]: {
      title: string;
      description: string;
    };
  };
}
