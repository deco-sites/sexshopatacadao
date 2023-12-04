import Icon from "$store/components/ui/Icon.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { asset } from "$fresh/runtime.ts";

interface Props {
  total: number;
  target: number;
  locale: string;
  currency: string;
}

function FreeShippingProgressBar({ target, total, currency, locale }: Props) {
  const remaining = target - total;
  const percent = Math.floor((total / target) * 100);

  return (
    <div class="text-white bg-gray-800 relative font-montserrat flex items-center h-16 px-6">
      <div class="flex gap-5 items-center z-20 relative">
        <Icon id="ShippingTruck" size={37} strokeWidth={0} />
        {total > 0
          ? remaining > 0
            ? (
              <span class="leading-none">
                Não perca o frete{" "}
                <strong class="animate-blink-primary text-lg leading-none">
                  GRÁTIS
                </strong>
                <br />
                faltam apenas{" "}
                <strong class="animate-blink-primary text-lg leading-none">
                  {formatPrice(remaining, currency, locale)}*
                </strong>
              </span>
            )
            : (
              <span class="leading-none">
                Parabéns! você ganhou frete{" "}
                <strong class="animate-blink-primary text-lg leading-none">
                  GRÁTIS
                </strong>
                <br />
                válido para todo o Brasil.
              </span>
            )
          : (
            <span class="leading-none">
              Frete{" "}
              <strong class="animate-blink-primary text-lg leading-none">
                GRÁTIS
              </strong>{" "}
              a partir de{" "}
              <strong class="animate-blink-primary text-lg leading-none">
                {formatPrice(target, currency, locale)}*
              </strong>{" "}
              válido para todo o Brasil!
            </span>
          )}
      </div>

      {
        /* <progress
        class="progress progress-primary w-full"
        value={percent}
        max={100}
      /> */
      }
      <div
        style={{
          width: percent >= 100 ? 0 : `${percent}%`,
          backgroundImage: `url(${asset("/image/free-shipping-progress.png")})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50%",
        }}
        class="absolute top-0 left-0 h-full z-10"
      >
      </div>
    </div>
  );

  // return (
  //   <div class="flex flex-col w-full gap-2">
  //     <div class="flex justify-center items-center gap-2 text-primary">
  //       <Icon id="Truck" size={24} />
  //       {remaining > 0
  //         ? (
  //           <span>
  //             Faltam {formatPrice(remaining, currency, locale)}{" "}
  //             para ganhar frete grátis!
  //           </span>
  //         )
  //         : <span>Você ganhou frete grátis!</span>}
  //     </div>
  //     <progress
  //       class="progress progress-primary w-full"
  //       value={percent}
  //       max={100}
  //     />
  //   </div>
  // );
}

export default FreeShippingProgressBar;
