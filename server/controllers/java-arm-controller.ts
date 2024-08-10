import { exec } from "child_process";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const compileCompiler = () =>
  new Promise<string>((resolve, reject) => {
    return exec(
      "make",
      {
        cwd: path.join(__dirname, "..", "compiler"),
      },
      (error, stdout, stderr) => {
        if (error) return reject(stderr.toString());
        return resolve(stdout.toString());
      }
    );
  });

export const compileJava = async (dir: string) =>
  new Promise<{ response: string; time: number }>((resolve, reject) => {
    const baseline = Date.now();
    return exec(
      `./codegen ${dir}`,
      {
        cwd: path.join(__dirname, "..", "compiler"),
      },
      (error, stdout, stderr) => {
        if (error) return reject(stderr.toString());
        return resolve({
          response: stdout.toString(),
          time: Date.now() - baseline,
        });
      }
    );
  });

export const compileCode = async (req: Request, res: Response) => {
  try {
    let tmp = path.join(__dirname, "..", "..", "tmp");
    let dir = path.join(tmp, Date.now().toString());
    let file = path.join(dir, "expr.java");
    if (!fs.existsSync(tmp)) fs.mkdirSync(tmp);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    fs.writeFileSync(file, req.body.code);
    fs.writeFileSync(path.join(dir, "data.json"), JSON.stringify(req.body));
    const compile = await compileJava(file);
    const response = fs.readFileSync(path.join(dir, "expr.s"));
    fs.rmSync(dir, { recursive: true, force: true });
    return res
      .status(200)
      .json({ response: response.toString(), time: compile.time });
  } catch (error: any) {
    return res.status(400).json({ error: error.message || error });
  }
};
