// src/index.ts
import express, { Request, Response } from "express";
import { getComponentConfig } from "./services/componentServices";
import { ComponentPage } from "./pages/componentPage";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

console.log("STATIC DIR", staticDir);

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/component/:componentId", (req: Request, res: Response) => {
  const { componentId } = req.params;
  const data = getComponentConfig(componentId);
  const page = new ComponentPage(data);

  res.set("Content-Type", "text/html").send(page.render());
});

// Existing code...
