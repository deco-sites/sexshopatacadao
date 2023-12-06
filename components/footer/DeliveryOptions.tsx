import { ImageWidget } from "apps/admin/widgets.ts";
import SectionTitle from "deco-sites/sexshopatacadao/components/footer/SectionTitle.tsx";

/** @title {{name}} */
export interface DeliveryOption {
  name: string;
  image: ImageWidget;
}

function DeliveryOptions({ items }: { items?: DeliveryOption[] }) {
  return (
    <>
      {items && items.length > 0 && (
        <div class="flex flex-col gap-4">
          <SectionTitle>Métodos de entrega</SectionTitle>
          <ul class="grid grid-cols-[auto_auto] items-center justify-between gap-x-5 gap-y-4 w-fit xs:w-[unset] xs:max-w-[70%] sm:max-w-[unset] mx-8 sm:mx-0">
            {items.map((item) => {
              return (
                <li
                  class=""
                  title={item.name}
                >
                  <img
                    src={item.image}
                    class="!w-[unset] !h-[unset] object-contain"
                    width={124}
                    height={31}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
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

export default DeliveryOptions;
