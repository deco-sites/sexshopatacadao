import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Image, {
  Props as DecoImageProps,
} from "apps/website/components/Image.tsx";

export interface ImageOrIconType {
  /** @title Image */
  image?: ImageWidget;
  /**
   * @title Icon
   * @default ""
   */
  icon?: AvailableIcons;
}

export interface ImageOrIconProps extends ImageOrIconType {
  class?: string;
  width?: number;
  height?: number;
  alt?: string;
  loading?: "lazy" | "eager";

  optimize?: boolean | Omit<DecoImageProps, "src" | "width" | "height">;
}

const ImageOrIcon = (
  {
    icon,
    image,
    alt,
    width,
    height,
    loading = "lazy",
    optimize,
    class: _class,
  }: ImageOrIconProps,
) => {
  if (image) {
    if (optimize && width) {
      return (
        <Image
          src={image}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          class={`object-contain ${_class}`}
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
          {...(typeof optimize === "object" ? optimize : { fit: "contain" })}
        />
      );
    }

    return (
      <img
        src={image}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        class={`object-contain ${_class}`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      />
    );
  }

  if (!icon) {
    return null;
  }

  return <Icon id={icon} width={width} height={height} class={_class} />;
};

export default ImageOrIcon;
