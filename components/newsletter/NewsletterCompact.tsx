import { useId } from "deco-sites/sexshopatacadao/sdk/useId.ts";
import { invoke } from "$store/runtime.ts";
import type { ComponentChildren } from "preact";
import { useSignal } from "@preact/signals";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import type { JSX } from "preact";

export interface Props {
  /** @format html */
  rightText?: string;

  /** @format html */
  leftText?: string;

  success?: {
    /**
     * @description left text
     * @format html
     */
    message?: string;
  };

  /**
   * @ignore
   */
  background: string;

  /**
   * @ignore
   */
  children?: ComponentChildren;
}

function NewsletterCompact({
  rightText,
  leftText,
  children,
  success = {
    message: "Cadastrado com sucesso!",
  },
  background,
}: Props) {
  const id = useId();
  const succeeded = useSignal(false);
  const loading = useSignal(false);
  const nameErrored = useSignal(false);
  const emailErrored = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;
      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;

      if (!email || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        emailErrored.value = true;
      }

      if (!name) {
        nameErrored.value = true;
      }

      if (
        !email || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) || !name
      ) {
        return;
      }

      await invoke.vtex.actions.masterdata.createDocument({
        acronym: "NR",
        data: {
          email,
          name,
        },
      });

      succeeded.value = true;
    } finally {
      loading.value = false;
    }
  };

  return (
    <div
      class="relative bg-primary-500 w-full group py-1 grid grid-cols-1 grid-rows-1 text-white"
      data-succeeded={succeeded}
    >
      <div class="row-start-1 row-end-1 col-start-1 col-end-1  transition-all duration-300 max-w-[1520px] z-[1] flex flex-col lg:flex-row items-center justify-between h-full py-[18px] lg:py-0 px-[15px] relative mx-auto w-full">
        {leftText && (
          <div
            class="prose text-base font-ubuntu max-w-[345px] [&_:is(h1,h2,h3)]:font-lobster text-center lg:text-right"
            dangerouslySetInnerHTML={{ __html: leftText }}
          />
        )}
        {!succeeded.value
          ? (
            <form
              class="contents font-ubuntu group-data-[succeeded='true']:opacity-0 group-data-[succeeded='true']:invisible"
              onSubmit={handleSubmit}
              noValidate
            >
              <div class="flex flex-col lg:flex-row items-center px-[15px] gap-[30px] w-full lg:w-[55%] mt-5 lg:mt-0">
                <div
                  class="flex flex-col w-full relative group/input text-center lg:text-left gap-2 lg:gap-0"
                  data-errored={nameErrored}
                >
                  <label
                    for={`${id}--name`}
                    class="font-bold text-sm leading-[16px] sr-only"
                  >
                    Nome:
                  </label>
                  <input
                    id={`${id}--name`}
                    name="name"
                    type="text"
                    placeholder="Nome"
                    class="text-base leading-[18px] outline-none w-full p-[10px] bg-white text-[#979899] rounded-lg"
                    autocomplete="off"
                    onFocus={() => nameErrored.value = false}
                  />
                  <span className="absolute -bottom-[30px] lg:-bottom-[18px] text-xs hidden group-data-[errored='true']/input:block font-ubuntu">
                    O valor inserido não é valido.
                  </span>
                </div>
                <div
                  class="flex flex-col w-full relative group/input text-center lg:text-left gap-2 lg:gap-0"
                  data-errored={emailErrored}
                >
                  <label
                    for={`${id}--email`}
                    class="font-bold text-sm leading-[16px] sr-only"
                  >
                    Email:
                  </label>
                  <input
                    id={`${id}--email`}
                    name="email"
                    type="email"
                    placeholder="Seu e-mail"
                    class="text-base leading-[18px] outline-none w-full p-[10px] bg-white text-[#979899] rounded-lg"
                    autocomplete="off"
                    onFocus={() => emailErrored.value = false}
                  />
                  <span className="absolute -bottom-[30px] lg:-bottom-[18px] text-xs hidden group-data-[errored='true']/input:block font-ubuntu">
                    O e-mail inserido parece estar incorreto.
                  </span>
                </div>
              </div>
              <button
                type="submit"
                class=" transition-colors w-full lg:max-w-[188px] text-white uppercase font-bold rounded-[6px] h-10 lg:h-[50px] flex items-center justify-center  mt-[15px] lg:mt-0"
                disabled={loading}
              >
                <span>
                  Cadastrar
                </span>
              </button>
            </form>
          )
          : (
            <div class="flex items-center justify-center">
              <span class="">
                Cadastrado com sucesso!
              </span>
            </div>
          )}
        {rightText && (
          <div
            class="prose text-base font-ubuntu max-w-[345px] [&_:is(h1,h2,h3)]:font-lobster text-center lg:text-left"
            dangerouslySetInnerHTML={{ __html: rightText }}
          />
        )}
      </div>
    </div>
  );
}

export default NewsletterCompact;
