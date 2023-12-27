import ProductCard, {
  Layout as CardLayout,
} from "$store/components/product/ProductCard.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { Product } from "apps/commerce/types.ts";

export interface Props {
  products: Product[] | null;
  offset: number;
  layout?: {
    card?: CardLayout;
  };
}

function ProductGallery({ products, layout, offset }: Props) {
  const platform = usePlatform();

  return (
    <div class={`flex flex-wrap items-stretch`}>
      {products?.map((product, index) => (
        <div class="px-3 pt-5 pb-6 max-w-[50%] lg:max-w-[25%] sm:max-w-[33.333333%] min-w-[50%] lg:min-w-[25%] sm:min-w-[33.333333%]">
          <ProductCard
            product={product}
            preload={index === 0}
            index={offset + index}
            layout={layout?.card}
            platform={platform}
          />
        </div>
      ))}
    </div>
  );
}

export default ProductGallery;
