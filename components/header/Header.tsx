import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import isMobileLoader from "$store/loaders/isMobile.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import CartDrawer from "$store/islands/Header/CartDrawer.tsx";
import MenuDrawer from "$store/islands/Header/MenuDrawer.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { SetupMicroHeader } from "$store/islands/Header/SetupMicroHeader.tsx";
import Main from "./Main.tsx";
import Navbar from "$store/components/header/Navbar.tsx";
import { type EditableProps as BenefitsProps } from "$store/components/header/Benefits.tsx";
import Benefits from "$store/components/header/Benefits.tsx";

const HEADER_HEIGHT_DESKTOP = 266;
const HEADER_HEIGHT_MOBILE = 180;

/** @titleBy name */
export interface SiteNavigationElementLeaf {
  /** The name of the item. */
  name: string;
  /** URL of the item. */
  url: string;
}

/** @titleBy name */
export interface SiteNavigationElement extends SiteNavigationElementLeaf {
  /** Icon for the item. */
  icon?: ImageWidget;
  /**
   * @description Highlighted items will be at last desktop navbar
   */
  highlighted?: boolean;
  /**
   * @title Pinned
   * @description Pinned items will be at first in mobile menu
   */
  pinned?: boolean;

  children?: SiteNavigationElementLeaf[];
}

export interface Props {
  /** @title Benefits & Help */
  benefits: BenefitsProps;

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /** @title Logo */
  logo?: { src: ImageWidget; alt: string };
}

function Header(
  { benefits, searchbar, navItems, logo, isMobile }: ReturnType<typeof loader>,
) {
  const platform = usePlatform();
  const items = navItems ?? [];

  // Pinned at first
  const mobileItems = items.toSorted((a, b) =>
    (a.pinned && !b.pinned) ? -1 : (b.pinned && !a.pinned) ? 1 : 0
  );

  return (
    <>
      <header
        id="main-header"
        class="group/header"
        style={{
          height: isMobile ? HEADER_HEIGHT_MOBILE : HEADER_HEIGHT_DESKTOP,
        }}
      >
        {/* <Drawers menu={{ items }} searchbar={searchbar} platform={platform}> */}
        <div class="bg-base-100 fixed w-full z-50 group-data-[micro-header='true']/header:shadow-md">
          <Benefits {...benefits} isMobile={isMobile} />
          {/* <Alert alerts={alerts} /> */}
          <Main
            searchbar={searchbar && { ...searchbar, platform }}
            logo={logo}
            isMobile={isMobile}
          />
          {!isMobile && <Navbar navItems={items} />}
        </div>
        <CartDrawer platform={platform} />
        {isMobile && <MenuDrawer menu={{ items: mobileItems }} />}
        {/* </Drawers> */}
      </header>
      <SetupMicroHeader rootId="main-header" />
    </>
  );
}

export function loader(props: Props, req: Request) {
  return isMobileLoader(props, req);
}

export default Header;
