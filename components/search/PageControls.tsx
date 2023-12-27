import Icon from "deco-sites/sexshopatacadao/components/ui/Icon.tsx";

export interface PageControlsProps {
  currentPage: number;
  pagesAmount: number;
  previousPage?: string;
  nextPage?: string;
}

const MAX_QUANTITY = 5;

function getRangeToRender(currentPage: number, quantity: number) {
  if (quantity < MAX_QUANTITY) return getArrayFilled(1, quantity);

  const maxPageButtonsHalf = Math.floor(MAX_QUANTITY / 2);

  let fromPage = currentPage - maxPageButtonsHalf;

  let toPage = MAX_QUANTITY % 2 === 0
    ? currentPage + maxPageButtonsHalf - 1
    : currentPage + maxPageButtonsHalf;

  if (toPage <= MAX_QUANTITY) {
    fromPage = 1;
    toPage = fromPage + MAX_QUANTITY - 1;

    return getArrayFilled(fromPage, toPage);
  }

  if (toPage > quantity) {
    toPage = quantity;
    fromPage = toPage - MAX_QUANTITY + 1;

    return getArrayFilled(fromPage, toPage);
  }

  return getArrayFilled(fromPage, toPage);
}

function getArrayFilled(start: number, end: number) {
  return Array.from({ length: end - start + 1 })
    .map((_, i) => start + i);
}

interface PageNumberProps {
  value: number;
  currentURL: string;
}

function PageNumber({ value, currentURL }: PageNumberProps) {
  const urlObj = new URL(currentURL);

  const current = urlObj.searchParams.get("page") === String(value);

  urlObj.searchParams.set("page", String(value));
  // const path = `${urlObj.pathname}${urlObj.search}`;
  const path = urlObj.search;

  return (
    <div class="group lg:px-1 px-3">
      <a
        aria-label={`Go to page ${value}`}
        href={current ? "#" : path}
        data-current={current}
        class="w-[25px] h-[25px] flex items-center justify-center text-base data-[current='true']:bg-primary-500 font-montserrat rounded-[5px] data-[current='true']:!text-white group-hover:font-bold group-hover:text-primary-500 transition-all font-medium"
      >
        {value}
      </a>
    </div>
  );
}

function PageControls(
  { currentPage, pagesAmount, nextPage, previousPage }: PageControlsProps,
) {
  const pagesToRender = getRangeToRender(currentPage, pagesAmount);

  const currentPageUrl = new URL(
    nextPage ?? previousPage ?? "#",
    "https://example.com",
  );
  currentPageUrl.searchParams.set("page", String(currentPage));

  return (
    <div class="flex items-center">
      <a
        aria-label="previous page link"
        rel="prev"
        href={previousPage ?? "#"}
        class="flex items-center justify-center gap-3 px-2"
      >
        <Icon id="PagePrev" size={15} strokeWidth={0} />
      </a>

      {pagesToRender[0] > 1 && (
        <>
          <PageNumber value={1} currentURL={currentPageUrl.href} />
          <span>...</span>
        </>
      )}
      {pagesToRender?.map((page) => (
        <PageNumber value={page} currentURL={currentPageUrl.href} />
      ))}
      {pagesToRender[pagesToRender.length - 1] < pagesAmount && (
        <>
          <span>...</span>
          <PageNumber value={pagesAmount} currentURL={currentPageUrl.href} />
        </>
      )}

      <a
        aria-label="next page link"
        rel="next"
        href={nextPage ?? "#"}
        class="flex items-center justify-center gap-3 px-2"
      >
        <span class="text-[13px] text-primary-500 font-montserrat max-xs:hidden">
          Próximo
        </span>
        <Icon id="PageNext" size={15} strokeWidth={0} />
      </a>
    </div>
  );
}

export default PageControls;
