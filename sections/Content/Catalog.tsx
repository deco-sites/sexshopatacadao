import { asset } from "$fresh/runtime.ts";
import Component from "$store/islands/Catalog.tsx";
import type { Props } from "$store/components/ui/Catalog.tsx";

export default function Catalog({ success, ...props }: Props) {
  return <Component {...props} />;
}
