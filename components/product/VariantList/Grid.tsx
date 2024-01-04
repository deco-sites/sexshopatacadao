import { Possibilities } from "$store/components/product/VariantList/useVariantPossibilites.ts";
import Avatar from "$store/components/product/VariantList/Avatar.tsx";
import ProductVariantAmountSelector from "$store/islands/ProductVariantList/AmountSelector.tsx";
import ProductVariantOutOfStockButton from "$store/islands/ProductVariantList/OutOfStockButton.tsx";
import BrowserLog from "deco-sites/sexshopatacadao/islands/BrowserLog.tsx";

const SIZES = ["PP", "P", "M", "G", "GG", "XG"];

type GridItem = {
  sku: string;
  inStock: boolean;
} | null;

function Grid({ possibilities }: { possibilities: Possibilities }) {
  const entries = Object.entries(possibilities);

  // Usually colors
  const specificationNameToGroup =
    entries.find(([specificationName]) =>
      specificationName.toLowerCase() !== "tamanhos"
    )![0];

  const existingSizes = Array.from(
    new Set(
      Object.values(
        entries.find(([specificationName]) =>
          specificationName.toLowerCase() === "tamanhos"
        )![1],
      ).map(({ value }) => value),
    ),
  ).sort((a, b) => SIZES.indexOf(a) - SIZES.indexOf(b));

  const sizesValues =
    entries.find(([specificationName]) =>
      specificationName.toLowerCase() === "tamanhos"
    )![1];

  const rows = Object.entries(possibilities[specificationNameToGroup]).reduce(
    (acc, [sku, variant]) => {
      const value = variant.value;

      const data = {
        sku,
        inStock: variant.inStock,
      };

      const size = sizesValues[sku].value;

      if (acc[value]) {
        acc[value].items.splice(
          existingSizes.indexOf(size),
          1,
          data,
        );
        return acc;
      }

      const startingArray = existingSizes.map(() => null as GridItem);

      return {
        ...acc,
        [value]: {
          groupImgUrl: variant.url,
          groupImg: variant.image,
          items: startingArray.toSpliced(
            existingSizes.indexOf(size),
            1,
            data,
          ),
        },
      };
    },
    {} as Record<
      string,
      {
        groupImgUrl: string;
        groupImg: string;
        items: GridItem[];
      }
    >,
  );

  return (
    <div class="flex flex-col md:h-[300px] md:overflow-y-auto overflow-x-auto scrollbar scrollbar-track-[#ebebeb] scrollbar-track-rounded-[10px] scrollbar-thumb-primary-500 scrollbar-thumb-rounded-[10px] scrollbar-w-[7px] scrollbar-h-[7px]">
      <div class="md:w-[580px] w-[700px] 2xl:w-[unset] flex flex-col">
        <div class="flex w-full bg-gray-200 mb-2.5 md:pl-[30px] gap-6">
          <strong class="uppercase text-sm leading-[130%] block my-3.5 w-[84px] text-center text-gray-800">
            {specificationNameToGroup}
          </strong>
          <div class="flex gap-7 md:gap-12">
            {existingSizes.map((size) => (
              <strong class="uppercase text-sm leading-[130%] block my-3.5 w-[90px] text-center text-gray-800">
                {size}
              </strong>
            ))}
          </div>
        </div>
        <div class="flex flex-col md:ml-[30px] md:pr-5 gap-x-[30px] gap-y-4 pt-[10px]">
          {Object.entries(rows).map((
            [groupedSpecValue, { groupImg, groupImgUrl, items }],
          ) => (
            <div class="flex items-center gap-6 py-3 hover:bg-gray-200">
              <Avatar
                sku={items.flatMap((item) => item ? [item.sku] : []).join(",")}
                img={groupImg}
                label={groupedSpecValue}
                url={groupImgUrl}
              />
              <div class="flex gap-7 md:gap-12">
                {items.map((item) => (
                  <div class="w-[90px] pb-7">
                    {item &&
                      (item.inStock
                        ? <ProductVariantAmountSelector sku={item.sku} />
                        : <ProductVariantOutOfStockButton sku={item.sku} />)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Grid;
