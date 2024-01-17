import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import Icon from "deco-sites/sexshopatacadao/components/ui/Icon.tsx";
import { lazy, Suspense } from "preact/compat";
import PriceRange from "deco-sites/sexshopatacadao/islands/Search/PriceRange.tsx";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} rel="nofollow" class="flex gap-2">
      <div
        aria-checked={selected}
        class="w-4 h-4 min-w-[1rem] min-h-[1rem] border-[2px] border-gray-400 aria-[checked='true']:bg-primary-500 aria-[checked='true']:border-primary-500"
      >
        <Icon id="CheckMark" size={12} class="text-white" />
      </div>
      <span class="text-sm font-montserrat leading-[16px]">{label}</span>
      {/* {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>} */}
    </a>
  );
}

function FilterValues(filterItem: FilterToggle) {
  const { key, values } = filterItem;
  // const flexDirection = key === "tamanho" || key === "cor"
  //   ? "flex-row"
  //   : "flex-col";
  const flexDirection = "flex-col";

  // ! NOT WORKING :/
  // if (key === "price") {
  //   return (
  //     <Suspense fallback={<div>Loading...</div>}>
  //       <PriceRange filter={filterItem} />
  //     </Suspense>
  //   );
  // }

  return (
    <ul class={`flex flex-wrap lg:gap-[14px] gap-5 ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        // if (key === "cor" || key === "tamanho") {
        //   return (
        //     <a href={url} rel="nofollow">
        //       <Avatar
        //         content={value}
        //         variant={selected ? "active" : "default"}
        //       />
        //     </a>
        //   );
        // }

        if (key === "price") {
          const range = parseRange(item.value);
          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  return (
    <ul class="flex flex-col gap-5">
      {filters
        .filter(isToggle)
        .map((filter) => (
          <li class="pb-[6px] border-b border-gray-400">
            <div class="collapse custom-collapse !rounded-none">
              <input type="checkbox" defaultChecked />
              <div class="flex justify-between collapse-title h-[58px] px-0">
                <span class="text-base text-gray-800 font-montserrat font-semibold !leading-none">
                  {filter.label}
                </span>

                <Icon
                  width={16}
                  height={16}
                  id="ChevronDown"
                  class="rotate-180 transition-transform custom-collapse-arrow ml-auto"
                />
              </div>
              <div class="collapse-content px-0 max-h-[200px] overflow-y-auto scrollbar scrollbar-track-[#f0f0f0] scrollbar-track-rounded-[50px] scrollbar-thumb-[#d3d3d3] scrollbar-thumb-rounded-[50px] scrollbar-w-[12px]">
                {filter.key == "price" || filter.key == "PriceRanges"
                  ? <PriceRange filter={filter} />
                  : <FilterValues {...filter} />}
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default Filters;
