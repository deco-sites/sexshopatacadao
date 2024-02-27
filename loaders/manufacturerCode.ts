import { ProductDetailsPage } from "apps/commerce/types.ts";
import { AppContext } from "$store/apps/site.ts";

export const cache = "stale-while-revalidate";

export const cacheKey = (_props: unknown, req: Request) => {
  const url = new URL(req.url);

  const params = new URLSearchParams();
  params.set("skuId", url.searchParams.get("skuId") ?? "");

  url.search = params.toString();

  return url.href;
};

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

  if (!page || ctx.platform !== "vtex" || !ctx.vtex) {
    return {
      manufacturerCode: null,
    };
  }

  const { product } = page;
  const { sku } = product;

  try {
    const res = await ctx.vtex.io.query<
      { sku: { manufacturerCode: string } },
      { id: string }
    >(
      {
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
      },
    );

    return res.sku;
  } catch {
    return {
      manufacturerCode: null,
    };
  }
};

export default loader;
