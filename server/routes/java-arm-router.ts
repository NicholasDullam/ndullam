import express from "express";
import { compileCode } from "../controllers/java-arm-controller";

const router = express.Router();

router.post("/java-arm/compile", compileCode);

export default router;
