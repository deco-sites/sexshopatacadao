import { useSelectedVariants } from "$store/components/product/VariantList/useSelectedVariants.ts";
import { useComputed } from "@preact/signals";

export interface ProductVariantAmountSelectorProps {
  sku: string;
}

function ProductVariantAmountSelector(
  { sku }: ProductVariantAmountSelectorProps,
) {
  const { selectedVariants } = useSelectedVariants();

  const quantity = useComputed(() => selectedVariants.value[sku] ?? 0);

  const decrement = () => {
    selectedVariants.value = {
      ...selectedVariants.value,
      [sku]: Math.max(quantity.value - 1, 0),
    };
  };

  const increment = () =>
    selectedVariants.value = {
      ...selectedVariants.value,
      [sku]: Math.min(quantity.value + 1, 999),
    };

  return (
    <div class="w-full border border-gray-400 rounded-[5px] flex flex-col h-[58px] font-[sans-serif]">
      <input
        class="input flex-1 text-center join-item [appearance:textfield] w-fill min-h-[unset] text-black text-sm !outline-none p-0"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        max={999}
        min={1}
        value={quantity}
        onBlur={(e) =>
          selectedVariants.value = {
            ...selectedVariants.value,
            [sku]: e.currentTarget.valueAsNumber,
          }}
        maxLength={3}
        size={3}
      />
      <div class="flex text-black text-lg">
        <button
          type="button"
          onClick={decrement}
          class="flex-1 h-6 flex items-center justify-center border border-gray-400 rounded-bl-[5px] hover:bg-primary-500 hover:text-white"
        >
          -
        </button>

        <button
          type="button"
          onClick={increment}
          class="flex-1 h-6 flex items-center justify-center border border-gray-400 rounded-br-[5px] hover:bg-primary-500 hover:text-white"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default ProductVariantAmountSelector;
