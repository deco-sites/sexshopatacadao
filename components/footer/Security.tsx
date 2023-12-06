import { ImageWidget } from "apps/admin/widgets.ts";
import SectionTitle from "$store/components/footer/SectionTitle.tsx";

/** @title {{name}} */
export interface SecurityItem {
  name: string;
  image: ImageWidget;
}

function Security({ items }: { items?: SecurityItem[] }) {
  return (
    <>
      {items && items.length > 0 && (
        <div class="flex flex-col gap-4">
          <SectionTitle>Segurança</SectionTitle>
          <ul class="flex justify-between gap-x-[6px] max-w-[205px] xs:max-w-[70%] sm:max-w-[205px] gap-y-2 flex-wrap mx-8 sm:mx-0">
            {items.map((item) => {
              return (
                <li
                  class=""
                  title={item.name}
                >
                  <img
                    src={item.image}
                    class="!w-[unset] !h-[unset] object-contain"
                    width={62}
                    height={48}
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

export default Security;
