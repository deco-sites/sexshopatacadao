import { SendEventOnView } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import AddToCartButtonLinx from "$store/islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import AddToCartButtonWake from "$store/islands/AddToCartButton/wake.tsx";
import AddToCartButtonNuvemshop from "$store/islands/AddToCartButton/nuvemshop.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { checkIsMobile } from "deco-sites/sexshopatacadao/loaders/isMobile.ts";
import GallerySlider from "deco-sites/sexshopatacadao/components/product/Gallery/ImageSlider.tsx";
import BrowserLog from "deco-sites/sexshopatacadao/islands/BrowserLog.tsx";
import ProductDetailsActions from "deco-sites/sexshopatacadao/islands/ProductDetailsActions.tsx";
import { ProductManufacturerCode } from "deco-sites/sexshopatacadao/loaders/manufacturerCode.ts";
import ProductVariantList from "deco-sites/sexshopatacadao/components/product/VariantList/ProductVariantList.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import { AppContext } from "deco-sites/sexshopatacadao/apps/site.ts";

interface Props {
  page: ProductDetailsPage | null;
  productManufacturerCode: ProductManufacturerCode | null;
  layout: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
  /**
   * @title Opções de compartilhamento
   */
  share?: {
    /**
     * @title Compartilhar via Pinterest
     */
    showPinterestButton?: boolean;
    /**
     * @title Compartilhar via Facebook
     */
    showFacebookButton?: boolean;
    /**
     * @title Compartilhar via Whatsapp
     */
    showWhatsappButton?: boolean;
    /**
     * @title Compartilhar via Twitter
     */
    showTwitterButton?: boolean;
    /**
     * @title Copiar link
     */
    showCopyButton?: boolean;
  };
  /**
   * @ignore
   */
  url: string;
}

function ProductDetails(
  { isMobile, page, layout, productManufacturerCode, url, share }: ReturnType<
    typeof loader
  >,
) {
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
    image: images,
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
    bestInstallments,
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

  const manufacturerCode = productManufacturerCode?.manufacturerCode ?? refId;

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
        {manufacturerCode && (
          <span class="whitespace-nowrap leading-[1.15]">
            <strong>Código:</strong> {manufacturerCode}
          </span>
        )}
      </div>
    </div>
  );

  const isUniqueSku = (isVariantOf?.hasVariant?.length ?? 0) <= 1;

  const encodedURI = encodeURI(url);

  return (
    <div class="flex flex-col mb-16" id={id}>
      {/* <BrowserLog payload={{ product }} /> */}
      <Breadcrumb
        itemListElement={breadcrumbList.itemListElement}
        applyPadding={false}
      />

      {isMobile && title}

      <div class="px-[5vw]">
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
                          <div class="px-[15px] h-[34px] uppercase flex justify-between items-center w-full even:bg-gray-200 ">
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
            {/* SKU Selector & Add to Cart */}
            <div class="mt-6">
              {availability === "https://schema.org/InStock"
                ? isUniqueSku
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
                  : <ProductVariantList product={product} />
                : <OutOfStock productID={productID} />}
            </div>
            {/* Shipping Simulation */}
            <div class="flex flex-col md:flex-row">
              <div class="mt-8 md:flex-1">
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
              <div class="md:flex-1 mt-8">
                {/* Share card */}
                {share && Object.values(share).some((value) => value)
                  ? (
                    <div class="flex flex-col items-end gap-1 h-full justify-end max-h-[82px]">
                      <span class="text-base font-bold text-[#3f3f40]">
                        Compartilhar:
                      </span>
                      <div class="flex items-start gap-2">
                        {share.showPinterestButton && (
                          <a
                            href={`http://pinterest.com/pin/create/button/?url=${encodedURI}&media=${
                              images?.[0].url
                            }`}
                            target="_blank"
                            rel="noreferrer"
                            title="Salvar no Pinterest"
                          >
                            <Icon id="PinterestButton" size={26} />
                          </a>
                        )}
                        {share.showFacebookButton && (
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedURI}`}
                            title="Publicar no Facebook"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Icon id="FacebookButton" size={26} />
                          </a>
                        )}
                        {share.showWhatsappButton && (
                          <a
                            href={`https://api.whatsapp.com/send?text=${encodedURI}`}
                            title="Compartilhar no Whatsapp"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Icon id="WhatsappButton" size={26} />
                          </a>
                        )}
                        {share.showTwitterButton && (
                          <a
                            href={`https://twitter.com/intent/tweet?text=${encodedURI}`}
                            title="Publicar no Twitter"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Icon id="TwitterButton" size={25} />
                          </a>
                        )}
                        {share.showCopyButton && (
                          <CopyButton
                            contentToCopy={url}
                          >
                            <Icon
                              id="LinkButton"
                              size={26}
                              class="text-primary"
                            />
                          </CopyButton>
                        )}
                      </div>
                    </div>
                  )
                  : null}
              </div>
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
        <div class="max-w-[96rem] mx-auto flex lg:flex-row flex-col font-montserrat items-center">
          <div class="lg:w-1/2 p-[5vw] text-sm leading-[1.6rem] text-gray-800">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">
              Descrição do produto
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
          <div class="lg:w-1/2">
            <div class="flex justify-center w-full  relative">
              <Image
                src={images?.[1]?.url || images?.[0].url || ""}
                width={500}
                height={500}
              />
              <span class="bg-[#00000008] absolute inset-0"></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const loader = (props: Props, req: Request, ctx: AppContext) => {
  const isMobile = checkIsMobile(ctx);

  return {
    ...props,
    isMobile,
    url: req.url,
  };
};

export default ProductDetails;
