import { exec } from "child_process";

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
        cwd: process.cwd(),
      },
      (error, stdout, stderr) => {
        if (error) return reject(stderr.toString());
        return resolve({
          response: stdout.toString(),
          time: Date.now() - baseline,
        });
      },
    );
  });
