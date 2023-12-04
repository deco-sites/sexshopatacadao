import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import Cart from "$store/components/minicart/Cart.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Button from "$store/components/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));

export interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  platform: ReturnType<typeof usePlatform>;
}

const Aside = (
  { title, onClose, children, class: _class }: {
    title?: string;
    onClose?: () => void;
    children: ComponentChildren;
    class?: string;
  },
) => (
  <div
    class={`bg-base-100 grid grid-rows-[auto_1fr] h-full max-w-[100vw] ${_class}`}
  >
    <div class="flex justify-between items-center">
      {title && (
        <h1 class="px-4 py-3">
          <span class="font-medium text-2xl">{title}</span>
        </h1>
      )}
      {onClose && (
        <Button class="btn btn-ghost" onClick={onClose}>
          <Icon id="XMark" size={24} strokeWidth={2} />
        </Button>
      )}
    </div>
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

export type CartDrawerProps = Pick<Props, "platform" | "children">;

export function CartDrawer(
  { platform, children }: CartDrawerProps,
) {
  const { displayCart } = useUI();

  return (
    <Drawer // right drawer
      class="drawer-end"
      open={displayCart.value !== false}
      onClose={() => displayCart.value = false}
      aside={
        <Aside
          title="Minha sacola"
          onClose={() => displayCart.value = false}
        >
          <Cart platform={platform} />
        </Aside>
      }
    >
      {children}
    </Drawer>
  );
}

export type MenuDrawerProps = Pick<Props, "menu" | "children">;

export function MenuDrawer(
  { menu, children }: MenuDrawerProps,
) {
  const { displayMenu } = useUI();

  return (
    <Drawer // left drawer
      open={displayMenu.value}
      onClose={() => {
        displayMenu.value = false;
      }}
      aside={
        <Aside // onClose={() => {
         //   displayMenu.value = false;
        // }}
        // title="Menu"
        class="w-[80%] relative">
          {displayMenu.value && <Menu {...menu} />}
        </Aside>
      }
    >
      {children}
    </Drawer>
  );
}
