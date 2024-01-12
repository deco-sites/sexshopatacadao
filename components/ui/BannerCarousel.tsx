import {
  SendEventOnClick,
  SendEventOnView,
} from "$store/components/Analytics.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

/**
 * @title {{ alt }} ({{ href }})
 */
export interface Banner {
  /** @description desktop optimized image */
  desktop: ImageWidget;
  /** @description mobile optimized image */
  mobile: ImageWidget;
  /** @description Image's alt text */
  alt: string;
  /** @description when user clicks on the image, go to this link */
  href?: string;

  // action?: {
  //   /** @description when user clicks on the image, go to this link */
  //   href: string;
  //   /** @description Image text title */
  //   title: string;
  //   /** @description Image text subtitle */
  //   subTitle: string;
  //   /** @description Button label */
  //   label: string;
  // };
}

export interface BannerSizes {
  mobile: {
    width: number;
    height: number;
  };
  desktop: {
    width: number;
    height: number;
  };
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;

  sizes?: BannerSizes;
}

const DEFAULT_PROPS = {
  images: [
    {
      alt: "Sexy Fantasy",
      href: "/s?q=sexy%20fantasy",

      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3328/9423e93f-d728-46a6-af59-4ac23db5fb95",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3328/097aa2af-de48-45c8-85c6-4a1e02b65e70",
    },
    {
      alt: "Lançamento Pepper Blend",
      href: "/s?q=Pepper+blend&sort=release%3Adesc",

      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3328/683e7f41-1006-44ab-ae5d-d0c8d2439473",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3328/315df54e-a36b-4819-abe0-baa8dd26b67c",
    },
  ],
  sizes: {
    desktop: {
      width: 1920,
      height: 550,
    },
    mobile: {
      width: 768,
      height: 500,
    },
  },
  preload: true,
};

function BannerItem(
  { image, lcp, id, sizes }: {
    image: Banner;
    lcp?: boolean;
    id: string;
    sizes: BannerSizes;
  },
) {
  const {
    alt,
    mobile,
    desktop,
    href,
  } = image;

  return (
    <a
      id={id}
      href={href ?? "#"}
      aria-label={alt}
      class="flex relative overflow-y-hidden w-full"
    >
      <Picture preload={lcp} class="w-full">
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={sizes.mobile.width / 2}
          height={sizes.mobile.height / 2}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={sizes.desktop.width / 2}
          height={sizes.desktop.height / 2}
        />
        <img
          class="object-cover w-full h-full"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
      </Picture>
    </a>
  );
}

function Dots({ images, interval = 0 }: Props) {
  return (
    <ul class="carousel justify-center col-span-full gap-2 z-10 row-start-5">
      {images?.map((_, index) => (
        <li class="carousel-item">
          <Slider.Dot index={index}>
            <div class="py-5">
              <div class="w-[0.625rem] min-w-[0.625rem] h-[0.625rem] min-h-[0.625rem] rounded-full group-disabled:bg-primary-500 bg-[#d3d3d3] transition-colors" // style={{ animationDuration: `${interval}s` }}
              />
            </div>
          </Slider.Dot>
        </li>
      ))}
    </ul>
  );
  // return (
  //   <>
  //     <style
  //       dangerouslySetInnerHTML={{
  //         __html: `
  //         @property --dot-progress {
  //           syntax: '<percentage>';
  //           inherits: false;
  //           initial-value: 0%;
  //         }
  //         `,
  //       }}
  //     />
  //     <ul class="carousel justify-center col-span-full gap-4 z-10 row-start-5">
  //       {images?.map((_, index) => (
  //         <li class="carousel-item">
  //           <Slider.Dot index={index}>
  //             <div class="py-5">
  //               <div
  //                 class="w-[0.625rem] min-w-[0.625rem] h-[0.625rem] min-h-[0.625rem] rounded-full group-disabled:animate-progress bg-gradient-to-r from-primary-500 from-[length:var(--dot-progress)] to-[#d3d3d3] to-[length:var(--dot-progress)]"
  //                 style={{ animationDuration: `${interval}s` }}
  //               />
  //             </div>
  //           </Slider.Dot>
  //         </li>
  //       ))}
  //     </ul>
  //   </>
  // );
}

function Buttons() {
  return (
    <>
      <div class="flex items-center justify-center z-10 col-start-1 row-start-3">
        <Slider.PrevButton class="btn btn-circle w-[35px] min-w-[35px] h-[35px] min-h-[35px] lg:w-14 lg:min-w-14 lg:h-14 lg:min-h-14 !bg-[hsla(0,0%,85.1%,.5)] border-0 outline-none">
          <Icon
            class="text-primary-500"
            size={23}
            id="ChevronLeft"
            strokeWidth={0}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-3">
        <Slider.NextButton class="btn btn-circle w-[35px] min-w-[35px] h-[35px] min-h-[35px] lg:w-14 lg:min-w-14 lg:h-14 lg:min-h-14 !bg-[hsla(0,0%,85.1%,.5)] border-0 outline-none">
          <Icon
            class="text-primary-500"
            size={23}
            id="ChevronRight"
            strokeWidth={0}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function BannerCarousel(props: Props) {
  const id = useId();
  const { images, preload = false, interval, sizes } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  if (images?.length === 1) {
    const params = { promotion_name: images[0].alt };

    return (
      <>
        <BannerItem
          image={images[0]}
          lcp={preload}
          id={`${id}::0`}
          sizes={sizes}
        />
        <SendEventOnClick
          id={`${id}::0`}
          event={{ name: "select_promotion", params }}
        />
        <SendEventOnView
          id={`${id}::0`}
          event={{ name: "view_promotion", params }}
        />
      </>
    );
  }

  return (
    <div
      id={id}
      class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[64px_1fr_48px_1fr_64px]"
    >
      <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6">
        {images?.map((image, index) => {
          const params = { promotion_name: image.alt };

          return (
            <Slider.Item index={index} class="carousel-item w-full">
              <BannerItem
                image={image}
                lcp={index === 0 && preload}
                id={`${id}::${index}`}
                sizes={sizes}
              />
              <SendEventOnClick
                id={`${id}::${index}`}
                event={{ name: "select_promotion", params }}
              />
              <SendEventOnView
                id={`${id}::${index}`}
                event={{ name: "view_promotion", params }}
              />
            </Slider.Item>
          );
        })}
      </Slider>

      <Buttons />

      <Dots images={images} interval={interval} />

      <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default BannerCarousel;
