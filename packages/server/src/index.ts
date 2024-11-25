// src/index.ts
import express, { Request, Response } from "express";
import componentRouter from "./routes/component";
import buttonRouter from "./routes/button";
import auth, { authenticateUser } from "./routes/auth";
import { connect } from "./services/mongo";
import { LoginPage } from "./pages/index";
import { RegistrationPage } from "./pages/auth";
import fs from "node:fs/promises";
import path from "path";

connect("publish-ui");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

console.log("STATIC DIR", staticDir);

app.use(express.static(staticDir));
app.use(express.json());

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) => res.send(html));
});

// with the other HTML routes
app.get("/login", (req: Request, res: Response) => {
  const page = new LoginPage();
  res.set("Content-Type", "text/html").send(page.render());
});

app.get("/register", (req: Request, res: Response) => {
  const page = new RegistrationPage();
  res.set("Content-Type", "text/html").send(page.render());
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.use("/component", componentRouter);
app.use("/button", buttonRouter);
app.use("/auth", auth);
