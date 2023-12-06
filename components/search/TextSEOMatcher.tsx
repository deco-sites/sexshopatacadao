import TextSEO from "$store/components/search/TextSEO.tsx";

/**
 * @title {{matcher}}
 */
export interface Item {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;

  /**
   * @description text to be rendered on top of the image
   * @format html
   */
  text?: string;
}

export interface Props {
  /**
   * @title Texto Search
   * @titleBy matcher
   */
  items: Item[];
}

export default function TextSeoMatcher(
  { text }: { text?: string | null | undefined },
) {
  if (!text) return null;

  return <TextSEO text={text} />;
}

export const loader = (props: Props, req: Request) => {
  const { items } = { ...props };

  const text = items.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  )?.text;

  return { text };
};
