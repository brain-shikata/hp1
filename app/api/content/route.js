import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";
import { COOKIE_NAME, SESSION_SECRET } from "@/lib/auth";
import { cookies } from "next/headers";

async function isAuthed() {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === SESSION_SECRET;
}

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "認証が必要です。" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const saved = await saveContent(body);
    return NextResponse.json({ ok: true, content: saved });
  } catch (e) {
    return NextResponse.json(
      { error: "保存に失敗しました。" },
      { status: 400 }
    );
  }
}
