import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

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
  width: number;
  height: number;
  alt?: string;
  loading?: "lazy" | "eager";
}

const ImageOrIcon = (
  { icon, image, alt, width, height, loading, class: _class }: ImageOrIconProps,
) => {
  if (image) {
    return (
      <img
        src={image}
        alt={alt}
        width={width}
        height={height}
        loading={loading ?? "lazy"}
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
