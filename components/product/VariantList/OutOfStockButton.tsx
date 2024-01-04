export interface ProductVariantOutOfStockButtonProps {
  sku: string;
}

function ProductVariantOutOfStockButton(
  { sku }: ProductVariantOutOfStockButtonProps,
) {
  // TODO OPEN MODAL

  return (
    <div class="border border-gray-400 rounded-[5px] flex flex-col h-[58px] font-[sans-serif] w-full">
      <button
        type="button"
        class="flex flex-1 flex-col text-center items-center py-[7px] transition-colors hover:bg-gray-400 font-montserrat"
      >
        <strong class="text-xs leading-[131.19%] text-gray-800">
          Esgotado
        </strong>
        <span class="text-primary-650 leading-[131.19%] text-[10px] underline">
          Avise-me quando chegar
        </span>
      </button>
    </div>
  );
}

export default ProductVariantOutOfStockButton;
