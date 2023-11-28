import { CartDrawer as Component } from "$store/components/header/Drawers.tsx";
import type { CartDrawerProps as Props } from "$store/components/header/Drawers.tsx";

function Island(props: Props) {
  return <Component {...props} />;
}

export default Island;
