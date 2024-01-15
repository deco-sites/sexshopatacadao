import Component from "$store/islands/Newsletter/NewsletterCompact.tsx";
import type { Props } from "$store/components/newsletter/NewsletterCompact.tsx";

export default function NewsletterCompact({ success, ...props }: Props) {
  return <Component {...props} />;
}
