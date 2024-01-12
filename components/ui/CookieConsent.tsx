import { useId } from "$store/sdk/useId.ts";

const script = (id: string) => {
  const callback = () => {
    const KEY = "store-cookie-consent";
    const ACCEPTED = "accepted";
    const HIDDEN = "translate-y-[200%]";

    const consent = localStorage.getItem(KEY);
    const elem = document.getElementById(id);

    if (consent !== ACCEPTED && elem) {
      const accept = elem.querySelector("[data-button-cc-accept]");
      accept && accept.addEventListener("click", () => {
        localStorage.setItem(KEY, ACCEPTED);
        elem.classList.add(HIDDEN);
      });
      const close = elem.querySelector("[data-button-cc-close]");
      close &&
        close.addEventListener("click", () => elem.classList.add(HIDDEN));
      elem.classList.remove(HIDDEN);
    }
  };

  addEventListener("scroll", callback, { once: true });
};

export interface Props {
  /** @format html */
  text?: string;
  buttons?: {
    allowText: string;
    cancelText?: string;
  };
  layout?: {
    position?: "Expanded" | "Left" | "Center" | "Right";
    content?: "Tiled" | "Piled up";
  };
}

const DEFAULT_PROPS = {
  text:
    "Guardamos estatísticas de visitas para melhorar sua experiência de navegação.",
  buttons: {
    allowText: "Aceitar",
  },
  layout: {
    position: "Expanded",
    content: "Tiled",
  },
};

function CookieConsent(props: Props) {
  const id = useId();
  const { text, buttons, layout } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  return (
    <>
      <div
        id={id}
        class={`
          transform-gpu translate-y-[200%] transition fixed bottom-0 w-screen z-50 lg:flex bg-primary-500
        `}
        // ${layout?.position === "Left" ? "lg:justify-start" : ""}
        // ${layout?.position === "Center" ? "lg:justify-center" : ""}
        // ${layout?.position === "Right" ? "lg:justify-end" : ""}
      >
        <div
          class={`
          p-4 flex flex-col sm:flex-row justify-center gap-4 container
          ${
            // ${
            //   !layout?.position || layout?.position === "Expanded"
            //     ? "lg:container lg:mx-auto"
            //     : `
            //   ${layout?.content === "Piled up" ? "lg:w-[480px]" : ""}
            //   ${
            //       !layout?.content || layout?.content === "Tiled"
            //         ? "lg:w-[520px]"
            //         : ""
            //     }
            // `
            // }
            // ${
            //   !layout?.content || layout?.content === "Tiled"
            //     ? "lg:flex-row lg:items-end"
            //     : ""
            // }
            ""}
        `}
        >
          <div
            class={`flex-auto flex flex-col gap-4 max-w-3xl pr-9 ${
              !layout?.content || layout?.content === "Tiled" ? "lg:gap-2" : ""
            }`}
          >
            {text && (
              <div
                class="text-sm text-white"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            )}
          </div>

          <div
            class={`flex flex-col gap-2 ${
              !layout?.position || layout?.position === "Expanded"
                ? "lg:flex-row"
                : ""
            }`}
          >
            <button
              class="btn rounded-none hover:bg-white hover:border-white hover:text-primary-500 bg-transparent border border-white font-bold uppercase text-white h-9"
              data-button-cc-accept
            >
              {buttons.allowText}
            </button>
          </div>
        </div>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: `(${script})("${id}");` }}
      />
    </>
  );
}

export default CookieConsent;
