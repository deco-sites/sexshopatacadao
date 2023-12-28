import AddToCartButtonVTEX from "$store/components/product/AddToCartButton/vtex.tsx";
import type { Props as AddToCartButtonProps } from "$store/components/product/AddToCartButton/vtex.tsx";
import { useComputed, useSignal } from "@preact/signals";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";

export type Props = Omit<AddToCartButtonProps, "quantity">;

function ProductDetailsActions({ eventParams, ...props }: Props) {
  const quantity = useSignal(1);
  const eventItem = useComputed(() => ({
    ...eventParams.items[0],
    quantity: quantity.value,
  }));

  return (
    <div class="flex justify-between items-center pt-[15px] pb-[10px] pr-5">
      <QuantitySelector
        quantity={quantity.value}
        onChange={(value) => (quantity.value = value)}
      />

      <AddToCartButtonVTEX
        {...props}
        quantity={quantity.value}
        eventParams={{ items: [eventItem.value] }}
      />
    </div>
  );
}

export default ProductDetailsActions;
