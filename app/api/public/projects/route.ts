import { NextResponse } from "next/server";
import { listProjects } from "@/lib/project-repo";

export async function GET() {
  try {
    const { data, error } = await listProjects("public");
    if (error) {
      return NextResponse.json(
        { ok: false, error: "Failed to load projects", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, projects: data });
  } catch (error) {
    const details = error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json({ ok: false, error: "Failed to load projects", details }, { status: 500 });
  }
}
