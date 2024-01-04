import type { ProductLeaf } from "apps/commerce/types.ts";

export type Possibilities = Record<
  string,
  Record<
    string,
    { value: string; inStock: boolean; image: string; url: string }
  >
>;

const omit = new Set(["category", "cluster", "RefId"]);
export const useVariantPossibilities = (
  variants: ProductLeaf[],
): Possibilities => {
  const possibilities = variants.reduce((acc, variant) => {
    const { url, additionalProperty = [], sku } = variant;
    const specs = additionalProperty.filter(({ name }) => !omit.has(name!));
    const [image1, image2] = variant.image ?? [];
    const inStock = variant.offers?.offers?.[0]?.availability ===
      "https://schema.org/InStock";

    specs.forEach(({ value, name }) => {
      acc[name!] = {
        ...(acc[name!]),
        [sku]: {
          value: value!,
          image: (image2 ?? image1).url!,
          inStock,
          url: url!,
        },
      };
    });

    return acc;
  }, {} as Possibilities);

  return possibilities;
};
