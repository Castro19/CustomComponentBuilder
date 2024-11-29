export function parseCssToStyleObject(cssCode: string): {
  [key: string]: string;
} {
  const styleObject: { [key: string]: string } = {};

  // Regular expression to match the .customButton class
  const regex = /\.customButton\s*\{([^}]+)\}/;
  const match = cssCode.match(regex);

  if (match && match[1]) {
    // Split the declarations into individual properties
    const declarations = match[1]
      .split(";")
      .map((decl) => decl.trim())
      .filter((decl) => decl);

    declarations.forEach((decl) => {
      const [property, value] = decl.split(":").map((part) => part.trim());
      if (property && value) {
        // Convert CSS property names to JavaScript style property names
        const jsProperty = property.replace(/-([a-z])/g, (g) =>
          g[1].toUpperCase()
        );
        styleObject[jsProperty] = value;
      }
    });
  }

  return styleObject;
}
