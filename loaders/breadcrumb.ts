import type { BreadcrumbList } from "apps/commerce/types.ts";
import { fetchSafe } from "apps/utils/fetch.ts";
import { pageTypesToBreadcrumbList } from "apps/vtex/utils/legacy.ts";

export const cache = "stale-while-revalidate";

export const cacheKey = (req: Request): string => new URL(req.url).pathname;

const VTEX_ACCOUNT_NAME = "atacadaosexyshop";

const PAGE_TYPE_TO_MAP_PARAM = {
  Brand: "b",
  Category: "c",
  Department: "c",
  SubCategory: "c",
  Collection: "productClusterIds",
  Cluster: "productClusterIds",
  Search: "ft",
  FullText: "ft",
  Product: "p",
  NotFound: null,
};

const segmentsFromTerm = (term: string) => term.split("/").filter(Boolean);

const pageTypesFromPathname = async (
  term: string,
) => {
  const segments = segmentsFromTerm(term);

  const base = `https://${VTEX_ACCOUNT_NAME}.vtexcommercestable.com.br`;
  const URL = `${base}/api/catalog_system/pub/portal/pagetype`;

  const results = await Promise.all(
    segments.map((_, index) =>
      fetchSafe(
        `${URL}/${segments.slice(0, index + 1).join("/")}`,
        {
          deco: {
            cache: "stale-while-revalidate",
          },
          headers: {
            "content-type": "application/json",
          },
          signal: AbortSignal.timeout(5000),
        },
      ).then((res) => res.json())
    ),
  );

  return results.filter((result) =>
    PAGE_TYPE_TO_MAP_PARAM[
      result.pageType as keyof typeof PAGE_TYPE_TO_MAP_PARAM
    ]
  );
};

export interface BreadcrumbListLoader {
  "@type": "BreadcrumbList";
  itemListElement: BreadcrumbList["itemListElement"];
}

export const loader = async (
  { isPdp: _isPdp = false }: { isPdp?: boolean },
  req: Request,
): Promise<BreadcrumbListLoader> => {
  const { url: baseUrl } = req;
  const url = new URL(baseUrl);
  const pageTypesPromise = pageTypesFromPathname(url.pathname);
  const pageTypes = await pageTypesPromise;

  const itemListElement = pageTypesToBreadcrumbList(pageTypes, baseUrl);

  return {
    "@type": "BreadcrumbList",
    itemListElement,
  };
};

export default loader;
