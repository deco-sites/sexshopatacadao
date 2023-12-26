import { SendEventOnView } from "$store/components/Analytics.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { checkIsMobile } from "deco-sites/sexshopatacadao/loaders/isMobile.ts";

export interface Props {
  products: Product[] | null;
  /** @format html */
  title?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };
  cardLayout?: cardLayout;
}

function ProductShelf({
  products,
  title,
  layout,
  cardLayout,
  isMobile,
}: ReturnType<typeof loader>) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }

  const parsedProducts = isMobile ? products : products.slice(0, 5);

  return (
    <div class="w-full flex flex-col gap-2">
      <Header
        title={title || ""}
        alignment={layout?.headerAlignment || "center"}
        limitSize
      />

      <div class="w-full max-w-[96rem] mx-auto flex flex-col">
        {isMobile
          ? (
            <div
              id={id}
              class="grid grid-cols-[48px_1fr_48px] px-4"
            >
              <Slider class="carousel carousel-center sm:carousel-end col-span-full row-start-2 row-end-5">
                {parsedProducts?.map((product, index) => (
                  <Slider.Item
                    index={index}
                    class="carousel-item flex justify-center xl:w-[calc(20%-20px)] lg:w-[calc(25%-20px)] md:w-[calc(33.333333%-20px)] w-[calc(50%-20px)] px-[10px]"
                  >
                    <ProductCard
                      product={product}
                      itemListName={title}
                      layout={cardLayout}
                      platform={platform}
                      index={index}
                      isMobile={isMobile}
                    />
                  </Slider.Item>
                ))}
              </Slider>

              {
                /* <>
                <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
                  <Slider.PrevButton class="btn btn-circle btn-outline absolute right-1/2 bg-base-100">
                    <Icon size={24} id="ChevronLeft" strokeWidth={3} />
                  </Slider.PrevButton>
                </div>
                <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
                  <Slider.NextButton class="btn btn-circle btn-outline absolute left-1/2 bg-base-100">
                    <Icon size={24} id="ChevronRight" strokeWidth={3} />
                  </Slider.NextButton>
                </div>
              </> */
              }
              <SliderJS rootId={id} />
              <SendEventOnView
                id={id}
                event={{
                  name: "view_item_list",
                  params: {
                    item_list_name: title,
                    items: products.map((product, index) =>
                      mapProductToAnalyticsItem({
                        index,
                        product,
                        ...(useOffer(product.offers)),
                      })
                    ),
                  },
                }}
              />
            </div>
          )
          : (
            <>
              <ul class="grid grid-rows-1 grid-cols-3 xl:grid-cols-5 lg:grid-cols-4 gap-6">
                {parsedProducts?.map((product, index) => (
                  <li class="[&:nth-child(5)]:hidden [&:nth-child(4)]:hidden xl:[&:nth-child(5)]:block lg:[&:nth-child(4)]:block">
                    <ProductCard
                      product={product}
                      itemListName={title}
                      layout={cardLayout}
                      platform={platform}
                      index={index}
                      isMobile={isMobile}
                    />
                  </li>
                ))}
              </ul>
              <SendEventOnView
                id={id}
                event={{
                  name: "view_item_list",
                  params: {
                    item_list_name: title,
                    items: products.map((product, index) =>
                      mapProductToAnalyticsItem({
                        index,
                        product,
                        ...(useOffer(product.offers)),
                      })
                    ),
                  },
                }}
              />
            </>
          )}
      </div>
    </div>
  );
}

export function loader(props: Props, req: Request) {
  const isMobileValue = checkIsMobile(req);
  return { ...props, isMobile: isMobileValue };
}

export default ProductShelf;
