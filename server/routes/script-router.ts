import express from "express";
import {
    createScript,
    getScriptById,
    getScripts,
    runScript,
} from "../controllers/script-controller";

const router = express.Router();

router.post("/scripts", createScript);
router.post(`/scripts/:_id`, runScript);
router.get(`/scripts/:_id`, getScriptById);
router.get(`/scripts`, getScripts);

module.exports = router;
