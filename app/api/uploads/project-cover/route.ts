import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]);

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

function getExt(file: File) {
  const mapped = EXT_BY_TYPE[file.type];
  if (mapped) return mapped;

  const original = file.name.split(".").pop()?.toLowerCase().trim();
  if (original && /^[a-z0-9]+$/.test(original)) return original;
  return "bin";
}

export async function POST(request: NextRequest) {
  const isAdmin = await isAdminRequest(request);
  if (!isAdmin) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "No file uploaded" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { ok: false, error: "Invalid file type. Use JPG, PNG, WEBP, AVIF, or GIF." },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { ok: false, error: "File is too large. Maximum allowed size is 5MB." },
        { status: 400 },
      );
    }

    const bucket = process.env.SUPABASE_STORAGE_BUCKET || "project-covers";
    const ext = getExt(file);
    const objectPath = `projects/${Date.now()}-${randomUUID()}.${ext}`;

    const bytes = Buffer.from(await file.arrayBuffer());
    const supabase = getSupabaseAdmin();
    const { error: uploadError } = await supabase.storage.from(bucket).upload(objectPath, bytes, {
      cacheControl: "31536000",
      contentType: file.type,
      upsert: false,
    });

    if (uploadError) {
      return NextResponse.json(
        { ok: false, error: "Failed to upload file", details: uploadError.message },
        { status: 500 },
      );
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(objectPath);
    return NextResponse.json({ ok: true, url: data.publicUrl, path: objectPath });
  } catch (error) {
    const details = error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json({ ok: false, error: "Upload failed", details }, { status: 500 });
  }
}
