import type { Platform } from "$store/apps/site.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import {
  ProductCardAddToCart,
} from "$store/components/product/ProductCardActions.tsx";
import ProductCardActions from "$store/islands/ProductCard/Actions.tsx";
// HEAD
import Quickview from "deco-sites/sexshopatacadao/components/product/Quickview.tsx";
//
import {
  GalleryMode,
} from "deco-sites/sexshopatacadao/actions/gallery/mode.ts";
import BrowserLog from "deco-sites/sexshopatacadao/islands/BrowserLog.tsx";
//f4d10e83bdc8ad7d4a8093917567841a476e4dae
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
  galleryMode?: GalleryMode;
  priceMultiplier?: number;
}

const relative = (url: string) => {
  const link = new URL(url, "http://localhost");
  return `${link.pathname}${link.search}`;
};

const WIDTH = 202;
const HEIGHT = 202;

const CATEGORY_NAME_TO_SHOW_DISCOUNT_BADGE = "Saldão";
const BADGE_SPECIFICATION_NAME = "Selo Redondo Rosa (editável)";

function ProductCard(
  {
    product,
    preload,
    itemListName,
    layout,
    platform,
    index,
    isMobile,
    galleryMode = "grid",
    priceMultiplier = 1,
  }: Props,
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

  const {
    listPrice,
    price: rawPrice,
    installments,
    installmentsData,
    seller = "1",
    availability,
  } = useOffer(offers);
  const firstAvailableVariant = product.isVariantOf?.hasVariant?.find((
    variant,
  ) =>
    variant?.offers?.offers?.[0]?.availability === "https://schema.org/InStock"
  );

  const isAvailable = availability === "https://schema.org/InStock" ||
    !!firstAvailableVariant;

  const parsedUrl = relative(
    (availability === "https://schema.org/InStock"
      ? url
      : firstAvailableVariant
      ? firstAvailableVariant.url
      : url) ?? "",
  );

  const price = isAvailable
    ? rawPrice ? rawPrice * priceMultiplier : undefined
    : rawPrice;

  const discountBadgeTextInSpecification = product.isVariantOf
    ?.additionalProperty?.find(
      (additionalProperty) =>
        additionalProperty.name === BADGE_SPECIFICATION_NAME,
    )?.value;

  const shouldShowDiscountBadge = Boolean(
    discountBadgeTextInSpecification ||
      product?.additionalProperty?.some((
        additionalProperty,
      ) =>
        additionalProperty.name === "category" &&
        additionalProperty.value === CATEGORY_NAME_TO_SHOW_DISCOUNT_BADGE
      ),
  );

  const discountPercentage = (listPrice && price)
    ? Math.round(
      ((listPrice - price) / listPrice) * 100,
    )
    : 0;

  const discountBadgeText = discountBadgeTextInSpecification ??
    ((shouldShowDiscountBadge && discountPercentage > 0)
      ? `${discountPercentage}%`
      : undefined);

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

  const cta = isAvailable
    // ? (isUniqueSku && !isMobile)
    ? isUniqueSku
      ? (
        <ProductCardActions
          text={l?.basics?.ctaText}
          productID={productID}
          seller={seller}
          galleryMode={galleryMode}
        />
      )
      : (
        <ProductCardAddToCart galleryMode={galleryMode}>
          {l?.basics?.ctaText}
        </ProductCardAddToCart>
      )
    : (
      <button
        type="button"
        class="w-full flex items-center justify-center text-primary-500 bg-white hover:bg-primary-500 hover:text-white transition-colors h-11 rounded-[5px] border border-primary-500 font-montserrat max-w-[300px] mt-[14px]"
      >
        Avise-me quando chegar
      </button>
    );

  return (
    <div class="relative group">
      {
        /* <BrowserLog
        payload={{
          discountBadgeTextInSpecification,
          discountBadgeText,
          product,
        }}
      /> */
      }
      {!isMobile && (
        <Quickview
          product={product}
          isMobile={!!isMobile}
          platform={platform}
          priceMultiplier={priceMultiplier}
        />
      )}

      <a
        href={parsedUrl && relative(parsedUrl)}
        id={id}
        class={`card p-0 group w-full ${
          galleryMode === "list" ? "flex flex-row gap-8" : ""
        } ${align === "center" ? "text-center" : "text-start"} ${
          l?.onMouseOver?.showCardShadow ? "lg:hover:card-bordered" : ""
        }
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
          style={{
            aspectRatio: `${WIDTH} / ${HEIGHT}`,
            maxWidth: `${WIDTH}px`,
          }}
        >
          {/** Discount Badge */}
          {!!discountBadgeText && (
            <div class="absolute top-5 right-[2px]">
              <div class="rounded-full bg-primary-500 text-white min-w-[45px] min-h-[45px] w-[45px] h-[45px] font-montserrat text-[17px] font-bold flex items-center justify-center">
                <span>
                  {discountBadgeText}
                </span>
              </div>
            </div>
          )}

          {/* Wishlist button */}
          {
            /* <div
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
        </div> */
          }
          {/* Product Images */}

          <div class="grid grid-cols-1 grid-rows-1 w-full max-w-[202px] border border-[hsla(0,0%,75.3%,.2)] rounded-[3px]">
            <Image
              src={front.url!}
              alt={front.alternateName}
              width={WIDTH}
              height={HEIGHT}
              class={`col-span-full row-span-full rounded-[3px] w-full [aspect-ratio:1] object-contain ${
                l?.onMouseOver?.image == "Zoom image"
                  ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125"
                  : ""
              }`}
              sizes="(max-width: 640px) 50vw, 20vw"
              loading={"lazy"}
              decoding="async"
              fit="contain"
            />
            {!isMobile && (!l?.onMouseOver?.image ||
              l?.onMouseOver?.image == "Change image") &&
              (
                <Image
                  src={back?.url ?? front.url!}
                  alt={back?.alternateName ?? front.alternateName}
                  width={WIDTH}
                  height={HEIGHT}
                  class="bg-base-100 col-span-full max-w-[220px] row-span-full transition-opacity duration-100 rounded-[3px] w-full opacity-0 [aspect-ratio:1] object-contain lg:group-hover:opacity-100"
                  sizes="(max-width: 640px) 50vw, 20vw"
                  loading="lazy"
                  decoding="async"
                  fit="contain"
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
        <div class="flex-1">
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
            {isAvailable
              ? l?.hide?.allPrices
                ? ""
                : (
                  <div class="flex flex-col gap-[5px] font-montserrat">
                    <div
                      class={`flex flex-col gap-0 ${
                        align === "center" ? "justify-center" : "justify-start"
                      }`}
                    >
                      <div
                        class={`line-through text-gray-450 text-xs leading-[1.15] ${
                          (shouldShowDiscountBadge && listPrice &&
                              listPrice !== price)
                            ? ""
                            : "invisible"
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
                            {formatPrice(rawPrice, offers?.priceCurrency)}{" "}
                            <strong>à prazo</strong>
                          </span>
                          <span class="truncate">
                            ou{" "}
                            <strong>
                              {installmentsData?.billingDuration ?? 1}x
                            </strong>{" "}
                            de {formatPrice(
                              installmentsData?.billingIncrement ?? rawPrice,
                              offers?.priceCurrency,
                            )}{" "}
                            <strong>
                              {installmentsData?.withTaxes
                                ? "c/ juros"
                                : "s/ juros"}
                            </strong>
                          </span>
                        </div>
                      )}
                  </div>
                )
              : (
                <div class="font-montserrat text-[15px] font-bold leading-[17px] text-gray-800 my-4">
                  Produto indisponível
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
        </div>
      </a>
    </div>
  );
}

export default ProductCard;
