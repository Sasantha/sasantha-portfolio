import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { isAdminRequest } from "@/lib/auth";
import {
  deleteProject,
  getProjectById,
  slugExists,
  updateProject,
} from "@/lib/project-repo";
import { normalizeProjectInput } from "@/lib/validators/project";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Params) {
  const isAdmin = await isAdminRequest(request);
  if (!isAdmin) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const { data: project, error } = await getProjectById(id);
    if (error) {
      return NextResponse.json(
        { ok: false, error: "Failed to load project", details: error.message },
        { status: 500 },
      );
    }

    if (!project) {
      return NextResponse.json({ ok: false, error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, project });
  } catch (error) {
    const details = error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json({ ok: false, error: "Failed to load project", details }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  const isAdmin = await isAdminRequest(request);
  if (!isAdmin) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const input = normalizeProjectInput(body);

    const { exists, error: slugError } = await slugExists(input.slug, id);
    if (slugError) {
      return NextResponse.json(
        { ok: false, error: "Failed to validate slug", details: slugError.message },
        { status: 500 },
      );
    }

    if (exists) {
      return NextResponse.json({ ok: false, error: "Slug already exists" }, { status: 409 });
    }

    const { data: project, error: updateError } = await updateProject(id, input);
    if (updateError) {
      return NextResponse.json(
        { ok: false, error: "Failed to update project", details: updateError.message },
        { status: 500 },
      );
    }
    if (!project) {
      return NextResponse.json({ ok: false, error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, project });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { ok: false, error: "Validation failed", issues: error.issues },
        { status: 400 },
      );
    }
    const details = error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json({ ok: false, error: "Failed to update project", details }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const isAdmin = await isAdminRequest(request);
  if (!isAdmin) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const { data: existing, error: getError } = await getProjectById(id);
  if (getError) {
    return NextResponse.json(
      { ok: false, error: "Failed to delete project", details: getError.message },
      { status: 500 },
    );
  }
  if (!existing) {
    return NextResponse.json({ ok: false, error: "Project not found" }, { status: 404 });
  }

  const { error } = await deleteProject(id);
  if (error) {
    return NextResponse.json(
      { ok: false, error: "Failed to delete project", details: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
