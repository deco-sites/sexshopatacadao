import { getCookies } from "std/http/cookie.ts";

export function getGalleryMode(req: Request) {
  const cookies = getCookies(req.headers);
  const mode = cookies["galleryMode"] ?? "grid";
  return mode as "grid" | "list";
}

export default function GetGalleryModeLoader<T>({ ...props }: T, req: Request) {
  const galleryMode = getGalleryMode(req);
  return { ...props, galleryMode };
}
