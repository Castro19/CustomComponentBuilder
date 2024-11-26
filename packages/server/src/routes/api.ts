import express from "express";
import { authenticateUser } from "./auth";
import componentRouter from "./component";
import buttonRouter from "./button";

const router = express.Router();

// all routes under this router require authentication
// router.use(authenticateUser);

router.use("/component", componentRouter);
router.use("/button", buttonRouter);

export default router;
