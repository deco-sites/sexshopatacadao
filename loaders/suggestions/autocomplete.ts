import { AppContext } from "$store/apps/site.ts";

export interface Props {
  query?: string;
}

export interface Autocomplete {
  autocomplete: { name: string; slug: string }[];
}

export const loader = async (
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<Autocomplete> => {
  if (!props.query || ctx.platform !== "vtex" || !ctx.vtex) {
    return {
      autocomplete: [],
    };
  }

  try {
    const res = await ctx.vtex.io.query<
      {
        autocomplete: {
          itemsReturned: {
            name: string;
            productId: string | null;
            slug: string;
          }[];
        };
      },
      { term: string }
    >(
      {
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
      },
    );

    const autocomplete = res.autocomplete.itemsReturned.flatMap((
      { productId, ...rest },
    ) => productId ? [] : [rest]);

    return { autocomplete };
  } catch {
    return { autocomplete: [] };
  }
};

export default loader;
