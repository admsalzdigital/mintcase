import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let password = "";

  try {
    const body = await request.json();
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }

  const expected = process.env.SITE_ACCESS_PASSWORD || "admlovr";

  if (password !== expected) {
    return NextResponse.json({ error: "Falsches Passwort" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("mintcase-access", "granted", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
