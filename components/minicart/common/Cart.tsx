import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import CartItem, { Item, Props as ItemProps } from "./CartItem.tsx";
import Coupon, { Props as CouponProps } from "./Coupon.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";
import Icon from "deco-sites/sexshopatacadao/components/ui/Icon.tsx";
import type { Product } from "apps/commerce/types.ts";

export interface EnhancedItem extends Item {
  specifications?: Product["additionalProperty"];
  url?: string;
}

interface Props {
  items: EnhancedItem[];
  loading: boolean;
  total: number;
  subtotal: number;
  discounts: number;
  locale: string;
  currency: string;
  coupon?: string;
  freeShippingTarget: number;
  checkoutHref: string;
  onAddCoupon?: CouponProps["onAddCoupon"];
  onUpdateQuantity: ItemProps["onUpdateQuantity"];
  itemToAnalyticsItem: ItemProps["itemToAnalyticsItem"];
}

function Cart({
  items,
  total,
  subtotal,
  locale,
  coupon,
  loading,
  currency,
  discounts,
  freeShippingTarget,
  checkoutHref,
  itemToAnalyticsItem,
  onUpdateQuantity,
  onAddCoupon,
}: Props) {
  const { displayCart } = useUI();
  const isEmpty = items.length === 0;
  console.log(total, "incart");

  return (
    <div class="flex flex-col overflow-hidden">
      <button
        onClick={() => displayCart.value = false}
        type="button"
        class="w-[58px] h-[58px] flex items-center justify-center text-black"
      >
        <Icon id="Close" size={15} strokeWidth={1} />
      </button>

      {/* Free Shipping Bar */}
      <FreeShippingProgressBar
        total={total}
        locale={locale}
        currency={currency}
        target={freeShippingTarget}
      />

      {/* Title */}
      <h2 class="text-lg pt-[9px] px-3 mt-1 mb-6 font-bold flex items-center text-gray-800">
        Meu Carrinho
      </h2>
      {
        /* <div class="flex gap-5 items-center">
        <Icon id="ShippingTruck" size={37} strokeWidth={0} />
        <span>
          Frete <strong class="animate-blink-primary text-lg">GRÁTIS</strong>
          {" "}
          a partir de{" "}
          <strong class="animate-blink-primary text-lg">R$ 250,00*</strong>{" "}
          válido para todo o Brasil!
        </span>
      </div> */
      }
      <div class="flex-1 flex flex-col justify-center items-center overflow-hidden" // style={{ minWidth: "calc(min(100vw, 425px))", maxWidth: "425px" }}
      >
        {isEmpty
          ? (
            <div class="flex flex-col gap-10 items-center">
              <Icon
                id="ShoppingCart"
                size={40}
                strokeWidth={0}
                class="text-primary-500"
              />
              <span class="font-montserrat my-">Seu carrinho está vazio.</span>
            </div>
          )
          : (
            <>
              {/* Cart Items */}
              <ul
                role="list"
                class="lg:mt-6 px-3 flex-grow overflow-y-auto flex flex-col gap-10 w-full pb-4 scrollbar scrollbar-track-[#e3e4e6] scrollbar-track-rounded-[0] scrollbar-thumb-primary-500 scrollbar-thumb-rounded-[0] scrollbar-w-[13px]"
              >
                {items.map((item, index) => (
                  <li key={index}>
                    <CartItem
                      item={item}
                      index={index}
                      locale={locale}
                      currency={currency}
                      onUpdateQuantity={onUpdateQuantity}
                      itemToAnalyticsItem={itemToAnalyticsItem}
                    />
                  </li>
                ))}
              </ul>

              {/* Cart Footer */}
              <footer class="w-full px-3 py-2 shadow-[0_0_12px_rgba(0,0,0,.15)]">
                <div class="flex flex-col gap-3 text-gray-800">
                  {/* Subtotal */}
                  <div class="w-full flex justify-between text-sm font-bold">
                    <span>Subtotal</span>
                    <span class="">
                      {formatPrice(subtotal, currency, locale)}
                    </span>
                  </div>
                  {
                    /* {onAddCoupon && (
                    <Coupon onAddCoupon={onAddCoupon} coupon={coupon} />
                  )} */
                  }
                  {discounts < 0 && (
                    <div class="flex justify-between items-center font-bold">
                      <span class="text-sm">Descontos</span>
                      <span class="text-base">
                        {formatPrice(discounts, currency, locale)}
                      </span>
                    </div>
                  )}

                  {/* Total */}
                  <div class="flex justify-between items-center w-full font-bold">
                    <span class="text-sm">Total</span>
                    <span class="text-base">
                      {formatPrice(total, currency, locale)}
                    </span>
                  </div>

                  <span class="text-[10px] font-montserrat leading-none">
                    Taxas e fretes calculados no checkout
                  </span>

                  <div class="mt-2">
                    <a class="inline-block w-full" href={checkoutHref}>
                      <Button
                        data-deco="buy-button"
                        class="btn-block rounded-none bg-success-500 hover:bg-success-600 text-white font-montserrat font-bold !border-none h-[52px] text-base"
                        disabled={loading || isEmpty}
                        onClick={() => {
                          sendEvent({
                            name: "begin_checkout",
                            params: {
                              coupon,
                              currency,
                              value: total - discounts,
                              items: items
                                .map((_, index) => itemToAnalyticsItem(index))
                                .filter((x): x is AnalyticsItem => Boolean(x)),
                            },
                          });
                        }}
                      >
                        Finalizar Compra
                      </Button>
                    </a>
                  </div>
                </div>
              </footer>
            </>
          )}
      </div>
    </div>
  );
}

export default Cart;
