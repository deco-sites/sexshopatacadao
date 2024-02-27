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
import PageControls from "$store/components/search/PageControls.tsx";
import { getGalleryMode } from "$store/loaders/getGalleryMode.ts";
import GalleryModeSwitch from "$store/islands/Search/GalleryModeSwitch.tsx";
import { GalleryMode } from "$store/actions/gallery/mode.ts";
import type { Props as ShelfProps } from "$store/components/product/ProductShelf.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import { ImageOrIconType } from "$store/components/ui/ImageOrIcon.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import ImageOrIcon from "$store/components/ui/ImageOrIcon.tsx";
import ProductShelf from "$store/components/product/ProductShelf.tsx";
import { loader as shelfLoader } from "$store/sections/Product/ProductShelf.tsx";
import { AppContext } from "$store/apps/site.ts";

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

  notFoundProps: NotFoundProps;
  priceMultiplier?: number;
}

/**
 * @title {{text}}
 */
interface NotFoundInfo {
  icon: ImageOrIconType;
  text: string;
}

/**
 * @title {{text}}
 */
interface NotFoundCategory {
  icon: ImageOrIconType;
  text: string;
  href: string;
}

interface NotFoundProps {
  searchbar: SearchbarProps;

  info: NotFoundInfo[];

  categories: NotFoundCategory[];
  shelfProps: ShelfProps;
}

function NotFound(
  { shelfProps, searchbar, categories, info }: ReturnType<
    typeof loader
  >["notFoundProps"],
) {
  return (
    <div class="flex flex-col gap-[35px]">
      <div class="w-full flex bg-[linear-gradient(90deg,#ff94b4,#ffb1c9_52.08%,#ff94b4)] text-gray-800 max-lg:p-4">
        <div class="flex flex-col max-w-[1200px] w-full my-2.5 mx-auto bg-white border-l-4 border-primary-500 shadow-[0_6px_10px_rgba(0,0,0,.1)] rounded-[5px] lg:h-[335px]">
          <h1 class="text-[25px] font-bold uppercase leading-[1.15] mt-[10px] mb-[15px] text-center w-full">
            Ops...Não encontramos resultados para sua pesquisa!
          </h1>
          <div class="flex flex-col lg:flex-row justify-center lg:gap-[60px] gap-6">
            <div class="flex flex-col max-w-[440px] max-lg:mx-auto">
              <h2 class="mb-2.5 lg:mb-0 font-medium lg:text-lg">
                Vamos tentar de novo? Que tal seguir algumas dicas?
              </h2>
              <div class="py-2">
                <Searchbar searchbar={searchbar} />
              </div>
              <ul class="list-disc text-sm lg:text-lg leading-[27px] pl-10 font-montserrat">
                <li>Verifique os termos digitados</li>
                <li>Tente utilizar uma palavra</li>
                <li>Utilize termos genéricos na busca</li>
                <li>Busque utilizar palavras-chave</li>
              </ul>
            </div>
            <div class="bg-primary-500 h-[1px] w-full lg:h-full lg:w-[1px] flex items-center justify-center max-lg:max-w-[220px] max-lg:mx-auto">
              <span class="p-3 lg:px-0 bg-white">ou</span>
            </div>
            <div class="w-full lg:max-w-[500px] flex flex-col justify-center max-lg:px-6">
              <h2 class="mb-[15px] font-medium lg:text-lg">
                Que tal navegar por essas categorias?
              </h2>
              <ul class="grid grid-cols-2 max-lg:gap-[10px] max-lg:items-center lg:flex w-full justify-between">
                {categories.map((category) => (
                  <li>
                    <a
                      class="flex lg:flex-col w-full h-[71px] lg:w-[117px] lg:h-[109px] shadow-[3px_4px_7px_rgba(0,0,0,.15)] rounded-[10px] items-center justify-center text-center p-2 font-bold text-xs lg:text-[13px] uppercase bg-gray-200 max-lg:justify-start"
                      href={category.href}
                    >
                      <ImageOrIcon
                        width={58}
                        height={51}
                        alt={category.text}
                        loading="eager"
                        {...category.icon}
                      />
                      <span class="max-lg:w-full">{category.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <h2 class="mt-4 max-lg:mb-4 px-6 lg:px-0 font-medium text-sm lg:text-lg mx-auto">
            Caso ainda não consiga encontrar o que procura entre em contato
            conosco para te auxiliarmos:
          </h2>
          <div class="flex flex-col lg:flex-row mx-auto">
            {info.map((infoItem) => (
              <div class="flex items-center justify-center gap-2 max-lg:py-4 max-lg:first:pt-0 max-lg:first:border-t-0 max-lg:border-t first lg:px-8 lg:first:border-l-0 lg:border-l border-current text-sm">
                <ImageOrIcon
                  width={20}
                  height={20}
                  alt={infoItem.text}
                  loading="eager"
                  {...infoItem.icon}
                />
                <span>{infoItem.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ProductShelf {...shelfProps} />
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
  priceMultiplier,
}: Omit<Props, "page" | "notFoundProps"> & {
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
              priceMultiplier={priceMultiplier}
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

function SearchResult(
  { page, notFoundProps, ...props }: ReturnType<typeof loader>,
) {
  if (!page?.products?.length) {
    return <NotFound {...notFoundProps} />;
  }

  return <Result {...props} page={page} />;
}

export const loader = (props: Props, req: Request, ctx: AppContext) => {
  const galleryMode = getGalleryMode(req);

  const shelfProps = shelfLoader(props.notFoundProps.shelfProps, req, ctx);

  return {
    ...props,
    priceMultiplier: shelfProps.priceMultiplier,
    notFoundProps: {
      ...props.notFoundProps,
      shelfProps,
    },
    galleryMode,
  };
};

export default SearchResult;
