import { useCart } from "apps/vtex/hooks/useCart.ts";
import type { ComponentChildren } from "preact";
import { useUI } from "deco-sites/sexshopatacadao/sdk/useUI.ts";
import { useSignal } from "@preact/signals";
import { clsx } from "deco-sites/sexshopatacadao/sdk/clx.ts";
import { GalleryMode } from "deco-sites/sexshopatacadao/actions/gallery/mode.ts";

export function ProductCardAddToCart(
  { children, onClick, class: _class, galleryMode }: {
    children?: ComponentChildren;
    onClick?: (e: Event) => void;
    class?: string;
    galleryMode: GalleryMode;
  },
) {
  return (
    <button
      type="button"
      aria-label="view product"
      class={clsx(
        "btn btn-block !bg-primary-500 !outline-none !border-none text-white font-montserrat text-base min-h-[unset] h-[44px] font-normal rounded-[5px]",
        _class,
        galleryMode === "list" && "w-fit",
        galleryMode === "grid" && "btn-block",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export interface ProductCardActionsProps {
  text?: string;
  productID: string;
  seller: string;
  galleryMode: GalleryMode;
}

function ProductCardActions(
  { text, productID, seller, galleryMode }: ProductCardActionsProps,
) {
  const quantity = useSignal(1);
  const { addItems } = useCart();
  const { displayCart } = useUI();

  const onAddItem = async () => {
    await addItems({
      orderItems: [{
        id: productID,
        seller: seller,
        quantity: quantity.value,
      }],
    });

    displayCart.value = true;
  };

  const decrement = () => quantity.value = Math.max(0, quantity.value - 1);

  const increment = () => quantity.value = Math.min(quantity.value + 1, 999);

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
      }}
      class={`flex w-full ${galleryMode === "list" ? "max-w-[340px]" : ""}`}
    >
      <div class="h-[44px] rounded-l-[5px] border border-[#ccc] w-[40%] min-w-[40%] sm:w-[30%] sm:min-w-[30%] text-black flex">
        <button
          type="button"
          onClick={decrement}
          class="w-1/4 h-full flex items-center justify-center text-xl font-bold"
        >
          -
        </button>

        <input
          class="input text-center join-item [appearance:textfield] h-[42px] w-[40%] min-h-[unset] text-black text-sm !outline-none p-0 font-montserrat"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          max={999}
          min={1}
          value={quantity}
          onBlur={(e) => quantity.value = e.currentTarget.valueAsNumber}
          maxLength={3}
          size={3}
        />
        <button
          type="button"
          onClick={increment}
          class="w-1/4 h-full flex items-center justify-center text-xl font-bold"
        >
          +
        </button>
      </div>
      <ProductCardAddToCart
        galleryMode={galleryMode}
        class="flex-1 -ml-[5px]"
        onClick={onAddItem}
      >
        {text || "Ver produto"}
      </ProductCardAddToCart>
    </div>
  );
}

export default ProductCardActions;
