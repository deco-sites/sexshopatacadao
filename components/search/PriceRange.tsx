import { useMemo } from "preact/compat";
import type { FilterToggle } from "apps/commerce/types.ts";
import type { JSX } from "preact";
import { useSignal, useSignalEffect } from "@preact/signals";
import { formatPrice } from "deco-sites/sexshopatacadao/sdk/format.ts";

export interface Props {
  filter: FilterToggle;
}

export default function PriceRange({ filter }: Props) {
  const progressRef = useSignal<HTMLDivElement | null>(null);
  const LocalUrl = self.location.href ? new URL(self.location.href) : undefined;

  const query = LocalUrl?.searchParams?.get("filter.price");
  const [queryMin, queryMax] = query?.split(":") ?? ["null", "null"];

  const { min, max } = useMemo(() => {
    return filter?.values?.reduce(
      (acc, item) => {
        const [min, max] = item.value.split(":").map(Number);

        if (acc.min > min) {
          return {
            ...acc,
            min: min,
          };
        }

        if (acc.max < max) {
          return {
            ...acc,
            max: max,
          };
        }

        return acc;
      },
      { min: Number.MAX_SAFE_INTEGER, max: 0 },
    );
  }, []);

  const minValue = useSignal(Number(queryMin) || min);
  const maxValue = useSignal(Number(queryMax) || max);
  const step = useMemo(() => max / 100, [max]);

  const handleMin: JSX.GenericEventHandler<HTMLInputElement> = (e) => {
    const newValue = Number(e.currentTarget.value);
    if (newValue <= maxValue.value) {
      minValue.value = newValue;
    }
  };

  const handleMax: JSX.GenericEventHandler<HTMLInputElement> = (e) => {
    const newValue = Number(e.currentTarget.value);
    if (newValue >= minValue.value) {
      maxValue.value = newValue;
    }
  };

  const handleRangeChange = () => {
    const keyPrice = "filter.price";
    // Esta função será chamada quando o usuário soltar o controle deslizante
    // Você pode adicionar qualquer lógica aqui que você desejar executar nesse momento.
    const filterUrl = LocalUrl
      ? new URL(filter.values[0].url, LocalUrl)
      : undefined;

    if (!filterUrl) return;

    filterUrl.searchParams.delete(keyPrice);
    filterUrl.searchParams.append(
      keyPrice,
      `${minValue.value}:${maxValue.value}`,
    );

    self.location.search = filterUrl.search;
  };

  useSignalEffect(() => {
    if (progressRef.value) {
      const range = max - step;
      const leftPercentage = ((minValue.value - step) / range) * 100;
      const rightPercentage = ((max - maxValue.value) / range) * 100;

      progressRef.value.style.paddingLeft = `${leftPercentage}%`;
      progressRef.value.style.paddingRight = `${rightPercentage}%`;
    }
  });

  return (
    <li className="lg:[writing-mode:horizontal-tb]">
      <div className="flex flex-col lg:w-48 bg-white">
        <div className="relative mb-3">
          <div className="slider relative z-[1] isolate h-1 rounded-md bg-gray-300 overflow-hidden">
            <div
              className="progress absolute h-1 z-[-1] bg-transparent rounded w-full box-border "
              ref={(e) => progressRef.value = e}
            >
              <div class={"bg-secondary w-full h-full"}></div>
            </div>
          </div>

          <div className="range-input relative">
            <input
              onChange={handleMin}
              type="range"
              min={min}
              step={step}
              max={max}
              value={minValue}
              className="absolute w-full -top-1 h-1 bg-transparent text-heading"
              onMouseUp={handleRangeChange}
            />

            <input
              onChange={handleMax}
              type="range"
              min={min}
              step={step}
              max={max}
              value={maxValue}
              className="absolute w-full -top-1 h-1 bg-transparent appearance-none text-heading"
              onMouseUp={handleRangeChange}
            />
          </div>
        </div>
        <div class={"flex"}>
          {formatPrice(minValue.value) ?? "R$ 0,00"}
          {" - "}
          {formatPrice(maxValue.value)}
        </div>
      </div>
    </li>
  );
}
