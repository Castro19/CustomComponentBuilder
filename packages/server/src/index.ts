// src/index.ts
import express, { Request, Response } from "express";
import componentRouter from "./routes/component";
import buttonRouter from "./routes/button";
import profileRouter from "./routes/profile";
import auth, { authenticateUser } from "./routes/auth";
import { connect } from "./services/mongo";
import { LoginPage } from "./pages/index";
import { RegistrationPage } from "./pages/auth";
import fs from "node:fs/promises";
import path from "path";
import renderPage from "./pages/renderPage";

const app = express();
const port = process.env.PORT || 3000;

// Mongo Connecition
connect("publish-ui");

// Static files
const staticDir = process.env.STATIC || "public";
app.use(express.static(staticDir));

// Middleware
app.use(express.json());

// Auth routes
app.use("/auth", auth);

// API Routes:
app.use("/component", componentRouter);
app.use("/button", buttonRouter);
app.use("/api/profiles", authenticateUser, profileRouter);

// Page Routes:
app.get("/ping", (_: Request, res: Response) => {
  res.send(
    `<h1>Hello!</h1>
     <p>Server is up and running.</p>
     <p>Serving static files from <code>${staticDir}</code>.</p>
    `
  );
});

app.get("/login", (req: Request, res: Response) => {
  console.log("Login Page 1");
  const page = new LoginPage();
  res.set("Content-Type", "text/html").send(page.render());
});

app.get("/register", (req: Request, res: Response) => {
  const page = new RegistrationPage();
  res.set("Content-Type", "text/html").send(page.render());
});

// SPA Routes: /app/...
app.use("/app", (_: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) => res.send(html));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
