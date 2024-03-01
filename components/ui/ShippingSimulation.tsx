import { Signal, useComputed, useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import Button from "$store/components/ui/Button.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import type { SimulationOrderForm, SKU, Sla } from "apps/vtex/utils/types.ts";
import type { ComponentChildren } from "preact";

export interface Props {
  items: Array<SKU>;
  children?: ComponentChildren;
}

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") {
    if (time === "1") {
      return "1 dia útil";
    }

    return `${time} dias úteis`;
  }
  if (type === "d") {
    if (time === "1") {
      return "1 dia";
    }

    return `${time} dias`;
  }
  if (type === "h") {
    if (time === "1") {
      return "1 hora";
    }

    return `${time} horas`;
  }
};

function ShippingContent({ simulation }: {
  simulation: Signal<SimulationOrderForm | null>;
}) {
  const { cart } = useCart();

  const methods = useComputed(() =>
    simulation.value?.logisticsInfo?.reduce(
      (initial, { slas }) => [...initial, ...slas],
      [] as Sla[],
    ) ?? []
  );

  const locale = cart.value?.clientPreferencesData.locale || "pt-BR";
  const currencyCode = cart.value?.storePreferencesData.currencyCode || "BRL";

  if (simulation.value == null) {
    return null;
  }

  if (methods.value.length === 0) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    );
  }

  return (
    <div class="mt-3 py-2 border-y border-gray-400">
      <table class="text-sm w-full">
        {methods.value.map((method) => (
          <tr>
            <td>
              <input type="radio" name="shipping-option" />
            </td>
            <td>
              {method.name.toLowerCase().includes("retira")
                ? "RETIRADA NO LOCAL"
                : method.name}
            </td>
            <td>
              Em até {formatShippingEstimate(method.shippingEstimate)}
            </td>
            <td>
              {method.price === 0 ? "Grátis" : (
                formatPrice(method.price / 100, currencyCode, locale)
              )}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );

  // return (
  //   <ul class="flex flex-col gap-4 p-4 rounded-[4px]">
  //     {methods.value.map((method) => (
  //       <li class="flex justify-between items-center border-base-200 not-first-child:border-t">
  //         <span class="text-button text-center">
  //           Entrega {method.name}
  //         </span>
  //         <span class="text-button">
  //           até {formatShippingEstimate(method.shippingEstimate)}
  //         </span>
  //         <span class="text-base font-semibold text-right">
  //           {method.price === 0 ? "Grátis" : (
  //             formatPrice(method.price / 100, currencyCode, locale)
  //           )}
  //         </span>
  //       </li>
  //     ))}
  //   </ul>
  // );
}

function ShippingSimulation({ items, children }: Props) {
  const postalCode = useSignal("");
  const loading = useSignal(false);
  const simulateResult = useSignal<SimulationOrderForm | null>(null);
  const { simulate, cart } = useCart();

  const handleSimulation = useCallback(async () => {
    if (postalCode.value.length !== 9) {
      return;
    }

    try {
      loading.value = true;
      simulateResult.value = await simulate({
        items: items,
        postalCode: postalCode.value,
        country: cart.value?.storePreferencesData.countryCode || "BRA",
      });
    } finally {
      loading.value = false;
    }
  }, []);

  return (
    <div class="flex flex-col font-montserrat">
      <div class="flex gap-8 md:gap-0 flex-col md:flex-row justify-between">
        <div class="flex flex-col flex-1">
          <strong class="leading-normal text-[#3f3f40]">
            Calcule o Frete:
          </strong>
          <a
            class="text-xs text-[#3f3f40] leading-[1.15] mb-[5px]"
            href="https://buscacepinter.correios.com.br/app/endereco/index.php"
            target="_blank"
          >
            Não sei meu CEP
          </a>

          <form
            class="flex"
            onSubmit={(e) => {
              e.preventDefault();
              handleSimulation();
            }}
          >
            <input
              as="input"
              type="text"
              class="border border-gray-400 text-gray-600 rounded-l-[5px] px-4 h-10 w-full outline-none"
              placeholder="00000-000"
              value={postalCode.value}
              maxLength={9}
              size={9}
              onChange={(e: { currentTarget: { value: string } }) => {
                postalCode.value = e.currentTarget.value.replace(/\D/g, "")
                  .replace(/(\d{5})(\d)/, "$1-$2")
                  .replace(/(-\d{3})\d+?$/, "$1");
              }}
            />
            <button
              type="submit"
              disabled={loading.value}
              class="h-10 text-white flex items-center justify-center font-medium min-w-[114px] w-[114px] rounded-r-[5px] bg-gray-700 group outline-none"
            >
              <span class="group-disabled:loading">
                Calcular
              </span>
            </button>
          </form>
        </div>
        <div class="flex-1 md:self-end mt-4">
          {children}
        </div>
      </div>

      <div>
        <ShippingContent simulation={simulateResult} />
      </div>
    </div>
  );
}

export default ShippingSimulation;
