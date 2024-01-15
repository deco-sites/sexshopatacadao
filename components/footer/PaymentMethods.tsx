import Icon from "$store/components/ui/Icon.tsx";
import SectionTitle from "deco-sites/sexshopatacadao/components/footer/SectionTitle.tsx";
import ImageOrIcon, {
  ImageOrIconType,
} from "deco-sites/sexshopatacadao/components/ui/ImageOrIcon.tsx";

/** @title {{ name }} */
export interface PaymentItem {
  name: string;
  image: ImageOrIconType;
}

export default function PaymentMethods(
  { content }: { content?: { title?: string; items?: PaymentItem[] } },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-[14px]">
          {content.title && <SectionTitle>{content.title}</SectionTitle>}
          <ul class="flex items-center justify-between gap-x-[6px] gap-y-2 flex-wrap max-w-[192px] xs:max-w-[unset] sm:max-w-[192px] mx-8 sm:mx-0">
            {content.items.map((item) => {
              return (
                <li
                  class=""
                  title={item.name}
                >
                  <ImageOrIcon
                    class="!w-auto"
                    width={43}
                    height={27}
                    alt={item.name}
                    {...item.image}
                    loading="lazy"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
