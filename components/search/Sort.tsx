import { useMemo } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";
import Icon from "$store/components/ui/Icon.tsx";
import { useSignal } from "@preact/signals";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (value: string) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  urlSearchParams.delete("page");

  urlSearchParams.set(SORT_QUERY_PARAM, value);
  window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

// TODO: move this to the loader
const portugueseMappings = {
  "relevance:desc": "Relevância",
  "price:desc": "Maior preço",
  "price:asc": "Menor preço",
  "orders:desc": "Mais Vendidos",
  "name:desc": "De Z a A",
  "name:asc": "De A a Z",
  "release:desc": "Mais recentes",
  "discount:desc": "Descontos",
};

function Sort({ sortOptions }: Props) {
  const sort = useSort();
  const close = useSignal(false);

  return (
    <div class={"relative z-[12] cursor-pointer font-montserrat px-2"}>
      <div
        class="data-[open-details='true']:fixed inset-0"
        data-open-details={close}
        onClick={() => close.value = false}
      >
      </div>
      <div
        class="text-black peer group"
        data-open={close.value}
      >
        <p
          class="flex text-sm items-center"
          onClick={() => close.value = true}
        >
          <span
            class={"text-sm leading-[1.15]"}
          >
            <span class="max-xs:hidden">
              Ordenar Por{" "}
            </span>
            <strong class="min-w-[106px] inline-block">
              {portugueseMappings[sort as keyof typeof portugueseMappings] ??
                "Relevância"}
            </strong>
            <Icon
              class={"inline-block w-auto group-open:rotate-180 transition-all px-4"}
              width={16}
              height={16}
              id="ChevronDown"
            />
          </span>
        </p>
      </div>
      <div class="absolute w-full -top-[14px] min-w-[180px] grid grid-rows-[0fr] peer-data-[open='true']:grid-rows-[1fr] shadow-none peer-data-[open='true']:shadow-[4px_4px_8px_0_rgba(0,0,0,.2)] transition-all opacity-0 peer-data-[open='true']:opacity-100  bg-white rounded border border-gray-400">
        <div class="w-full overflow-hidden flex flex-col ">
          {sortOptions.map(({ value, label }) => ({
            value,
            label:
              portugueseMappings[label as keyof typeof portugueseMappings] ??
                label,
          })).filter(({ label }) => label).map(({ value, label }) => (
            <button
              type="button"
              data-active={sort === value}
              key={value}
              value={value}
              selected={value === sort}
              onClick={() => applySort(value)}
              class="px-4 py-3 leading-[1.15] bg-white data-[active='true']:!bg-gray-400 hover:bg-[#E3E4E6] w-full text-left text-[#3f3f40]"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // return (
  //   <select
  //     id="sort"
  //     name="sort"
  //     onInput={applySort}
  //     class="w-min h-[36px] px-1 rounded m-2 text-base-content cursor-pointer outline-none"
  //   >
  //     {sortOptions.map(({ value, label }) => ({
  //       value,
  //       label: portugueseMappings[label as keyof typeof portugueseMappings] ??
  //         label,
  //     })).filter(({ label }) => label).map(({ value, label }) => (
  //       <option key={value} value={value} selected={value === sort}>
  //         <span class="text-sm">{label}</span>
  //       </option>
  //     ))}
  //   </select>
  // );
}

export default Sort;
