import { Head } from "$fresh/runtime.ts";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import ZoomableImage from "$store/islands/ZoomableImage.tsx";
import type { Props as ZoomableImageProps } from "$store/components/ui/ZoomableImage.tsx";
import { useOffer } from "deco-sites/sexshopatacadao/sdk/useOffer.ts";
import {
  getOptimizedMediaUrl,
  getSrcSet,
} from "apps/website/components/Image.tsx";

export interface Props {
  product: ProductDetailsPage["product"];

  priceMultiplier?: number;
  showDiscountBadge?: boolean;

  showDots?: boolean;
  zoomMode?: "hover" | "click";
  direction?: "column" | "row";
}

function SliderImage(props: ZoomableImageProps) {
  const { preload, loading = "lazy" } = props;

  if (!props.height) {
    console.warn(
      `Missing height. This image will NOT be optimized: ${props.src}`,
    );
  }

  const srcSet = getSrcSet(props.src, props.width, props.height, props.fit);
  const linkProps = {
    imagesrcset: srcSet,
    imagesizes: props.sizes,
    fetchpriority: props.fetchPriority,
    media: props.media,
  };

  const zoomSrc = getOptimizedMediaUrl({
    originalSrc: props.src,
    width: 1600,
    height: 1600,
    fit: props.fit,
    factor: 1,
  });

  return (
    <>
      {preload && (
        <Head>
          <link as="image" rel="preload" href={props.src} {...linkProps} />
        </Head>
      )}
      <ZoomableImage
        {...props}
        srcSet={srcSet}
        zoomSrc={zoomSrc}
      />
    </>
  );
}

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(
  {
    product,
    showDots = true,
    zoomMode = "hover",
    direction = "row",
    priceMultiplier = 1,
    showDiscountBadge = true,
  }: Props,
) {
  const { image: images, offers } = product;

  const {
    price: rawPrice = 0,
    listPrice,
    availability,
  } = useOffer(offers);

  const id = useId();

  const width = 570;
  const height = 570;

  if (!images?.length) {
    return null;
  }

  const isAvailable = availability === "https://schema.org/InStock";

  const price = isAvailable ? rawPrice * priceMultiplier : rawPrice;

  const discountPercentage = showDiscountBadge
    ? Math.trunc(
      ((listPrice ?? 0) - price) / (listPrice ?? 1) * 100,
    )
    : 0;

  const isSingleImage = images.length === 1;

  return (
    <div
      id={id}
      class={`flex ${direction === "column" ? "flex-col-reverse" : ""}`}
    >
      {/* Image Slider */}
      <div class="relative order-1 sm:order-2 w-full">
        <Slider class="carousel carousel-center gap-6 w-full">
          {images.map((img, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full"
            >
              <SliderImage
                type={zoomMode}
                factor={2}
                class="w-full"
                sizes="(max-width: 640px) 100vw, 30vw"
                style={{ aspectRatio: 1 }}
                src={img.url!}
                alt={img.alternateName}
                width={width}
                height={height}
                fit="contain"
                // Preload LCP image for better web vitals

                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
              {
                /* <Image
                class="w-full lg:w-[573px] lg:h-[530px]"
                sizes="(max-width: 640px) 100vw, 30vw"
                style={{ aspectRatio: 573 / 530 }}
                src={img.url!}
                alt={img.alternateName}
                width={width}
                height={height}
                // Preload LCP image for better web vitals
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              /> */
              }
              {
                /* <ZoomableImage
                type={zoomMode}
                factor={2}
                class="w-full"
                sizes="(max-width: 640px) 100vw, 30vw"
                style={{ aspectRatio: 1 }}
                src={img.url!}
                alt={img.alternateName}
                width={width}
                height={height}
                // Preload LCP image for better web vitals
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              /> */
              }
            </Slider.Item>
          ))}
        </Slider>

        {!isSingleImage && (
          <>
            <Slider.PrevButton
              class="absolute left-2 top-1/2 text-black"
              disabled
            >
              <Icon size={24} id="CaretLeft" strokeWidth={0} />
            </Slider.PrevButton>

            <Slider.NextButton
              class="absolute right-2 top-1/2 text-black"
              disabled={images.length < 2}
            >
              <Icon size={24} id="CaretRight" strokeWidth={0} />
            </Slider.NextButton>
          </>
        )}
        {
          /* <div class="absolute top-2 right-2 bg-base-100 rounded-full">
          <ProductImageZoom
          images={images}
          width={700}
          height={Math.trunc(700 * height / width)}
          />
        </div> */
        }

        {/* Top Right Badges */}
        <div class="absolute top-[3px] right-[5px]">
          {discountPercentage > 0 && (
            <div class="rounded-full bg-primary-500 text-white min-w-[45px] min-h-[45px] w-[45px] h-[45px] font-montserrat text-[17px] font-bold flex items-center justify-center">
              <span>
                {discountPercentage}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Dots */}
      {!isSingleImage && showDots && (
        <ul
          class={`hidden sm:carousel carousel-center gap-1 px-4 sm:px-0  order-2 sm:order-1 2xl:mr-20 lg:mr-[10%] mr-20 min-w-[100px] ${
            direction === "column" ? "sm:flex-row" : "sm:flex-col"
          }`}
        >
          {images.map((img, index) => (
            <li
              class={`carousel-item  ${direction === "column" ? "" : "w-full"}`}
            >
              <Slider.Dot index={index}>
                <Image
                  style={{ aspectRatio: 1 }}
                  class="group-disabled:opacity-40"
                  width={100}
                  height={100}
                  src={img.url!}
                  alt={img.alternateName}
                />
              </Slider.Dot>
            </li>
          ))}
        </ul>
      )}

      <div class="hidden">
        <SliderJS rootId={id} />
      </div>
    </div>
  );
}
