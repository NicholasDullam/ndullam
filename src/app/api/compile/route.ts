"use server";

import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { z } from "zod";
import { compile } from "./_util/compile";

const bodySchema = z.object({
  code: z.string(),
});

export async function POST(request: NextRequest) {
  const _body = bodySchema.safeParse(await request.json());
  if (!_body.success)
    return NextResponse.json({ error: _body.error }, { status: 400 });
  const body = _body.data;

  const tmp = path.join(
    process.env.NODE_ENV === "development" ? process.cwd() : "",
    "/tmp",
  );
  const dir = path.join(tmp, Date.now().toString());
  const file = path.join(dir, "expr.java");

  try {
    if (!fs.existsSync(tmp)) fs.mkdirSync(tmp);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    fs.writeFileSync(file, body.code);

    const response = await compile(file);
    return NextResponse.json(
      {
        response: fs.readFileSync(path.join(dir, "expr.s")).toString(),
        time: response.time,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}
