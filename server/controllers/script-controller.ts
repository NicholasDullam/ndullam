import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { ScriptModel } from "../models/script";

export const run = (dir: string) =>
  new Promise((success, failure) => {
    const { spawn } = require("child_process");
    const start = Date.now();
    const program = spawn("python", [
      path.join(__dirname, "..", "python", "tester.py"),
      dir,
    ]);
    program.stdout.on("data", (response: string) =>
      success({ response, time: Date.now() - start })
    );
    program.stderr.on("data", (error: string) => failure(error.toString()));
  });

export const createScript = async (req: Request, res: Response) => {
  const { _id, type, description, code, args, language } = req.body;
  try {
    if (process.env.NODE_ENV === "production")
      throw new Error("Scripts can only be added in the devkit");
    const target = await ScriptModel.findById(_id);
    if (target) throw new Error("Script already exists");
    let script = new ScriptModel({
      _id,
      type,
      description,
      code,
      args,
      language,
    });
    script = await script.save();
    return res.status(200).json(script);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const getScriptById = async (req: Request, res: Response) => {
  const { _id } = req.params;
  ScriptModel.findById(_id)
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(400).json({ error: error.message });
    });
};

export const getScripts = async (req: Request, res: Response) => {
  let query = { ...req.query },
    reserved = ["sort", "skip", "limit"],
    pipeline = [];
  reserved.forEach((el) => delete query[el]);
  pipeline.push({ $match: query });
  pipeline.push({
    $project: {
      password: 0,
    },
  });

  // paginate pipeline facet
  pipeline.push({
    $facet: {
      data: (function paginate() {
        let data = [];
        if (req.query.skip) data.push({ $skip: Number(req.query.skip) });
        if (req.query.limit) data.push({ $limit: Number(req.query.limit) });
        return data;
      })(),
      summary: [{ $count: "count" }],
    },
  });

  //paginate pipeline count removal
  pipeline.push({
    $project: {
      data: "$data",
      summary: { $arrayElemAt: ["$summary", 0] },
    },
  });

  ScriptModel.aggregate(pipeline)
    .then((response) => {
      return res.status(200).json({
        ...response[0],
        summary: {
          count: response[0].summary ? response[0].summary.count : 0,
          has_more:
            (Number(req.query.skip) || 0) + (Number(req.query.limit) || 0) <
            (response[0].summary ? response[0].summary.count : 0),
        },
      });
    })
    .catch((error) => {
      return res.status(400).json({ error: error.message });
    });
};

export const runScript = async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const target = await ScriptModel.findById(_id);
    if (!target) throw new Error("Script does not exist");
    let tmp = path.join(__dirname, "..", "..", "tmp");
    let dir = path.join(tmp, _id);
    let file = path.join(dir, "solver.py");
    if (!fs.existsSync(tmp)) fs.mkdirSync(tmp);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    fs.writeFileSync(file, target.code);
    fs.writeFileSync(path.join(dir, "data.json"), JSON.stringify(req.body));
    let response: any = await run(dir);
    fs.rmSync(dir, { recursive: true, force: true });
    return res
      .status(200)
      .json({ response: response.response.toString(), time: response.time });
  } catch (error: any) {
    return res.status(400).json({ error: error.message || error });
  }
};
