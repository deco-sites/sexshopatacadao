import { effect, signal } from "@preact/signals";

const selectedVariants = signal({} as Record<string, number>);

effect(() => {
  if (Object.keys(selectedVariants.value).length === 0) {
    return;
  }

  document.querySelectorAll("[data-variant-avatar]").forEach((el) => {
    const variantId = el.getAttribute("data-variant-id");

    if (!variantId) {
      return;
    }

    if (variantId.includes(",")) {
      const variantIds = variantId.split(",");

      const isActive = variantIds.some((id) => {
        const variantQuantity = selectedVariants.value[id] ?? null;

        if (typeof variantQuantity !== "number") {
          return false;
        }

        return Boolean(variantQuantity);
      }, 0);

      el.setAttribute("data-active", String(isActive));

      return;
    }

    const variantQuantity = selectedVariants.value[variantId] ?? null;

    if (typeof variantQuantity !== "number") {
      return;
    }

    el.setAttribute("data-active", String(Boolean(variantQuantity)));
  });
});

const state = { selectedVariants };

export const useSelectedVariants = () => state;
