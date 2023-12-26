import type { Platform } from "$store/apps/site.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossibilities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import {
  ProductCardAddToCart,
} from "$store/components/product/ProductCardActions.tsx";
import ProductCardActions from "$store/islands/ProductCard/Actions.tsx";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
  };
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    allPrices?: boolean;
    installments?: boolean;
    cta?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  layout?: Layout;
  platform?: Platform;
  isMobile?: boolean;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const WIDTH = 202;
const HEIGHT = 202;

function ProductCard(
  { product, preload, itemListName, layout, platform, index, isMobile }: Props,
) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
  } = product;
  const id = `product-card-${productID}`;
  // const hasVariant = isVariantOf?.hasVariant ?? [];
  const productGroupID = isVariantOf?.productGroupID;
  const [front, back] = images ?? [];
  const { listPrice, price, installments, installmentsData, seller = "1" } =
    useOffer(offers);
  // const possibilities = useVariantPossibilities(hasVariant, product);
  // const variants = Object.entries(Object.values(possibilities)[0] ?? {});

  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";

  // const skuSelector = variants.map(([value, link]) => (
  //   <li>
  //     <a href={link}>
  //       <Avatar
  //         variant={link === url ? "active" : link ? "default" : "disabled"}
  //         content={value}
  //       />
  //     </a>
  //   </li>
  // ));

  const isUniqueSku = (isVariantOf?.hasVariant?.length ?? 0) <= 1;

  const cta = (isUniqueSku && !isMobile)
    ? (
      <ProductCardActions
        text={l?.basics?.ctaText}
        productID={productID}
        seller={seller}
      />
    )
    : <ProductCardAddToCart>{l?.basics?.ctaText}</ProductCardAddToCart>;

  return (
    <a
      href={url && relative(url)}
      id={id}
      class={`card p-0 group w-full ${
        align === "center" ? "text-center" : "text-start"
      } ${l?.onMouseOver?.showCardShadow ? "lg:hover:card-bordered" : ""}
        ${
        l?.onMouseOver?.card === "Move up"
          ? "duration-500 transition-translate ease-in-out lg:hover:-translate-y-2"
          : ""
      }
      `}
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />
      <figure
        class="relative overflow-hidden mx-auto mb-[18px] w-full"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}`, maxWidth: `${WIDTH}px` }}
      >
        {/* Wishlist button */}
        <div
          class={`absolute top-2 z-10
          ${
            l?.elementsPositions?.favoriteIcon === "Top left"
              ? "left-2"
              : "right-2"
          }
          ${
            l?.onMouseOver?.showFavoriteIcon
              ? "lg:hidden lg:group-hover:block"
              : "lg:hidden"
          }
        `}
        >
          {platform === "vtex" && (
            <WishlistButton
              productGroupID={productGroupID}
              productID={productID}
            />
          )}
        </div>
        {/* Product Images */}
        <div class="grid grid-cols-1 grid-rows-1 w-full max-w-[202px] border border-[hsla(0,0%,75.3%,.2)] rounded-[3px]">
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={`col-span-full row-span-full rounded-[3px] w-full  ${
              l?.onMouseOver?.image == "Zoom image"
                ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125"
                : ""
            }`}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          {(!l?.onMouseOver?.image ||
            l?.onMouseOver?.image == "Change image") && (
            <Image
              src={back?.url ?? front.url!}
              alt={back?.alternateName ?? front.alternateName}
              width={WIDTH}
              height={HEIGHT}
              class="bg-base-100 col-span-full max-w-[220px] row-span-full transition-opacity duration-100 rounded-[3px] w-full opacity-0 lg:group-hover:opacity-100"
              sizes="(max-width: 640px) 50vw, 20vw"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
        <figcaption
          class={`
          absolute bottom-1 left-0 w-full flex flex-col gap-3 p-2 ${
            l?.onMouseOver?.showSkuSelector || l?.onMouseOver?.showCta
              ? "transition-opacity opacity-0 lg:group-hover:opacity-100"
              : "lg:hidden"
          }`}
        >
          {/* SKU Selector */}
          {
            /* {l?.onMouseOver?.showSkuSelector && (
            <ul class="flex justify-center items-center gap-2 w-full">
              {skuSelector}
            </ul>
          )} */
          }
          {l?.onMouseOver?.showCta && cta}
        </figcaption>
      </figure>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col gap-6">
        {/* SKU Selector */}
        {
          /* {(!l?.elementsPositions?.skuSelector ||
          l?.elementsPositions?.skuSelector === "Top") && (
          <>
            {l?.hide?.skuSelector ? "" : (
              <ul
                class={`flex items-center gap-2 w-full overflow-auto p-3 ${
                  align === "center" ? "justify-center" : "justify-start"
                } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
              >
                {skuSelector}
              </ul>
            )}
          </>
        )} */
        }

        {l?.hide?.productName ? "" : (
          <div class="flex flex-col gap-0">
            {l?.hide?.productName ? "" : (
              <h3
                class="line-clamp-2 h-[32px] text-sm leading-[16px] text-gray-800"
                dangerouslySetInnerHTML={{ __html: name ?? "" }}
              />
            )}
            {
              /* {l?.hide?.productDescription ? "" : (
                <div
                  class="truncate text-sm lg:text-sm text-neutral"
                  dangerouslySetInnerHTML={{ __html: description ?? "" }}
                />
              )} */
            }
          </div>
        )}
        {l?.hide?.allPrices
          ? ""
          : (
            <div class="flex flex-col gap-[5px] font-montserrat">
              <div
                class={`flex flex-col gap-0 ${
                  align === "center" ? "justify-center" : "justify-start"
                }`}
              >
                <div
                  class={`line-through text-gray-400 text-xs leading-[1.15] ${
                    (listPrice && listPrice !== price) ? "" : "invisible"
                  }`}
                >
                  De: {formatPrice(listPrice, offers?.priceCurrency)}
                </div>
                <div class="text-primary-500 text-[15px] leading-[17px] font-bold">
                  à vista {formatPrice(price, offers?.priceCurrency)}
                </div>
              </div>
              {l?.hide?.installments
                ? ""
                : (
                  <div class="text-gray-500 text-[11px] leading-[14px] flex flex-col uppercase">
                    <span>
                      {formatPrice(price, offers?.priceCurrency)}{" "}
                      <strong>à prazo</strong>
                    </span>
                    <span class="truncate">
                      ou <strong>{installmentsData?.billingDuration}x</strong>
                      {" "}
                      de R$ {installmentsData?.billingIncrement}{" "}
                      <strong>
                        {installmentsData?.withTaxes ? "c/ juros" : "s/ juros"}
                      </strong>
                    </span>
                  </div>
                )}
            </div>
          )}

        {/* SKU Selector */}
        {
          /* {l?.elementsPositions?.skuSelector === "Bottom" && (
          <>
            {l?.hide?.skuSelector ? "" : (
              <ul
                class={`flex items-center gap-2 w-full ${
                  align === "center" ? "justify-center" : "justify-start"
                } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
              >
                {skuSelector}
              </ul>
            )}
          </>
        )} */
        }
      </div>

      {!l?.hide?.cta
        ? (
          <div
            class={`flex-auto flex items-end mt-[15px] ${
              l?.onMouseOver?.showCta ? "lg:hidden" : ""
            }`}
          >
            {cta}
          </div>
        )
        : ""}
    </a>
  );
}

export default ProductCard;
