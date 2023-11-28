import { MenuDrawer as Component } from "$store/components/header/Drawers.tsx";
import type { MenuDrawerProps as Props } from "$store/components/header/Drawers.tsx";

function Island(props: Props) {
  return <Component {...props} />;
}

export default Island;
