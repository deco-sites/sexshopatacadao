import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/**
 * @titleBy alt
 */
export interface Banner {
  src: ImageWidget;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description When you click you go to
   */
  href: string;
}

export interface Props {
  banners: Banner[];
}

export default function BannnerRow(props: Props) {
  const {
    banners = [],
  } = props;

  return (
    <section class="max-w-[96rem] mx-auto w-full">
      <div
        class={`flex justify-center lg:justify-start flex-wrap lg:flex-nowrap items-stretch gap-3`}
      >
        {banners.map(({ href, src, alt }) => (
          <a
            href={href}
            class={`flex `}
          >
            <Image
              src={src}
              alt={alt}
              width={400}
              height={260}
              class="w-screen md:w-full max-w-[unset] max-h-[unset]"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
