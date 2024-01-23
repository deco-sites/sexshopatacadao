/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import ProductCard from "$store/components/product/ProductCard.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useSuggestions } from "$store/sdk/useSuggestions.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { Suggestion } from "apps/commerce/types.ts";
import { Resolved } from "deco/engine/core/resolver.ts";
import { useEffect, useRef } from "preact/compat";
import type { Platform } from "$store/apps/site.ts";
import Image from "apps/website/components/Image.tsx";
import { clsx } from "deco-sites/sexshopatacadao/sdk/clx.ts";
import { useComputed, useSignal } from "@preact/signals";

// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;

  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;

  platform?: Platform;
}

function Searchbar({
  placeholder = "What are you looking for?",
  action = "/s",
  name = "q",
  loader,
  platform,
}: Props) {
  const isFocused = useSignal(false);
  const id = useId();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setQuery, payload, loading, query } = useSuggestions(loader);
  const { products = [], searches = [] } = payload.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);

  const open = isFocused.value && !!query && (hasProducts || hasTerms);

  const shouldClear = !!query;

  return (
    <div
      class="relative w-full max-w-[598px] md:max-w-[750px] lg:max-w-[598px] h-[48px] group lg:group-data-[micro-header='true']/header:mr-[100px] transition-all order-last basis-full lg:basis-[unset] lg:order-none mx-6 lg:mx-0"
      data-open={open}
    >
      <div class="absolute top-0 left-0 w-full rounded-[6px] border border-gray-100 bg-white transition-colors z-10 group-data-[open='true']:border-primary-500">
        <form id={id} action={action} class="flex w-full">
          <input
            ref={searchInputRef}
            id="search-input"
            class="input !border-0 !rounded-[6px] border-gray-100 flex-grow !outline-none !border-b-[1.5px] group-data-[open='true']:!rounded-b-none font-montserrat text-gray-700 text-base lg:text-[13px] h-[35px] lg:h-[48px]"
            name={name}
            onInput={(e) => {
              const value = e.currentTarget.value;

              if (value) {
                sendEvent({
                  name: "search",
                  params: { search_term: value },
                });
              }

              setQuery(value);
            }}
            onFocus={() => isFocused.value = true}
            onBlur={() => isFocused.value = false}
            placeholder={placeholder}
            role="combobox"
            aria-controls="search-suggestion"
            autocomplete="off"
          />
          {
            /* <button type="submit" class="hidden" for={id} tabIndex={-1}>
            Submit
          </button> */
          }
          <Button
            type="submit"
            class="btn-square !bg-primary-500 !border-primary-500 text-white w-[60px] rounded-[6px] h-[35px] lg:h-[48px] !min-h-[unset]"
            aria-label="Search"
            // onClick={(e) => {
            //   e.preventDefault();

            //   if (searchInputRef.current) {
            //     if (shouldClear) {
            //       setQuery("");
            //       searchInputRef.current.value = "";
            //     }

            //     searchInputRef.current.focus();
            //   }
            // }}
          >
            {loading.value
              ? <span class="loading loading-spinner loading-xs" />
              : shouldClear
              ? <Icon id="XMark" size={16} strokeWidth={2} />
              : <Icon id="MagnifyingGlass" size={16} strokeWidth={0.01} />}
          </Button>
        </form>

        <div class="flex flex-col text-xs max-h-0 overflow-y-auto invisible opacity-0 transition-all group-data-[open=true]:visible group-data-[open=true]:opacity-100 group-data-[open=true]:max-h-[60vh] scrollbar-track-[#f0f0f0] scrollbar-track-rounded-[50px] scrollbar-thumb-primary-500 scrollbar-thumb-rounded-[50px] scrollbar-w-[10px] scrollbar">
          <ul id="search-suggestion" class="flex flex-col font-montserrat">
            <li>
              <a href={`/s?q=${query}`} class="flex p-3">
                <span>
                  Buscar por "<>{query}</>"
                </span>
              </a>
            </li>
            {searches.map(({ term }) => (
              <li>
                <a href={`/s?q=${term}`} class="flex p-3">
                  <span dangerouslySetInnerHTML={{ __html: term }} />
                </a>
              </li>
            ))}
          </ul>
          <ul class="flex flex-col">
            {products.map((product) => {
              const [image] = product.image ?? [];

              return (
                <li class="p-3 flex gap-3 items-center">
                  <Image
                    src={image.url!}
                    alt={image.alternateName!}
                    width={29}
                    height={29}
                    loading="lazy"
                    decoding="async"
                  />
                  <span>{product.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
