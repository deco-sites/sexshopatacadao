import { SendEventOnView } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import AddToCartButtonLinx from "$store/islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "$store/islands/AddToCartButton/wake.tsx";
import AddToCartButtonNuvemshop from "$store/islands/AddToCartButton/nuvemshop.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "./ProductVariantSelector.tsx";
import { checkIsMobile } from "deco-sites/sexshopatacadao/loaders/isMobile.ts";
import GallerySlider from "deco-sites/sexshopatacadao/components/product/Gallery/ImageSlider.tsx";
import BrowserLog from "deco-sites/sexshopatacadao/islands/BrowserLog.tsx";
import ProductDetailsActions from "deco-sites/sexshopatacadao/islands/ProductDetailsActions.tsx";

interface Props {
  page: ProductDetailsPage | null;
  layout: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
}

function ProductDetails({ isMobile, page, layout }: ReturnType<typeof loader>) {
  const platform = usePlatform();
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    breadcrumbList,
    product,
  } = page;
  const {
    productID,
    offers,
    name = "",
    // gtin,
    brand,

    isVariantOf,
    additionalProperty = [],
  } = product;
  const description = product.description || isVariantOf?.description;
  const {
    price = 0,
    listPrice,
    seller = "1",
    // installments,
    installmentsData,
    availability,
  } = useOffer(offers);

  const productGroupID = isVariantOf?.productGroupID ?? "";
  const refId = isVariantOf?.model ?? "";
  const brandName = brand?.name ?? "";

  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  const bestInstallments = offers?.offers?.[0].priceSpecification.flatMap((
    priceSpecification,
  ) =>
    priceSpecification.name === installmentsData?.name
      ? [priceSpecification]
      : []
  );

  {/* Title, brand & code */}
  const title = (
    <div class="flex flex-col font-montserrat gap-2 text-gray-800 p-[10px] lg:px-0 mt-[25px] bg-gray-100 lg:bg-white items-center lg:items-start text-center lg:text-left mb-[15px] lg:mb-0">
      <h1>
        <span class="font-bold text-2xl capitalize !leading-[28px] ">
          {layout?.name === "concat"
            ? `${isVariantOf?.name} ${name}`
            : layout?.name === "productGroup"
            ? isVariantOf?.name
            : name}
        </span>
      </h1>

      <div class="flex gap-3 lg:gap-8 text-sm">
        {brandName && (
          <span class="whitespace-nowrap leading-[1.15]">
            <strong>Fabricante:</strong> {brandName}
          </span>
        )}
        {refId && (
          <span class="whitespace-nowrap leading-[1.15]">
            <strong>Código:</strong> {refId}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div class="flex flex-col" id={id}>
      <BrowserLog payload={{ product }} />
      <Breadcrumb
        itemListElement={breadcrumbList.itemListElement}
        applyPadding={false}
      />

      {isMobile && title}

      <div class="px-[5vw] mt-16">
        <div class="flex w-full max-w-[96rem] mx-auto lg:mt-3 lg:pt-8 lg:flex-row flex-col">
          <div class="w-full lg:w-1/2 lg:pr-8">
            <GallerySlider
              product={product}
              zoomMode={isMobile ? "click" : "hover"}
            />
          </div>

          <div class="flex flex-col flex-1 px-[15px] pb-[10px]">
            {!isMobile && title}

            {/* Prices */}
            <div class="mt-4 mb-1 flex flex-col font-montserrat">
              {(listPrice ?? 0) > price && (
                <div class="flex flex-row gap-2 items-center text-sm mb-1">
                  <span class="line-through text-[#cacbcc] !leading-[1.15]">
                    De: {formatPrice(listPrice, offers?.priceCurrency)}
                  </span>
                  <span class="font-bold !leading-[18px] bg-primary-500 rounded-[15px] text-white block px-[10px]">
                    Economize{" "}
                    {formatPrice(listPrice! - price, offers?.priceCurrency)}
                  </span>
                </div>
              )}
              <strong class="font-bold text-sm text-primary-500 uppercase !leading-[17px] mb-[17px]">
                À vista{" "}
                <span class="font-sans font-black text-2xl !leading-[17px]">
                  {formatPrice(price, offers?.priceCurrency)}
                </span>
              </strong>
              <div class="text-gray-500 flex flex-col">
                <span class="text-[11px] leading-[1.15] uppercase">
                  {formatPrice(price, offers?.priceCurrency)}{" "}
                  <strong>à prazo</strong>
                </span>
                <div class="flex xs:flex-row flex-col xs:justify-between text-xs leading-[1.15]">
                  <span class="uppercase">
                    ou{" "}
                    <strong class="font-semibold">
                      {installmentsData?.billingDuration}x
                    </strong>{" "}
                    de R$ {installmentsData?.billingIncrement}{" "}
                    <strong class="font-semibold">
                      {installmentsData?.withTaxes ? "com juros" : "sem juros"}
                    </strong>
                  </span>

                  <div
                    class={"relative z-[12]"}
                  >
                    <details class="text-black peer group cursor-pointer">
                      <summary class="flex text-sm items-center">
                        <span class="leading-[1.5] underline">
                          Opções de parcelamento
                        </span>
                      </summary>
                    </details>
                    <div class="absolute -left-[40px] peer-open:border border-gray-400 rounded-[5px] bg-white grid grid-rows-[0fr] peer-open:grid-rows-[1fr] w-[263px] text-xs transition-all font-sans">
                      <div class="w-full overflow-hidden flex flex-col">
                        {bestInstallments?.map((installment) => (
                          <div class="px-[15px] h-[34px] uppercase flex justify-between items-center w-full even:bg-gray-400 ">
                            <span>
                              <strong class="font-semibold">
                                {installment.billingDuration}
                              </strong>x de{" "}
                              <strong class="text-primary-500 font-semibold">
                                {formatPrice(
                                  installment.billingIncrement,
                                  offers?.priceCurrency,
                                )}
                              </strong>
                            </span>
                            <span>
                              Total:{" "}
                              <strong class="font-semibold">
                                {formatPrice(
                                  installment.price,
                                  offers?.priceCurrency,
                                )}
                              </strong>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Sku Selector */}
            {
              /* <div class="mt-4 sm:mt-6">
              <ProductSelector product={product} />
            </div> */
            }
            {/* Add to Cart and Favorites button */}
            <div class="mt-4 sm:mt-10 flex flex-col gap-2">
              {availability === "https://schema.org/InStock"
                ? (
                  <>
                    {platform === "vtex" && (
                      <ProductDetailsActions
                        eventParams={{ items: [eventItem] }}
                        productID={productID}
                        seller={seller}
                      />
                    )}
                    {platform === "wake" && (
                      <AddToCartButtonWake
                        eventParams={{ items: [eventItem] }}
                        productID={productID}
                      />
                    )}
                    {platform === "linx" && (
                      <AddToCartButtonLinx
                        eventParams={{ items: [eventItem] }}
                        productID={productID}
                        productGroupID={productGroupID}
                      />
                    )}
                    {platform === "vnda" && (
                      <AddToCartButtonVNDA
                        eventParams={{ items: [eventItem] }}
                        productID={productID}
                        additionalProperty={additionalProperty}
                      />
                    )}
                    {platform === "shopify" && (
                      <AddToCartButtonShopify
                        eventParams={{ items: [eventItem] }}
                        productID={productID}
                      />
                    )}
                    {platform === "nuvemshop" && (
                      <AddToCartButtonNuvemshop
                        productGroupID={productGroupID}
                        eventParams={{ items: [eventItem] }}
                        additionalProperty={additionalProperty}
                      />
                    )}
                  </>
                )
                : <OutOfStock productID={productID} />}
            </div>
            {/* Shipping Simulation */}
            <div class="mt-8">
              {platform === "vtex" && (
                <ShippingSimulation
                  items={[{
                    id: Number(product.sku),
                    quantity: 1,
                    seller: seller,
                  }]}
                />
              )}
            </div>

            {/* Analytics Event */}
            <SendEventOnView
              id={id}
              event={{
                name: "view_item",
                params: {
                  item_list_id: "product",
                  item_list_name: "Product",
                  items: [eventItem],
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Description */}
      {description && (
        <div class="max-w-[96rem] mx-auto flex font-montserrat">
          <div class="p-[5vw] text-sm leading-[1.6rem] text-gray-800">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">
              Descrição do produto
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export const loader = (props: Props, req: Request) => {
  const isMobile = checkIsMobile(req);

  return {
    ...props,
    isMobile,
  };
};

export default ProductDetails;
