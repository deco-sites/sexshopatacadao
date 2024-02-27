import { useEffect, useRef, useState } from "preact/hooks";
import { ComponentProps } from "preact";
import Image from "apps/website/components/Image.tsx";

interface ContainerBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

type ZoomType = "click" | "hover";

export interface Props extends ComponentProps<typeof Image> {
  type: ZoomType;
  factor: number;
  zoomSrc?: string;
}

const clamp = (min: number, max: number, value: number) =>
  Math.min(Math.max(value, min), max);

const getBounds = (element?: Element | null): ContainerBounds | null => {
  if (!element) return null;

  const bounds = element.getBoundingClientRect();

  return {
    x: bounds.left,
    y: bounds.top,
    width: bounds.width,
    height: bounds.height,
  };
};

const getMousePositionFromEvent = (
  event: MouseEvent,
  bounds?: ContainerBounds | null,
): { x: number; y: number; isOutOfBounds?: boolean } => {
  if (!bounds) {
    return { x: 0, y: 0 };
  }

  const [x, y] = [event.clientX - bounds.x, event.clientY - bounds.y];

  const threshold = 20;
  /* Uses out-of-bounds detection instead of simply a "mouse-out" event
   * to prevent from zooming out when the mouse hovers a button or suchlike */
  const isOutOfBounds = x < -threshold || y < -threshold ||
    x > bounds.width + threshold || y > bounds.height + threshold;

  // Values larger than 0 increase mouse movement sensivity
  const boost = 0.1;

  return {
    x: clamp(0, bounds.width, -bounds.width * boost + x * (1 + boost * 2)),
    y: clamp(0, bounds.height, -bounds.height * boost + y * (1 + boost * 2)),
    isOutOfBounds,
  };
};

function ZoomableImage({ type, factor, zoomSrc, fit, ...imageProps }: Props) {
  const [isZoomedIn, setZoom] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const containerBounds = useRef<ContainerBounds | null>(null);

  const setPositionAndScale = (x: number, y: number, scale: number) => {
    const contentElement = contentRef.current;

    if (!contentElement) {
      return;
    }

    contentElement.style.transform = `scale(${scale}, ${scale}) translate3d(${
      -x / scale
    }px, ${-y / scale}px, 0)`;
  };

  const getContainerBounds = () =>
    containerBounds.current ?? getBounds(containerRef.current);

  const handleMouseOver = () => {
    setZoom(true);
  };

  const handleClick = (event: MouseEvent) => {
    setZoom(!isZoomedIn);

    // eslint-disable-next-line vtex/prefer-early-return
    if (!isZoomedIn) {
      const mousePosition = getMousePositionFromEvent(
        event,
        getContainerBounds(),
      );

      setPositionAndScale(mousePosition.x, mousePosition.y, factor);
    }
  };

  // Resets position when the image is zoomed out
  useEffect(() => {
    // eslint-disable-next-line vtex/prefer-early-return
    if (!isZoomedIn) {
      setPositionAndScale(0, 0, 1);
      containerBounds.current = null;
    }
  }, [isZoomedIn]);

  /* Adds mouse event handlers to the entire document, so that
   * mouse movement is not restricted to just the content element */
  const handleClickOutside = (event: MouseEvent) => {
    if (!isZoomedIn) {
      return;
    }

    const isDescendant = containerRef.current && event.target &&
      containerRef.current.contains?.(event.target as Node);

    if (isDescendant) {
      return;
    }

    setZoom(false);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isZoomedIn) {
      return;
    }

    const mousePosition = getMousePositionFromEvent(
      event,
      getContainerBounds(),
    );

    /* Uses out-of-bounds detection instead of simply a "mouse-out" event
     * to prevent from zooming out when the mouse hovers a button or suchlike */
    if (type === "hover" && mousePosition.isOutOfBounds) {
      setZoom(false);
    } else {
      setPositionAndScale(mousePosition.x, mousePosition.y, factor);
    }
  };

  useEffect(() => {
    if (document) {
      document.addEventListener("mousemove", handleMouseMove);
      if (type === "click") {
        document.addEventListener("click", handleClickOutside);
      }
    }

    return () => {
      // eslint-disable-next-line vtex/prefer-early-return
      if (document) {
        document.removeEventListener("mousemove", handleMouseMove);
        if (type === "click") {
          document.removeEventListener("click", handleClickOutside);
        }
      }
    };
  });

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      ref={containerRef}
      onMouseOver={type === "hover" ? handleMouseOver : undefined}
      onClick={type === "click" ? handleClick : undefined}
      class="relative overflow-hidden w-full"
    >
      <div
        ref={contentRef}
        style={{
          transformOrigin: "0 0",
          fontSize: 0,
          /** Prevents accidental whitespaces on the content from stretching
           * the container, and consequently the zoomed image */
        }}
      >
        <img
          data-zoomed={isZoomedIn}
          {...imageProps}
          data-fresh-disable-lock={true}
          preload={undefined}
          srcSet={zoomSrc
            ? isZoomedIn ? undefined : imageProps.srcSet
            : imageProps.srcSet}
          src={zoomSrc ? isZoomedIn ? zoomSrc : imageProps.src : imageProps.src}
        />
      </div>
    </div>
  );
}

export default ZoomableImage;
