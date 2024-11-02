// src/index.ts
import express, { Request, Response } from "express";
import { getButtonConfig } from "./services/buttonService";
import { ButtonPage } from "./pages/buttonPage";

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

app.get("/button/:buttonId", (req: Request, res: Response) => {
  const { buttonId } = req.params;
  const data = getButtonConfig(buttonId);
  const page = new ButtonPage(data);

  res.set("Content-Type", "text/html").send(page.render());
});

// Existing code...
