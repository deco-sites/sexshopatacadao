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
import { clsx } from "deco-sites/sexshopatacadao/sdk/clx.ts";

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
  const id = useId();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setQuery, payload, loading } = useSuggestions(loader);
  const { products = [], searches = [] } = payload.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);

  const open = hasProducts || hasTerms;

  return (
    <div class="relative w-full max-w-3xl h-[48px] group" data-open={open}>
      <div class="absolute top-0 left-0 w-full rounded-[6px] border border-gray-100 bg-white transition-colors z-10 focus-within:border-primary-500">
        <form id={id} action={action} class="flex w-full">
          <input
            ref={searchInputRef}
            id="search-input"
            class="input !border-0 !rounded-[6px] border-gray-100 flex-grow !outline-none group-data-[open='true']:!border-b group-data-[open='true']:!rounded-b-none"
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
            placeholder={placeholder}
            role="combobox"
            aria-controls="search-suggestion"
            autocomplete="off"
          />
          <Button
            type="submit"
            class="btn-square !bg-primary-500 !border-primary-500 text-white w-[60px] rounded-[6px]"
            aria-label="Search"
            for={id}
            tabIndex={-1}
          >
            {loading.value
              ? <span class="loading loading-spinner loading-xs" />
              : <Icon id="MagnifyingGlass" size={16} strokeWidth={0.01} />}
          </Button>
        </form>

        <div class="max-h-0 overflow-y-auto invisible opacity-0 transition-all group-data-[open=true]:visible group-data-[open=true]:opacity-100 group-data-[open=true]:max-h-[60vh] scrollbar-track-[#f0f0f0] scrollbar-track-rounded-[50px] scrollbar-thumb-primary-500 scrollbar-thumb-rounded-[50px] scrollbar-w-[10px] scrollbar">
          <div class="flex flex-col">
            <ul id="search-suggestion" class="flex flex-col">
              {searches.map(({ term }) => (
                <li>
                  <a href={`/s?q=${term}`} class="flex gap-4 items-center">
                    <span dangerouslySetInnerHTML={{ __html: term }} />
                  </a>
                </li>
              ))}
            </ul>
            <div class="flex flex-col pt-6 md:pt-0 gap-6 overflow-x-hidden">
              <span
                class="font-medium text-xl"
                role="heading"
                aria-level={3}
              >
                Produtos sugeridos
              </span>
              <ul class="flex flex-col">
                {products.map((product) => (
                  <li class="carousel-item first:ml-4 last:mr-4 min-w-[200px] max-w-[200px]">
                    <span>{product.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
