import Icon from "$store/components/ui/Icon.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { asset } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";

interface Props {
  total: number;
  target: number;
  locale: string;
  currency: string;
}

function BlinkingText({ children }: { children: ComponentChildren }) {
  return (
    <strong class="animate-blink-primary text-lg !leading-none">
      {children}
    </strong>
  );
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
              <span class="!leading-none text-base sm:text-sm font-lato">
                Não perca o frete{" "}
                <BlinkingText>
                  GRÁTIS
                </BlinkingText>
                <br />
                faltam apenas{" "}
                <BlinkingText>
                  {formatPrice(remaining, currency, locale)}*
                </BlinkingText>
              </span>
            )
            : (
              <span class="!leading-none text-base sm:text-sm font-lato">
                Parabéns! você ganhou frete{" "}
                <BlinkingText>
                  GRÁTIS
                </BlinkingText>
                <br />
                válido para todo o Brasil.
              </span>
            )
          : (
            <span class="!leading-none text-base sm:text-sm font-lato">
              Frete{" "}
              <BlinkingText>
                GRÁTIS
              </BlinkingText>{" "}
              a partir de{" "}
              <BlinkingText>
                {formatPrice(target, currency, locale)}*
              </BlinkingText>{" "}
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
