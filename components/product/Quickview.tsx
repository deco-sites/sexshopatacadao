import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useSignal } from "@preact/signals";
import type { ImageObject, Product } from "apps/commerce/types.ts";
import GallerySlider from "deco-sites/sexshopatacadao/components/product/Gallery/ImageSlider.tsx";
import { formatPrice } from "deco-sites/sexshopatacadao/sdk/format.ts";
import { useOffer } from "deco-sites/sexshopatacadao/sdk/useOffer.ts";
import ProductVariantList from "deco-sites/sexshopatacadao/components/product/VariantList/ProductVariantList.tsx";
import OutOfStock from "deco-sites/sexshopatacadao/components/product/OutOfStock.tsx";
import { Platform } from "deco-sites/sexshopatacadao/apps/site.ts";
import ProductCardActions from "deco-sites/sexshopatacadao/components/product/ProductCardActions.tsx";

export interface Props {
  product: Product;
  isMobile: boolean;
  platform?: Platform;
  priceMultiplier?: number;
}

function Quickview(
  { product, isMobile, platform, priceMultiplier = 1 }: Props,
) {
  const id = useId();
  const open = useSignal(false);

  const {
    url,
    productID,
    image: images,
    offers,
    isVariantOf,
    brand,
  } = product;

  const refId = isVariantOf?.model;

  const {
    listPrice,
    price: rawPrice = 0,
    installmentsData,
    seller = "1",
    bestInstallments,
    availability,
  } = useOffer(offers);
  const price = rawPrice * priceMultiplier;

  const brandName = brand?.name ?? "";

  const isUniqueSku = (isVariantOf?.hasVariant?.length ?? 0) <= 1;
  const manufacturerCode = refId;

  const title = (
    <div class="flex flex-col font-montserrat gap-2 text-gray-800 p-[10px] lg:px-0 mt-[25px] bg-gray-100 lg:bg-white items-center lg:items-start text-center lg:text-left mb-[15px] lg:mb-0">
      <h1>
        <span class="font-bold text-2xl capitalize !leading-[28px] ">
          {isVariantOf?.name}
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

  return (
    <>
      <Button
        class="absolute top-0 left-0 bg-primary-500 h-9 w-9 rounded flex items-center justify-center lg:opacity-0 lg:group-hover:opacity-100 transition-opacity p-0 z-10"
        onClick={() => {
          open.value = true;
        }}
      >
        <Icon id="Expand" size={30} class="text-white" />
      </Button>
      <div id={id}>
        <Modal
          loading="lazy"
          open={open.value}
          onClose={() => open.value = false}
        >
          {open.value && (
            <div class="px-[2vw] relative bg-white max-w-6xl max-h-[700px] w-11/12 h-4/5 overflow-y-auto scrollbar scrollbar-track-[#ebebeb] scrollbar-track-rounded-[10px] scrollbar-thumb-primary-500 scrollbar-thumb-rounded-[10px] scrollbar-w-[10px]">
              <Button
                class="absolute top-0 right-0 h-9 w-9 rounded flex items-center justify-center p-0 z-10 bg-transparent hover:bg-transparent border-transparent hover:border-transparent"
                onClick={(e) => {
                  e.preventDefault();
                  open.value = false;
                }}
              >
                <Icon id="Close" size={15} strokeWidth={1} />
              </Button>
              <div class="flex w-full max-w-[96rem] mx-auto lg:flex-row flex-col ">
                <div class="w-full lg:w-1/2 lg:pr-8 px-[15px] mt-[25px]">
                  <GallerySlider
                    product={product}
                    zoomMode={isMobile ? "click" : "hover"}
                    direction={"column"}
                  />
                </div>

                <div class="flex flex-col flex-1 px-[15px] pb-[10px]">
                  {title}
                  {/* Prices */}
                  <div class="mt-4 mb-1 flex flex-col font-montserrat">
                    {(listPrice ?? 0) > price && (
                      <div class="flex flex-row gap-2 items-center text-sm mb-1">
                        <span class="line-through text-[#cacbcc] !leading-[1.15]">
                          De: {formatPrice(listPrice, offers?.priceCurrency)}
                        </span>
                        <span class="font-bold !leading-[18px] bg-primary-500 rounded-[15px] text-white block px-[10px]">
                          Economize {formatPrice(
                            listPrice! - price,
                            offers?.priceCurrency,
                          )}
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
                        {formatPrice(rawPrice, offers?.priceCurrency)}{" "}
                        <strong>à prazo</strong>
                      </span>
                      <div class="flex xs:flex-row flex-col xs:justify-between text-xs leading-[1.15]">
                        <span class="uppercase">
                          ou{" "}
                          <strong class="font-semibold">
                            {installmentsData?.billingDuration ?? 1}x
                          </strong>{" "}
                          de {formatPrice(
                            installmentsData?.billingIncrement ?? rawPrice,
                            offers?.priceCurrency,
                          )}{" "}
                          <strong class="font-semibold">
                            {installmentsData?.withTaxes
                              ? "com juros"
                              : "sem juros"}
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
                  {/* SKU Selector & Add to Cart */}
                  <div class="mt-6">
                    {availability === "https://schema.org/InStock"
                      ? isUniqueSku
                        ? (
                          <>
                            {platform === "vtex" && (
                              <ProductCardActions
                                text={"comprar"}
                                productID={productID}
                                seller={seller}
                                galleryMode="grid"
                              />
                            )}
                          </>
                        )
                        : <ProductVariantList product={product} />
                      : <OutOfStock productID={productID} />}
                  </div>
                  <div class="flex mt-3">
                    <a
                      href={url}
                      class="text-[#361328] underline font-montserrat text-sm flex justify-center w-1/2 ml-auto"
                    >
                      Ver mais detalhes
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
}

export default Quickview;
