import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";

/**
 * @title {{ alt }} ({{ href }})
 */
export interface Image {
  src: ImageWidget;
  /** @description Image's alt text */
  alt: string;
  /** @description when user clicks on the image, go to this link */
  href?: string;
}

export interface Props {
  images?: Image[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;

  /** @format html */
  title?: string;
}

function Buttons() {
  return (
    <>
      <div class="absolute top-1/2 -translate-y-1/2 left-0 lg:-left-[2%] flex items-center justify-center z-10 col-start-1 row-start-3">
        <Slider.PrevButton class="w-[35px] min-w-[35px] h-[35px] min-h-[35px] lg:w-14 lg:min-w-14 lg:h-14 lg:min-h-14 border-0 outline-none flex justify-center items-center">
          <Icon
            class="text-[#717171] scale-x-150 scale-y-[2]"
            size={25}
            id="ChevronLeft"
            strokeWidth={0}
          />
        </Slider.PrevButton>
      </div>
      <div class="absolute top-1/2 -translate-y-1/2 flex right-0 lg:-right-[2%] items-center justify-center z-10 col-start-3 row-start-3">
        <Slider.NextButton class="w-[35px] min-w-[35px] h-[35px] min-h-[35px] lg:w-14 lg:min-w-14 lg:h-14 lg:min-h-14 border-0 outline-none flex justify-center items-center">
          <Icon
            class="text-[#717171] scale-x-150 scale-y-[2]"
            size={25}
            id="ChevronRight"
            strokeWidth={0}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function BrandsCarousel(props: Props) {
  const id = useId();
  const { images, interval, title } = props;

  return (
    <div
      id={id}
      class="flex flex-col max-w-[96rem] mx-auto"
    >
      <Header
        title={title || ""}
        alignment="center"
      />

      <div class="flex relative h-[130px] my-4 mx-4">
        <Slider class="carousel carousel-center w-full row-span-full">
          {images?.map(({ href, alt, src }, index) => {
            return (
              <Slider.Item
                index={index}
                class="carousel-item w-1/2 sm:w-[33.333%] md:w-[25%] xl:w-[20%] justify-center items-center"
              >
                <a
                  id={id}
                  href={href ?? "#"}
                  aria-label={alt}
                  class="flex relative"
                >
                  <img
                    class="object-contain max-w-[130px] max-h-[70px]"
                    loading="lazy"
                    src={src}
                    alt={alt}
                    width={130}
                    height={70}
                  />
                </a>
              </Slider.Item>
            );
          })}
        </Slider>

        <Buttons />

        {/* <SliderJS rootId={id} interval={interval && interval * 1e3} infinite /> */}
        <SliderJS rootId={id} infinite interval={interval && interval * 1e3} />
      </div>
    </div>
  );
}

export default BrandsCarousel;
