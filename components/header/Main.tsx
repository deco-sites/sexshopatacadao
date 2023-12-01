import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonLinx from "$store/islands/Header/Cart/linx.tsx";
import CartButtonShopify from "$store/islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import CartButtonWake from "$store/islands/Header/Cart/wake.tsx";
import CartButtonNuvemshop from "$store/islands/Header/Cart/nuvemshop.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import Image from "apps/website/components/Image.tsx";
import { navbarHeight } from "./constants.ts";

function Main({ searchbar, logo }: {
  searchbar?: SearchbarProps;
  logo?: { src: string; alt: string };
}) {
  const platform = usePlatform();

  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="md:hidden flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6 gap-2"
      >
        <MenuButton />

        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image src={logo.src} alt={logo.alt} width={126} height={16} />
          </a>
        )}

        <div class="flex gap-1">
          <SearchButton />
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-row justify-evenly items-center max-w-[96rem] mx-auto">
        <div class="flex-none lg:my-5">
          {logo && (
            <a
              href="/"
              aria-label="Distribuidor Sex Shop Atacadão"
              // class="block px-4 py-3 w-[160px]"
              class="flex"
            >
              <Image src={logo.src} alt={logo.alt} width={122} height={71} />
            </a>
          )}
        </div>
        <Searchbar searchbar={searchbar} />
        <div class="flex-none items-center hidden lg:flex">
          <a
            class="flex items-center gap-2 group-data-[micro-header='true']/header:flex-col py-2"
            href="/login"
            aria-label="Log in"
          >
            <Icon
              id="User"
              size={20}
              strokeWidth={0}
              class="text-primary-500"
            />
            <span class="block uppercase text-xs font-bold group-data-[micro-header='true']/header:hidden">
              Faça Login | Cadastre-se
            </span>
            <span class="hidden text-xs group-data-[micro-header='true']/header:block">
              Entrar
            </span>
          </a>
        </div>
        <div class="flex-none flex items-center">
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
          {platform === "wake" && <CartButtonWake />}
          {platform === "linx" && <CartButtonLinx />}
          {platform === "shopify" && <CartButtonShopify />}
          {platform === "nuvemshop" && <CartButtonNuvemshop />}
        </div>
      </div>
    </>
  );
}

export default Main;
