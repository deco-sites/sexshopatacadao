import { useSignal } from "@preact/signals";
import { clx } from "$store/sdk/clx.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { FilterToggle } from "apps/commerce/types.ts";
import { useMemo } from "preact/hooks";

export type RangeProps = {
  filter: FilterToggle;
};

type RangeValue = {
  max: number;
  min: number;
  pl: string;
  pr: string;
  width: string;
};

export const Range = ({
  filter,
}: RangeProps) => {
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

  const params = new URLSearchParams(window.location.search);
  const paramsValue = params.get("filter.price");
  const paramsMax = paramsValue?.split(":").at(-1);
  const paramsMin = paramsValue?.split(":").at(0);

  const price = useSignal<RangeValue>({
    max: paramsMax !== undefined ? parseFloat(paramsMax) : max,
    min: paramsMin !== undefined ? parseFloat(paramsMin) : min,
    pl: "0%",
    pr: "0%",
    width: "100%",
  });

  const nearest = (max - min) / 10;
  const interval = max - min;

  return (
    <>
      <div class="flex flex-col gap-[1.25rem] w-full pt-2">
        <div class="flex items-center relative w-full">
          <div class="bg-[#e3e4e6] flex h-1 items-center relative w-full rounded-sm">
            <div
              class="absolute bg-primary-500 h-full flex"
              style={{
                left: `${100 * (price.value.min - min) / interval}%`,
                right: `${100 * (price.value.max - min) / interval}%`,
                width: `${
                  100 * (price.value.max - price.value.min) / interval
                }%`,
              }}
            />
          </div>

          <label class="absolute flex w-full">
            <span class="absolute h-0 overflow-hidden w-0">
              Preço mínimo
            </span>

            <input
              aria-label="Ranger de preço"
              class={clx(
                "custom-range",
                "w-full",
              )}
              max={max}
              min={min}
              onChange={(event) => {
                const target = event.target as HTMLInputElement;
                const float = parseFloat(target.value);

                if (float >= price.value.max - nearest) {
                  price.value = {
                    ...price.value,
                    min: price.value.max - nearest,
                  };

                  return;
                }

                price.value = {
                  ...price.value,
                  min: float,
                };

                POST(price.value);
              }}
              step={(max - min) / 100}
              type="range"
              value={price.value.min}
            />
          </label>

          <label class="absolute flex w-full">
            <span class="absolute h-0 overflow-hidden w-0">
              Preço máximo
            </span>

            <input
              aria-label="Ranger de preço"
              class={clx(
                "custom-range",
                "w-full",
              )}
              max={max}
              min={min}
              onChange={(event) => {
                const target = event.target as HTMLInputElement;
                const float = parseFloat(target.value);

                if (float <= price.value.min + nearest) {
                  price.value = {
                    ...price.value,
                    max: price.value.min + nearest,
                  };

                  return;
                }

                price.value = {
                  ...price.value,
                  max: float,
                };

                POST(price.value);
              }}
              step={(max - min) / 100}
              type="range"
              value={price.value.max}
            />
          </label>
        </div>

        <div class="gap-2 flex flex-wrap items-center justify-end w-full">
          {
            /* <button
            class={clx(
              "bg-primary-500 duration-300 ease-in-out flex font-normal items-center justify-center h-9 leading-normal rounded text-[#FFFFFF] text-base transition-colors w-16",
            )}
            onClick={() => POST(price.value)}
          >
            Filtrar
          </button> */
          }

          <span class="font-normal leading-normal text-sm text-[#727273] font-montserrat">
            {formatPrice(price.value.min)} - {formatPrice(price.value.max)}
          </span>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          input[type="range"] {
            -webkit-appearance: none;
            align-items: center;
            appearance: none;
            background: transparent;
            cursor: pointer;
            display: flex;
            height: 0;
          }

          /* Removes default focus */
          input[type="range"]:focus {
            outline: none;
          }

          /******** Chrome, Safari, Opera and Edge Chromium styles ********/
          /* slider track */
          input[type="range"]::-webkit-slider-runnable-track {
            background-color: transparent;
            height: 0;
          }

          /* slider thumb */
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            /* Override default look */
            appearance: none;
            /* Centers thumb on the track */
            background-color: #e5067c;
            border-radius: 50%;
            box-shadow: 0 0 0.625rem #00000033;
            height: 12px;
            transform: translateY(-50%);
            width: 12px;
          }

          input[type="range"]:focus::-webkit-slider-thumb {
            outline: none;
          }

          /*********** Firefox styles ***********/
          /* slider track */
          input[type="range"]::-moz-range-track {
            background-color: transparent;
            height: 0;
          }

          /* slider thumb */
          input[type="range"]::-moz-range-thumb {
            -webkit-appearance: none;
            /* Override default look */
            appearance: none;
            /* Centers thumb on the track */
            background-color: #e5067c;
            border-radius: 50%;
            box-shadow: 0 0 0.625rem #00000033;
            height: 12px;
            transform: translateY(-50%);
            width: 12px;
          }

          input[type="range"]:focus::-moz-range-thumb {
            outline: none;
          }`,
        }}
      />
    </>
  );
};

const POST = ({
  max,
  min,
}: RangeValue) => {
  const params = new URLSearchParams(window.location.search);
  params.set("filter.price", `${min}:${max}`);

  window.location.search = params.toString();
};

export default Range;
