import matchUrlLoader from "deco-sites/sexshopatacadao/loaders/matchUrl.ts";
import type {
  Banner,
  Props as BannerCarouselProps,
} from "$store/components/ui/BannerCarousel.tsx";
import BannerCarousel from "$store/components/ui/BannerCarousel.tsx";

export interface MatcherItem {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;

  images?: Banner[];
}

export interface Props extends Omit<BannerCarouselProps, "images"> {
  items: MatcherItem[];
}

function BannerCarouselMatcher(props: ReturnType<typeof loader>) {
  return <BannerCarousel {...props} />;
}

export const loader = (props: Props, req: Request) => {
  const { items, ...rest } = props;

  const matched = matchUrlLoader(items, req);

  return { images: matched?.images, ...rest };
};

export default BannerCarouselMatcher;
