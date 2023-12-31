import { fetchSafe } from "apps/utils/fetch.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { AppContext } from "$store/apps/site.ts";

export const cache = "stale-while-revalidate";

export const cacheKey = (req: Request) => {
  const url = new URL(req.url);

  const params = new URLSearchParams();
  params.set("skuId", url.searchParams.get("skuId") ?? "");

  url.search = params.toString();

  return url.href;
};

const VTEX_ACCOUNT_NAME = "atacadaosexyshop";

export interface Props {
  page: ProductDetailsPage | null;
}

export interface ProductManufacturerCode {
  manufacturerCode: string | null;
}

export const loader = async (
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<ProductManufacturerCode> => {
  const { page } = props;

  if (!page || ctx.platform !== "vtex") {
    return {
      manufacturerCode: null,
    };
  }

  const { product } = page;
  const { sku } = product;

  try {
    const res = await fetchSafe(
      `https://${VTEX_ACCOUNT_NAME}.vtexcommercestable.com.br/api/io/_v/private/graphql/v1`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "accept": "application/json",
        },
        body: JSON.stringify({
          query: `
            query GetManufacturer($id: ID!) {
              sku(identifier: { field: id, value: $id }) {
                manufacturerCode
              }
            }
          `,
          operationName: "GetManufacturer",
          variables: {
            id: sku,
          },
        }),
      },
    );

    const { data } = (await res.json()) as {
      data: { sku: { manufacturerCode: string } };
    };

    return data.sku;
  } catch {
    return {
      manufacturerCode: null,
    };
  }
};

export default loader;
