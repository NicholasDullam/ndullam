import { exec } from "child_process";
import path from "path";

export type CompileResponse = {
  response: string;
  time: number;
};

export const compile = async (dir: string) =>
  new Promise<CompileResponse>((resolve, reject) => {
    const baseline = Date.now();
    return exec(
      `./codegen ${dir}`,
      {
        cwd: path.join(__dirname, "../../../../../.."),
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
