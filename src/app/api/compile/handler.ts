"use server";

import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { compile } from "./_util/compile";

type BodyParsed = {
  code: string;
};

export async function POST(request: NextRequest) {
  const body: BodyParsed = await request.json();
  try {
    const tmp = path.join(__dirname, "..", "..", "tmp");
    const dir = path.join(tmp, Date.now().toString());
    const file = path.join(dir, "expr.java");

    if (!fs.existsSync(tmp)) fs.mkdirSync(tmp);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    fs.writeFileSync(file, body.code);
    fs.writeFileSync(path.join(dir, "data.json"), JSON.stringify(body));

    const response = await compile(file);
    const compiled = fs.readFileSync(path.join(dir, "expr.s"));

    fs.rmSync(dir, { recursive: true, force: true });
    return NextResponse.json(
      { response: compiled.toString(), time: response.time },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
