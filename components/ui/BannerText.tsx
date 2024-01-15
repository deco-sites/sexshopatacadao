import Icon from "$store/components/ui/Icon.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/**
 * @title {{ alt }} ({{ href }})
 */
export interface Banner {
  /** @description optimized image */
  image: ImageWidget;
  /** @description Image's alt text */
  alt: string;
  /** @description when user clicks on the image, go to this link */
  href?: string;
}

export interface Props {
  banner: Banner;

  /** @format html */
  text: string;

  cta: {
    label: string;
    href: string;
  };

  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
}

function BannerText({ banner, cta, text, preload }: Props) {
  return (
    <div class="flex flex-col-reverse lg:flex-row w-full mx-auto max-w-[96rem] lg:px-1 pb-1">
      <div class="lg:h-[480px] bg-gray-100 pt-[2%] lg:w-1/2 sm:pr-3 px-2 flex flex-col max-lg:!p-0 w-full items-center">
        <div
          class="prose banner-text text-center font-montserrat"
          dangerouslySetInnerHTML={{ __html: text }}
        />
        <a
          href={cta.href}
          class="my-6 w-[176px] h-[40px] text-sm bg-primary-500 border-none outline-none uppercase font-bold rounded-[3px] whitespace-nowrap text-white flex items-center justify-center gap-[5px]"
        >
          {cta.label}
          <Icon id="ChevronRight" size={6} strokeWidth={0} />
        </a>
      </div>
      <a
        href={banner.href}
        class="flex w-full min-w-full max-w-full lg:w-1/2 lg:min-w-[50%] lg:max-w-[50%]"
      >
        <Image
          src={banner.image}
          width={382}
          height={240}
          alt={banner.image}
          preload={preload}
          class="flex-1"
        />
      </a>
    </div>
  );
}

export default BannerText;
