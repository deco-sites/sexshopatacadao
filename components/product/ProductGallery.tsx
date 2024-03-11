import ProductCard, {
  Layout as CardLayout,
} from "$store/components/product/ProductCard.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { Product } from "apps/commerce/types.ts";
import { GalleryMode } from "deco-sites/sexshopatacadao/actions/gallery/mode.ts";

export interface Props {
  products: Product[] | null;
  offset: number;
  galleryMode: GalleryMode;
  priceMultiplier?: number;
  layout?: {
    card?: CardLayout;
  };
  isMobile?: boolean;
}

function ProductGallery(
  { products, layout, offset, galleryMode, priceMultiplier, isMobile }: Props,
) {
  const platform = usePlatform();

  return (
    <div class={`flex flex-wrap items-stretch`}>
      {products?.map((product, index) => (
        galleryMode === "grid"
          ? (
            <div class="px-3 pt-5 pb-6 max-w-[50%] lg:max-w-[25%] sm:max-w-[33.333333%] min-w-[50%] lg:min-w-[25%] sm:min-w-[33.333333%]">
              <ProductCard
                product={product}
                preload={index === 0}
                index={offset + index}
                layout={layout?.card}
                platform={platform}
                galleryMode={galleryMode}
                priceMultiplier={priceMultiplier}
                isMobile={isMobile}
              />
            </div>
          )
          : (
            <div class="w-full px-3 pt-5 pb-6">
              <ProductCard
                product={product}
                preload={index === 0}
                index={offset + index}
                layout={layout?.card}
                platform={platform}
                galleryMode={galleryMode}
                priceMultiplier={priceMultiplier}
                isMobile={isMobile}
              />
            </div>
          )
      ))}
    </div>
  );
}

export default ProductGallery;
