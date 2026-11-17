import { revalidateTag } from "next/cache";
import { CONTENT_TAG } from "@/lib/api";

// Called by the Express API after an admin saves something, so the public
// site shows the change on the next visit. Protected by REVALIDATE_SECRET.
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return Response.json({ ok: false }, { status: 401 });
  }
  revalidateTag(CONTENT_TAG, { expire: 0 });
  return Response.json({ ok: true, revalidated: CONTENT_TAG });
}
