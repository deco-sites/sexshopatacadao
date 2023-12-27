import { AppContext } from "$store/apps/site.ts";
import { setCookie } from "std/http/cookie.ts";

export type GalleryMode = "grid" | "list";

export interface Props {
  mode: GalleryMode;
}

const GALLERY_MODE_COOKIE_NAME = "galleryMode";

const ONE_WEEK_MS = 7 * 24 * 3600 * 1_000;

const action = (
  props: Props,
  _req: Request,
  ctx: AppContext,
) => {
  setCookie(ctx.response.headers, {
    name: GALLERY_MODE_COOKIE_NAME,
    value: props.mode,
    path: "/",
    expires: new Date(Date.now() + ONE_WEEK_MS),
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
  });

  return `Ok; Set to ${props.mode}`;
};

export default action;
