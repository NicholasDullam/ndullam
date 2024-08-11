import { exec } from "child_process";
import path from "path";

export const compile = async (dir: string) =>
  new Promise<{ response: string; time: number }>((resolve, reject) => {
    const baseline = Date.now();
    return exec(
      `./codegen ${dir}`,
      {
        cwd: path.join(__dirname, "../../../../..", "compiler"),
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
