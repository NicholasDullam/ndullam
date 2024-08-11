import { exec } from "child_process";
import path from "path";

export type CompileResponse = {
  response: string;
  time: number;
};

export const compile = async (dir: string) =>
  new Promise<CompileResponse>((resolve, reject) => {
    const baseline = Date.now();
    const cwd = path.join(__dirname, "../../../../..");
    return exec(
      `./codegen ${dir}`,
      {
        cwd,
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
