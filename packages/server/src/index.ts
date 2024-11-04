// src/index.ts
import express, { Request, Response } from "express";
import componentRouter from "./routes/component";
import buttonRouter from "./routes/button";
import { connect } from "./services/mongo";

connect("publish-ui");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.use("/component", componentRouter);
app.use("/button", buttonRouter);
