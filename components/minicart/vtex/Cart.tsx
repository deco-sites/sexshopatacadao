import { itemToAnalyticsItem, useCart } from "apps/vtex/hooks/useCart.ts";
import type { Product } from "apps/commerce/types.ts";
import BaseCart from "../common/Cart.tsx";
import { useComputed, useSignal, useSignalEffect } from "@preact/signals";
import { invoke } from "$store/runtime.ts";

const useProductsSpecifications = (ids: string[]) => {
  const productsSpecifications = useSignal(
    undefined as Map<string, Product["additionalProperty"]> | undefined,
  );

  const fetchAdditionalProperties = async () => {
    const products = await invoke.vtex.loaders.legacy.productList({
      props: {
        ids,
      },
    });

    if (!products) return;

    const productMap = products.reduce((map, product) => {
      product.isVariantOf?.hasVariant?.forEach((variant) => {
        if (!ids.includes(variant.sku)) {
          return;
        }

        const filteredAdditionalProperties = variant?.additionalProperty
          ?.filter(
            (property) => property.valueReference === "SPECIFICATION",
          );

        if (filteredAdditionalProperties?.length) {
          map.set(variant.sku, filteredAdditionalProperties);
        }
      });

      return map;
    }, new Map<string, Product["additionalProperty"]>());

    productsSpecifications.value = productMap;
  };

  useSignalEffect(() => {
    ids?.length && fetchAdditionalProperties();
  });

  return productsSpecifications.value;
};

function Cart() {
  const { cart, loading, updateItems, addCouponsToCart } = useCart();
  const { items, totalizers } = cart.value ?? { items: [] };
  const total = totalizers?.find((item) => item.id === "Items")?.value || 0;
  const discounts =
    totalizers?.find((item) => item.id === "Discounts")?.value || 0;
  const locale = cart.value?.clientPreferencesData.locale ?? "pt-BR";
  const currency = cart.value?.storePreferencesData.currencyCode ?? "BRL";
  const coupon = cart.value?.marketingData?.coupon ?? undefined;

  console.log( totalizers, total, discounts, (total+discounts) / 100 )

  const idsToFetchAdditionalProperties = useComputed(() => {
    const ids = new Set<string>();

    for (const item of (cart.value?.items ?? [])) {
      if (item.refId !== item.productRefId) {
        ids.add(item.id);
      }
    }

    return Array.from(ids);
  });

  const productsSpecifications = useProductsSpecifications(
    idsToFetchAdditionalProperties.value,
  );

  return (
    <BaseCart
      items={items.map((item) => ({
        image: { src: item.imageUrl, alt: item.skuName },
        quantity: item.quantity,
        name: item.name,
        price: {
          sale: item.sellingPrice / 100,
          list: item.listPrice / 100,
        },
        specifications: productsSpecifications?.get(item.id),
        url: item.detailUrl,
      }))}
      total={(total + discounts) / 100}
      subtotal={total / 100}
      discounts={discounts / 100}
      locale={locale}
      currency={currency}
      loading={loading.value}
      freeShippingTarget={250}
      coupon={coupon}
      onAddCoupon={(text) => addCouponsToCart({ text })}
      onUpdateQuantity={(quantity, index) =>
        updateItems({ orderItems: [{ index, quantity }] })}
      itemToAnalyticsItem={(index) => {
        const item = items[index];

        return item && itemToAnalyticsItem({ ...item, coupon }, index);
      }}
      checkoutHref="/checkout"
    />
  );
}

export default Cart;
