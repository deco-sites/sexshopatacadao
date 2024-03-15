import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";

export type Props =
  & Pick<ProductListingPage, "filters" | "sortOptions">
  & {
    displayFilter?: boolean;
  };

function SearchControls(
  { filters, displayFilter, sortOptions }: Props,
) {
  const open = useSignal(false);

  return (
    <Drawer
      class="drawer-end lg:w-[unset]"
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <div class="pl-6 flex align-top">
          <Icon
            id="XMark"
            size={24}
            strokeWidth={2}
            class="fixed top-0 left-0 p-1 bg-white/60"
            onClick={() => open.value = false}
          />
          <div class="bg-base-100 flex flex-1 flex-col h-full divide-y overflow-y-hidden w-[80%]">
            <div class="flex justify-between items-center">
              <h4 class="p-4">
                <span class="font-montserrat text-2xl !leading-[1.15]">
                  Filtros
                </span>
              </h4>
              {
                /* <Button class="btn btn-ghost" onClick={() => open.value = false}>
                <Icon id="XMark" size={24} strokeWidth={2} />
              </Button> */
              }
            </div>
            <div class="flex-grow overflow-auto px-2">
              <Filters filters={filters} />
            </div>
            I
          </div>
        </div>
      }
    >
      <div class="flex flex-col justify-between sm:gap-4 pt-1 sm:flex-row sm:h-[53px] w-full sm:border-b-0 border-b border-gray-400">
        <div class="flex flex-row items-center justify-around sm:gap-4 w-full">
          {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
          <Button
            class={displayFilter ? "btn-ghost" : "btn-ghost lg:hidden"}
            onClick={() => {
              open.value = true;
            }}
          >
            Filtrar
            <Icon id="FilterList" width={16} height={16} strokeWidth={1} />
          </Button>
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
