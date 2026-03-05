"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ProjectRecord } from "@/lib/types/project";

type ProjectFormProps = {
  mode: "create" | "edit";
  project?: ProjectRecord;
};

type ProjectPayload = {
  title: string;
  slug?: string;
  summary: string;
  description: string;
  stack: string[];
  tags: string[];
  highlights: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  coverImageUrl?: string;
};

type ApiErrorResponse = {
  error?: string;
  details?: string;
  issues?: Array<{ message?: string; path?: Array<string | number> }>;
};

const toCsv = (values: string[]) => values.join(", ");
const fromCsv = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export function ProjectForm({ mode, project }: ProjectFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [summary, setSummary] = useState(project?.summary ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [stack, setStack] = useState(project ? toCsv(project.stack) : "");
  const [tags, setTags] = useState(project ? toCsv(project.tags) : "");
  const [highlights, setHighlights] = useState(project ? toCsv(project.highlights) : "");
  const [liveUrl, setLiveUrl] = useState(project?.liveUrl ?? "");
  const [repoUrl, setRepoUrl] = useState(project?.repoUrl ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(project?.coverImageUrl ?? "");
  const [featured, setFeatured] = useState(project?.featured ?? false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const payload: ProjectPayload = {
      title,
      slug,
      summary,
      description,
      stack: fromCsv(stack),
      tags: fromCsv(tags),
      highlights: fromCsv(highlights),
      liveUrl,
      repoUrl,
      featured,
      coverImageUrl,
    };

    const endpoint = mode === "create" ? "/api/projects" : `/api/projects/${project?.id}`;
    const method = mode === "create" ? "POST" : "PUT";

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as ApiErrorResponse | null;
      const issueMessage =
        data?.issues?.map((issue) => issue.message).filter(Boolean).join(", ") ?? "";
      setError(issueMessage || data?.details || data?.error || "Request failed.");
      setIsSubmitting(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!project) return;
    const confirmed = window.confirm("Delete this project?");
    if (!confirmed) return;

    setError(null);
    setIsSubmitting(true);

    const response = await fetch(`/api/projects/${project.id}`, { method: "DELETE" });
    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as ApiErrorResponse | null;
      setError(data?.details || data?.error || "Delete failed.");
      setIsSubmitting(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1 text-sm">
          <span className="font-medium text-slate-700">Title</span>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-slate-900"
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="font-medium text-slate-700">Slug (optional)</span>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-slate-900"
          />
        </label>
      </div>

      <label className="space-y-1 text-sm">
        <span className="font-medium text-slate-700">Summary</span>
        <input
          required
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-slate-900"
        />
      </label>

      <label className="space-y-1 text-sm">
        <span className="font-medium text-slate-700">Description</span>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className="w-full border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-slate-900"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="space-y-1 text-sm">
          <span className="font-medium text-slate-700">Stack (comma separated)</span>
          <input
            value={stack}
            onChange={(e) => setStack(e.target.value)}
            className="w-full border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-slate-900"
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="font-medium text-slate-700">Tags (comma separated)</span>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-slate-900"
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="font-medium text-slate-700">Highlights (comma separated)</span>
          <input
            value={highlights}
            onChange={(e) => setHighlights(e.target.value)}
            className="w-full border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-slate-900"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1 text-sm">
          <span className="font-medium text-slate-700">Live URL</span>
          <input
            type="url"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-slate-900"
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="font-medium text-slate-700">Repo URL</span>
          <input
            type="url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/..."
            className="w-full border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-slate-900"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1 text-sm">
          <span className="font-medium text-slate-700">Cover Image URL (optional)</span>
          <input
            type="url"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            placeholder="https://example.com/cover.jpg"
            className="w-full border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-slate-900"
          />
        </label>
        <label className="flex items-center gap-2 pt-7 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-4 w-4 border-slate-300"
          />
          Featured project
        </label>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="border border-slate-900 bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : mode === "create" ? "Create Project" : "Save Changes"}
        </button>
        {mode === "edit" ? (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isSubmitting}
            className="border border-red-600 px-4 py-2 text-sm font-semibold text-red-600 disabled:opacity-60"
          >
            Delete
          </button>
        ) : null}
      </div>
    </form>
  );
}
