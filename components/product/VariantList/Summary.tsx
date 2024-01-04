import { useSelectedVariants } from "$store/components/product/VariantList/useSelectedVariants.ts";
import { useComputed } from "@preact/signals";
import { formatPrice } from "deco-sites/sexshopatacadao/sdk/format.ts";
import Button from "$store/components/product/AddToCartButton/common.tsx";
import { AnalyticsItem } from "apps/commerce/types.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";

export interface ProductVariantSummaryProps {
  variantsAnalyticsData: Record<string, AnalyticsItem>;
  seller: string;
  currency?: string;
}

function ProductVariantSummary(
  { variantsAnalyticsData, seller, currency }: ProductVariantSummaryProps,
) {
  const { selectedVariants } = useSelectedVariants();

  const quantity = useComputed(() =>
    Object.entries(selectedVariants.value).reduce((acc, variant) => {
      const [sku, quantity] = variant;
      const skuPrice = variantsAnalyticsData[sku]?.price;

      if (!skuPrice || !quantity) {
        return acc;
      }

      return acc + quantity;
    }, 0)
  );

  const value = useComputed(() => {
    const total = Object.entries(selectedVariants.value).reduce(
      (acc, variant) => {
        const [sku, quantity] = variant;
        const skuPrice = variantsAnalyticsData[sku]?.price;

        if (!skuPrice || !quantity) {
          return acc;
        }

        return acc + (skuPrice * quantity);
      },
      0,
    );

    return formatPrice(total, currency);
  });

  const eventParams = useComputed(() => ({
    items: Object.entries(selectedVariants.value).map(([sku, quantity]) => ({
      ...variantsAnalyticsData[sku],
      quantity,
    })),
  }));

  const { addItems, loading } = useCart();

  const onAddItem = () =>
    addItems({
      orderItems: Object.entries(selectedVariants.value).map((
        [sku, quantity],
      ) => ({
        id: sku,
        quantity,
        seller,
      })),
    });

  return (
    <div class="flex flex-col md:flex-row md:justify-between gap-6 py-4 border-y border-y-gray-400 mt-4 mr-5">
      <div class="flex flex-col font-montserrat gap-2.5 tracking-[1px]">
        <strong class="uppercase leading-[139%] text-[22px] text-primary-500">
          Subtotal: <>{value}</>
        </strong>
        <span class="text-sm leading-[130%] text-gray-800">
          Quantidade de itens: <>{quantity}</>
        </span>
      </div>
      <Button onAddItem={onAddItem} eventParams={eventParams.value} />
    </div>
  );
}

export default ProductVariantSummary;
