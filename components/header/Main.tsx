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
import { useUser } from "deco-sites/std/packs/vtex/hooks/useUser.ts";

function Main({ searchbar, logo, isMobile }: {
  searchbar?: SearchbarProps;
  logo?: { src: string; alt: string };
  isMobile?: boolean;
}) {
  const platform = usePlatform();
  const { user } = useUser();
  const isLoggedIn = !!user.value?.email;

  return (
    <>
      {/* Mobile Version */}
      {
        /* <div
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
      </div> */
      }

      {/* Desktop Version */}
      <div class="flex flex-row flex-wrap lg:flex-nowrap lg:justify-evenly justify-center items-center max-w-[96rem] mx-auto lg:py-5">
        {isMobile && <MenuButton />}

        <div class="flex-none">
          {logo && (
            <a
              href="/"
              aria-label="Distribuidor Sex Shop Atacadão"
              // class="block px-4 py-3 w-[160px]"
              class="flex py-2 lg:p-0"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={122}
                height={71}
                class="w-[114px] h-[66px] lg:w-[122px] lg:h-[71px]"
                loading="lazy"
              />
            </a>
          )}
        </div>
        <Searchbar searchbar={searchbar} />
        <div class="flex-none items-center hidden lg:flex">
          <div class="flex items-center gap-2 group group-data-[micro-header='true']/header:justify-between group-data-[micro-header='true']/header:flex-col transition-all h-[48px] relative">
            <Icon
              id="User"
              size={20}
              strokeWidth={0}
              class="text-primary-500"
            />
            <a
              class="flex items-center "
              href="/login"
              aria-label="Log in"
            >
              <span class="block uppercase text-xs font-bold group-data-[micro-header='true']/header:hidden">
                {isLoggedIn ? `Olá, ${user.value?.email}` : (
                  <>
                    Faça Login | Cadastre-se
                  </>
                )}
              </span>
              <span class="hidden text-xs group-data-[micro-header='true']/header:block leading-none">
                Entrar
              </span>
            </a>
            {isLoggedIn && (
              <>
                <div class="group-hover:flex hidden -translate-x-1/2 left-1/2 absolute  
              w-[2rem] h-[2rem] rotate-45 shadow-[4px_8px_8px_rgba(0,0,0,.25)] top-[34px]">
                </div>
                <ul class="group-hover:flex hidden -translate-x-1/2 left-1/2 top-full absolute bottom-[-20px] bg-white shadow-[4px_8px_8px_rgba(0,0,0,.25)] min-h-[170px] min-w-[300px] flex-col justify-center items-center z-50">
                  <li>
                    <a href="/account">Minha conta</a>
                  </li>
                  <li>
                    <a href="/account#/orders">Meus pedidos</a>
                  </li>
                  <li>
                    <a
                      class="block px-4 py-[10px] text-center text-danger"
                      href={`/api/vtexid/pub/logout?scope=atacadaosexyshop&returnUrl=${window.location?.href}`}
                    >
                      Sair
                    </a>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
        <div class="flex-1 lg:flex-none flex items-center lg:justify-start justify-end">
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
