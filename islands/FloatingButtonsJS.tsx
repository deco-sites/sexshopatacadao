import { useEffect } from "preact/hooks";

interface Props {
  rootId: string;
  threshold?: number;
}

// deno-lint-ignore no-explicit-any
const debounce = <T extends (...args: any[]) => any>(fn: T) => {
  let frame: number;

  return (...params: Parameters<T>): void => {
    if (frame) {
      cancelAnimationFrame(frame);
    }

    frame = requestAnimationFrame(() => {
      fn(...params);
    });
  };
};

const storeHasScrolledPast = (root: HTMLElement, threshold: number) => {
  const hasScrolledPastTresHold = window.scrollY >= threshold;

  const previousValue = root.getAttribute(
    "data-show",
  );

  if (previousValue === hasScrolledPastTresHold.toString()) return;

  root.setAttribute(
    "data-show",
    hasScrolledPastTresHold.toString(),
  );
};

const setup = ({ rootId, threshold = 100 }: Props) => {
  const root = document.getElementById(rootId);
  const button = root?.querySelector<HTMLElement>('[data-action="top"]');

  if (!root || !button) {
    const missingElements = [];
    if (!root) missingElements.push("root");
    if (!button) missingElements.push("button");
    console.warn(
      "Missing elements in FloatingButtonsJS",
      missingElements.join(", "),
    );
    return;
  }

  const scroll = debounce(() => {
    storeHasScrolledPast(root, threshold);
  });

  const click = () =>
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

  document.addEventListener("scroll", scroll, { passive: true });
  button.addEventListener("click", click);

  storeHasScrolledPast(root, threshold);

  return () => {
    document.removeEventListener("scroll", scroll);
    button.removeEventListener("click", click);
  };
};

function FloatingButtonsJS(
  { rootId, threshold }: Props,
) {
  useEffect(() => setup({ rootId, threshold }), [rootId, threshold]);

  return <div data-floating-buttons-controller-js />;
}

export default FloatingButtonsJS;
