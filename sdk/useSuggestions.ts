import { signal } from "@preact/signals";
import type { Suggestion } from "apps/commerce/types.ts";
import type { Resolved } from "deco/engine/core/resolver.ts";
import { useCallback } from "preact/compat";
import type { Autocomplete } from "$store/loaders/suggestions/autocomplete.ts";
import { invoke } from "../runtime.ts";

const payload = signal<(Suggestion & Autocomplete) | null>(null);
const loading = signal<boolean>(false);

let queue = Promise.resolve();
let latestQuery = "";

const NULLABLE: Resolved<null> = {
  __resolveType: "resolved",
  data: null,
};

const doFetch = async (
  query: string,
  { __resolveType: __suggestionResolveType, ...suggestionExtraProps }: Resolved<
    Suggestion | null
  > = NULLABLE,
  { __resolveType: __autocompleteResolveType, ...autocompleteExtraProps }:
    Resolved<
      Autocomplete | null
    > = NULLABLE,
) => {
  // Debounce query to API speed
  if (latestQuery !== query) return;

  try {
    // Figure out a better way to type this loader
    // deno-lint-ignore no-explicit-any
    const suggestionInvokePayload: any = {
      key: __suggestionResolveType,
      props: { query, ...suggestionExtraProps },
    };
    // deno-lint-ignore no-explicit-any
    const autocompleteInvokePayload: any = {
      key: __autocompleteResolveType,
      props: { query, ...autocompleteExtraProps },
    };

    const [suggestionPayload, autocompletePayload] = await Promise.all([
      invoke(suggestionInvokePayload) as Suggestion | null,
      invoke(autocompleteInvokePayload) as unknown as Autocomplete | null,
    ]);

    payload.value = { ...suggestionPayload, ...autocompletePayload! };
  } catch (error) {
    console.error(
      "Something went wrong while fetching suggestions \n",
      error,
    );
  } finally {
    loading.value = false;
  }
};

export const useSuggestions = (
  loader: Resolved<Suggestion | null>,
  autocompleteLoader: Resolved<Autocomplete | null>,
) => {
  const setQuery = useCallback((query: string) => {
    loading.value = true;
    latestQuery = query;
    queue = queue.then(() => doFetch(query, loader, autocompleteLoader));
  }, [loader]);

  return {
    loading,
    payload,
    setQuery,
    query: latestQuery,
  };
};
