import MatchDevice from "deco/matchers/MatchDevice.ts";

export function checkIsMobile(req: Request) {
  return MatchDevice({ mobile: true, tablet: true }, {
    siteId: 0,
    request: req,
  });
}

export default function IsMobileLoader<T>({ ...props }: T, req: Request) {
  const isMobile = checkIsMobile(req);
  return { ...props, isMobile };
}
