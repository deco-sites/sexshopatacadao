import { fetchSafe } from "apps/utils/fetch.ts";

export interface Props {
  query?: string;
}

export interface Autocomplete {
  autocomplete: { name: string; slug: string }[];
}

const VTEX_ACCOUNT_NAME = "atacadaosexyshop";

export const loader = async (
  props: Props,
  _req: Request,
): Promise<Autocomplete> => {
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
            query Autocomplete($term: String!) {
              autocomplete(searchTerm: $term) @context(provider: "vtex.search-graphql") {
                itemsReturned {
                  name
                  productId
                  slug
                }
              }
            }
          `,
          operationName: "Autocomplete",
          variables: {
            term: props.query,
          },
        }),
      },
    );

    const { data } = (await res.json()) as {
      data: {
        autocomplete: {
          itemsReturned: {
            name: string;
            productId: string | null;
            slug: string;
          }[];
        };
      };
    };

    const autocomplete = data.autocomplete.itemsReturned.flatMap((
      { productId, ...rest },
    ) => productId ? [] : [rest]);

    return { autocomplete };
  } catch {
    return { autocomplete: [] };
  }
};

export default loader;
