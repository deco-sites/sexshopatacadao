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
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import { checkIsMobile } from "deco-sites/sexshopatacadao/loaders/isMobile.ts";
import { AppContext } from "deco-sites/sexshopatacadao/apps/site.ts";

/** @titleBy title */
interface Tab {
  title: string;
  productsRow1: Product[] | null;
  productsRow2: Product[] | null;
}

export interface Props {
  tabs: Tab[];
  /** @format html */
  title?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };
  cardLayout?: cardLayout;
  tabIndex?: number;
  limitSizeInTitle?: boolean;
}

function Shelf({ id, products, cardLayout, platform, title, isMobile }: {
  id: string;
  products: Product[];
  cardLayout?: cardLayout;
  platform: ReturnType<typeof usePlatform>;
  title: string;
  isMobile: boolean;
}) {
  return (
    <div class="w-full max-w-[96rem] mx-auto flex flex-col px-2">
      {isMobile
        ? (
          <div
            id={id}
            class="grid grid-cols-[48px_1fr_48px] px-0 sm:px-5"
          >
            <Slider class="carousel carousel-center sm:carousel-end col-span-full row-start-2 row-end-5">
              {products.map((product, index) => (
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
          </div>
        )
        : (
          <>
            <ul class="grid grid-rows-1 grid-cols-3 xl:grid-cols-5 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
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
          </>
        )}
    </div>
  );
}

function TabbedProductShelf({
  tabs,
  title,
  layout,
  cardLayout,
  tabIndex,
  isMobile,
  limitSizeInTitle = false,
}: ReturnType<typeof loader>) {
  const id = useId();
  const platform = usePlatform();
  const ti = typeof tabIndex === "number"
    ? Math.min(Math.max(tabIndex, 0), tabs.length)
    : 0;
  const { productsRow1, productsRow2, title: shelfTitle } = tabs[ti];

  if (!productsRow1 || productsRow1.length === 0) {
    return null;
  }

  const parsedProductsRow1 = isMobile ? productsRow1 : productsRow1.slice(0, 5);
  const parsedProductsRow2 =
    (isMobile ? productsRow2 : productsRow2?.slice(0, 5)) ?? [];

  return (
    <div class="w-full flex flex-col gap-5 max-w-[96rem] mx-auto">
      <Header
        title={title || ""}
        alignment={layout?.headerAlignment || "center"}
        limitSize={limitSizeInTitle}
      />

      <div class="flex justify-center gap-2 px-2">
        {tabs.map((tab, index) => (
          <button
            data-active={index === ti}
            class={"w-[150px] h-[45px] bg-white text-primary-500 border border-primary-500 rounded-[5px] data-[active='true']:bg-primary-500 data-[active='true']:text-white hover:bg-primary-500 hover:text-white transition-colors duration-500 font-medium"}
            {...usePartialSection({ props: { tabIndex: index } })}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div
        id={id}
        class="flex flex-col w-full gap-[45px]"
      >
        <Shelf
          id={id}
          products={parsedProductsRow1}
          cardLayout={cardLayout}
          platform={platform}
          title={shelfTitle}
          isMobile={isMobile}
        />
        <Shelf
          id={id}
          products={parsedProductsRow2}
          cardLayout={cardLayout}
          platform={platform}
          title={shelfTitle}
          isMobile={isMobile}
        />
        <SendEventOnView
          id={id}
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: [...productsRow1, ...parsedProductsRow2].map((
                product,
                index,
              ) =>
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
    </div>
  );
}

export function loader(props: Props, req: Request, ctx: AppContext) {
  const isMobileValue = checkIsMobile(ctx);
  return { ...props, isMobile: isMobileValue };
}

export default TabbedProductShelf;
