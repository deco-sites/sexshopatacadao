import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import CartQuantitySelector from "$store/components/minicart/common/CartQuantitySelector.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useCallback, useState } from "preact/hooks";
import { EnhancedItem } from "deco-sites/sexshopatacadao/components/minicart/common/Cart.tsx";

export interface Item {
  image: {
    src: string;
    alt: string;
  };
  name: string;
  quantity: number;
  price: {
    sale: number;
    list: number;
  };
}

export interface Props {
  item: EnhancedItem;
  index: number;

  locale: string;
  currency: string;

  onUpdateQuantity: (quantity: number, index: number) => Promise<void>;
  itemToAnalyticsItem: (index: number) => AnalyticsItem | null | undefined;
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function CartItem(
  {
    item,
    index,
    locale,
    currency,
    onUpdateQuantity,
    itemToAnalyticsItem,
  }: Props,
) {
  const { image, name, price: { sale, list }, quantity, specifications, url } =
    item;
  const isGift = sale < 0.01;
  const [loading, setLoading] = useState(false);

  const withLoading = useCallback(
    <A,>(cb: (args: A) => Promise<void>) => async (e: A) => {
      try {
        setLoading(true);
        await cb(e);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <div
      class="grid grid-rows-1 gap-2"
      style={{
        gridTemplateColumns: "auto 1fr auto",
      }}
    >
      <Image
        alt={image.alt}
        src={image.src.replace(/(ids\/\d+)-\d+-\d+/, "$1")}
        style={{ aspectRatio: "1" }}
        width={96}
        height={96}
        class="h-full object-contain"
      />

      <div class="flex flex-col gap-2 text-gray-800">
        <div class="flex flex-col">
          <span title={name} class="text-xs line-clamp-2 h-8 font-bold">
            {url
              ? (
                <a href={url}>
                  {name}
                </a>
              )
              : name}
          </span>
          {specifications?.map(({ name, value }) => (
            <span class="text-sm line-clamp-1">
              {capitalize(name!)}: {capitalize(value!)}
            </span>
          ))}
        </div>
        <div class="flex items-center gap-2 mt-2 font-bold">
          {list !== sale && (
            <span class="self-start line-through text-gray-400 text-[10px] leading-none">
              {formatPrice(list, currency, locale)}
            </span>
          )}
          <span class="text-[15px] leading-none text-primary-500">
            {isGift ? "Grátis" : formatPrice(sale, currency, locale)}
          </span>
        </div>

        <CartQuantitySelector
          disabled={loading || isGift}
          quantity={quantity}
          onChange={withLoading(async (quantity) => {
            const analyticsItem = itemToAnalyticsItem(index);
            const diff = quantity - item.quantity;

            await onUpdateQuantity(quantity, index);

            if (analyticsItem) {
              sendEvent({
                name: diff < 0 ? "remove_from_cart" : "add_to_cart",
                params: {
                  items: [{ ...analyticsItem, quantity: Math.abs(diff) }],
                },
              });
            }
          })}
        />
      </div>

      <Button
        disabled={loading || isGift}
        loading={loading}
        class="btn-ghost btn-square my-auto"
        onClick={withLoading(async () => {
          const analyticsItem = itemToAnalyticsItem(index);

          await onUpdateQuantity(0, index);

          analyticsItem && sendEvent({
            name: "remove_from_cart",
            params: { items: [analyticsItem] },
          });
        })}
      >
        <Icon id="Trash" size={16} strokeWidth={0} />
      </Button>
    </div>
  );
}

export default CartItem;
