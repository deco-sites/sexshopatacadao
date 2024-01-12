import { Possibilities } from "$store/components/product/VariantList/useVariantPossibilites.ts";
import Avatar from "$store/components/product/VariantList/Avatar.tsx";
import ProductVariantAmountSelector from "$store/islands/ProductVariantList/AmountSelector.tsx";
import ProductVariantOutOfStockButton from "$store/islands/ProductVariantList/OutOfStockButton.tsx";

function List({ possibilities }: { possibilities: Possibilities }) {
  const [specificationName, variants] = Object.entries(possibilities)[0];

  const sortedVariantsByStock = Object.entries(variants).sort(([, a], [, b]) =>
    !a.inStock ? (!b.inStock ? 0 : 1) : !b.inStock ? -1 : 0 // Out of stock last
  );

  return (
    <div class="flex-col">
      <div class="flex w-full bg-gray-200 my-2.5">
        <strong class="uppercase text-sm leading-[130%] block my-3.5 w-[129px] text-center text-gray-800">
          {specificationName}
        </strong>
      </div>
      <div class="flex flex-wrap my-5 ml-[30px] md:h-[280px] md:overflow-y-auto md:pr-5 pt-5 gap-x-[30px] gap-y-5 scrollbar scrollbar-track-[#ebebeb] scrollbar-track-rounded-[10px] scrollbar-thumb-primary-500 scrollbar-thumb-rounded-[10px] scrollbar-w-[10px]">
        {sortedVariantsByStock.map(([sku, { value, image, inStock, url }]) => (
          <div class="flex flex-col items-center gap-6">
            <Avatar
              sku={sku}
              img={image}
              label={value}
              url={url}
            />

            <div class="w-[84px] flex-1 flex items-end">
              {inStock
                ? <ProductVariantAmountSelector sku={sku} />
                : <ProductVariantOutOfStockButton sku={sku} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
