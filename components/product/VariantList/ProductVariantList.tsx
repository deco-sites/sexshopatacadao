import type { AnalyticsItem, Product } from "apps/commerce/types.ts";
import BrowserLog from "$store/islands/BrowserLog.tsx";
import { useVariantPossibilities } from "$store/components/product/VariantList/useVariantPossibilites.ts";
import List from "$store/components/product/VariantList/List.tsx";
import Grid from "$store/components/product/VariantList/Grid.tsx";
import ProductVariantSummary from "$store/islands/ProductVariantList/Summary.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

interface Props {
  product: Product;
}

function ProductVariantList({ product }: Props) {
  const { url, isVariantOf, offers } = product;

  const seller = offers?.offers[0].seller;

  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant);

  const hasTwoSpecifications = Object.keys(possibilities).length === 2;
  const sizes = Object.entries(possibilities).find(([specificationName]) =>
    specificationName.toLowerCase() === "tamanhos"
  )?.[1];

  const hasSizes = !!sizes;
  const hasOneSize = hasSizes &&
    (Object.keys(sizes).length === 1 ||
      // Check if all sizes are the same (usually when it's "Único" or "U")
      !Object.values(sizes).some((obj, _index, arr) =>
        obj.value !== arr[0].value
      ));

  const shouldRenderGrid = hasSizes && hasTwoSpecifications && !hasOneSize; // Otherwise, render a list

  const variantsAnalyticsData = hasVariant.reduce((acc, variant) => {
    const { sku } = variant;

    const {
      price = 0,
      listPrice,
    } = useOffer(variant.offers);

    acc[sku] = mapProductToAnalyticsItem({
      product: variant,
      price,
      listPrice,
    });

    return acc;
  }, {} as Record<string, AnalyticsItem>);

  return (
    <div class="flex flex-col">
      {/* <BrowserLog payload={{ product, possibilities }} /> */}
      <strong class="text-primary-500 text-sm leading-[130%]">
        Selecione os itens desejados
      </strong>
      {shouldRenderGrid
        ? <Grid possibilities={possibilities} />
        : <List possibilities={possibilities} />}
      <ProductVariantSummary
        variantsAnalyticsData={variantsAnalyticsData}
        seller={seller ?? "1"}
      />
    </div>
  );
}

export default ProductVariantList;
