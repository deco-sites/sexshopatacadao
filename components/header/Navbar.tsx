import { type SiteNavigationElement } from "$store/components/header/Header.tsx";
import NavItem from "$store/components/header/NavItem.tsx";

export interface NavbarProps {
  navItems?: SiteNavigationElement[] | null;
}

const Navbar = ({ navItems }: NavbarProps) => {
  const { normal, highlight } = (navItems ?? []).reduce((acc, item) => {
    if (item.highlighted) {
      acc.highlight.push(item);
    } else {
      acc.normal.push(item);
    }
    return acc;
  }, {
    normal: [] as SiteNavigationElement[],
    highlight: [] as SiteNavigationElement[],
  });

  return (
    <nav class="w-full flex justify-center pt-3">
      <ul class="flex items-center justify-center text-xs m-0 relative px-2 gap-[7px]">
        {normal?.map((navItem) => <NavItem item={navItem} />)}
        {!!highlight.length && (
          <>
            <li class="h-[70px] w-[1px] bg-black self-start" />
            {highlight.map((navItem) => <NavItem item={navItem} />)}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
