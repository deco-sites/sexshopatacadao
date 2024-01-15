import { AppContext } from "deco-sites/sexshopatacadao/apps/site.ts";

export function checkIsMobile(ctx: AppContext) {
  return ctx.device === "mobile";
}

export default function IsMobileLoader<T>(
  { ...props }: T,
  _req: Request,
  ctx: AppContext,
) {
  const isMobile = checkIsMobile(ctx);
  return { ...props, isMobile };
}
