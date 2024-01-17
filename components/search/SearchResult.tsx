import { SendEventOnView } from "$store/components/Analytics.tsx";
import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery from "../product/ProductGallery.tsx";
import PageControls from "deco-sites/sexshopatacadao/components/search/PageControls.tsx";
import { getGalleryMode } from "$store/loaders/getGalleryMode.ts";
import { Return } from "apps/shopify/utils/admin/admin.graphql.gen.ts";
import GalleryModeSwitch from "deco-sites/sexshopatacadao/islands/Search/GalleryModeSwitch.tsx";
import { GalleryMode } from "deco-sites/sexshopatacadao/actions/gallery/mode.ts";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
  cardLayout?: CardLayout;

  filterLabelsToHide?: string[];

  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
}

function NotFound() {
  return (
    <div class="w-full max-w-[96rem] md:px-[5vw] mx-auto flex justify-center items-center pb-10">
      <span>Not Found!</span>
    </div>
  );
}

function Result({
  page,
  layout,
  cardLayout,
  startingPage = 0,
  galleryMode,
  filterLabelsToHide = [],
}: Omit<Props, "page"> & {
  page: ProductListingPage;
  galleryMode: GalleryMode;
}) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo.recordPerPage || products.length;

  const id = useId();

  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  const records = pageInfo.records ?? products.length;

  const pageAmount = Math.ceil(
    records / (pageInfo.recordPerPage ?? 0),
  );

  const pageControls = (
    <PageControls
      currentPage={pageInfo.currentPage}
      pagesAmount={pageAmount}
      nextPage={pageInfo.nextPage}
      previousPage={pageInfo.previousPage}
    />
  );

  // Price filter should always be the last one
  const parsedFilters = filters.filter(({ label }) =>
    !filterLabelsToHide.includes(label)
  ).sort((a, b) =>
    a.key === "price" ? (b.key === "price" ? 0 : 1) : b.key === "price" ? -1 : 0
  );

  return (
    <>
      <div class="w-full max-w-[96rem] md:px-[5vw] mx-auto">
        <div class="flex flex-row lg:gap-16">
          {layout?.variant === "aside" && filters.length > 0 && (
            <aside class="hidden lg:flex flex-col w-min min-w-[223px]">
              <h5 class="font-montserrat text-primary-500 text-lg font-semibold py-5 border-b border-gray-400">
                Filtros
              </h5>
              <Filters filters={parsedFilters} />
            </aside>
          )}
          <div class="flex-grow" id={id}>
            <div class="flex items-center mb-[18px] lg:gap-5 lg:flex-row flex-col">
              <div class="w-full flex-1 flex items-center justify-between lg:border-b border-gray-400 min-[1380px]:flex-nowrap flex-wrap">
                <span class="font-montserrat text-sm leading-[1.15] font-medium order-3 lg:order-none basis-full lg:basis-[unset] lg:mx-0 mx-auto lg:py-0 py-4 text-center lg:text-left lg:mb-0 mb-[10px]">
                  <span class="text-primary-500">{records}</span> Produtos
                </span>
                <div class="min-[1380px]:contents flex order-4 lg:-order-1 flex-1 basis-full w-full justify-center">
                  {pageControls}
                </div>
                <SearchControls
                  sortOptions={sortOptions}
                  filters={parsedFilters}
                  displayFilter={layout?.variant === "drawer"}
                />
              </div>
              <div class="self-end lg:order-none -order-1">
                <GalleryModeSwitch current={galleryMode} />
              </div>
            </div>
            <ProductGallery
              products={products}
              offset={offset}
              galleryMode={galleryMode}
              layout={{ card: cardLayout }}
            />
            <div class="w-full flex justify-center items-center mt-[15px] pt-[17px] border-t border-gray-400">
              {pageControls}
            </div>
          </div>
        </div>

        {
          /* <div class="flex justify-center my-4">
          <div class="join">
            <a
              aria-label="previous page link"
              rel="prev"
              href={pageInfo.previousPage ?? "#"}
              class="btn btn-ghost join-item"
            >
              <Icon id="ChevronLeft" size={24} strokeWidth={2} />
            </a>
            <span class="btn btn-ghost join-item">
              Page {zeroIndexedOffsetPage + 1}
            </span>
            <a
              aria-label="next page link"
              rel="next"
              href={pageInfo.nextPage ?? "#"}
              class="btn btn-ghost join-item"
            >
              <Icon id="ChevronRight" size={24} strokeWidth={2} />
            </a>
          </div>
        </div> */
        }
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
            item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: ReturnType<typeof loader>) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export const loader = (props: Props, req: Request) => {
  const galleryMode = getGalleryMode(req);

  return {
    ...props,
    galleryMode,
  };
};

export default SearchResult;
