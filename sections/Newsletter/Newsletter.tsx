import { asset } from "$fresh/runtime.ts";
import Component from "$store/islands/Newsletter/Newsletter.tsx";
import type { Props } from "$store/components/newsletter/Newsletter.tsx";

const NEWSLETTER_BG = asset("/image/news-bg.svg");

export default function Newsletter({ success, ...props }: Props) {
  return <Component {...props} />;
}
