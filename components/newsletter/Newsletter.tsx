import { useId } from "deco-sites/sexshopatacadao/sdk/useId.ts";
import { invoke } from "$store/runtime.ts";
import type { ComponentChildren } from "preact";
import { useSignal } from "@preact/signals";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import type { JSX } from "preact";

export interface Props {
  /** @format html */
  text?: string;

  success?: {
    image: ImageWidget;

    /**
     * @description right text
     * @format html
     */
    bigText?: string;

    /**
     * @description left text
     * @format html
     */
    smallText?: string;
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

function Newsletter({
  text,
  children,
  success = {
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3328/e0039588-6960-4e50-af4d-b100ea348f3e",
    bigText:
      "Agora você faz parte da <strong>comunidade #atacalovers!</strong>",
    smallText:
      "Você passará a receber nossas melhores promoções, brindes e vantagens.",
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
      class="relative bg-primary-500 w-full group lg:h-[104px] grid grid-cols-1 grid-rows-1 text-white"
      data-succeeded={succeeded}
    >
      <div class="row-start-1 row-end-1 col-start-1 col-end-1 group-data-[succeeded='true']:opacity-0 group-data-[succeeded='true']:invisible transition-all duration-300 max-w-[1520px] z-[1] flex flex-col lg:flex-row items-center justify-between h-full py-[18px] lg:py-0 px-[15px] relative mx-auto w-full">
        {text && (
          <div
            class="prose text-lg leading-[21px] text-center font-ubuntu lg:text-left lg:text-2xl lg:leading-[34px] max-w-[345px]"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        )}
        <form
          class="contents font-ubuntu"
          onSubmit={handleSubmit}
          noValidate
        >
          <div class="flex items-center px-[15px] gap-[30px] w-full lg:w-[55%] mt-5 lg:mt-0">
            <div
              class="flex flex-col w-full relative group/input text-center lg:text-left gap-2 lg:gap-0"
              data-errored={nameErrored}
            >
              <label
                for={`${id}--name`}
                class="font-bold text-sm leading-[16px]"
              >
                Nome:
              </label>
              <input
                id={`${id}--name`}
                name="name"
                type="text"
                placeholder="Seu nome"
                class="text-base leading-[18px] outline-none border-b border-white w-full p-[10px] bg-transparent placeholder:text-white text-center lg:text-left"
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
                class="font-bold text-sm leading-[16px]"
              >
                Email:
              </label>
              <input
                id={`${id}--email`}
                name="email"
                type="email"
                placeholder="Seu e-mail"
                class="text-base leading-[18px] outline-none border-b border-white w-full p-[10px] bg-transparent placeholder:text-white text-center lg:text-left"
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
            class="hover:bg-warning-600 bg-warning-500 transition-colors w-full lg:max-w-[188px] text-primary-500 uppercase font-bold rounded-[6px] h-10 lg:h-[50px] flex items-center justify-center group/btn disabled:bg-warning-600 mt-[34px] lg:mt-0"
            disabled={loading}
          >
            <span class="group-disabled/btn:loading group-disabled/btn:text-[0px]">
              Inscreva-se
            </span>
          </button>
        </form>
      </div>

      <div class="flex items-center justify-between row-start-1 row-end-1 col-start-1 col-end-1 opacity-0 invisible group-data-[succeeded='true']:opacity-100 group-data-[succeeded='true']:visible transition-all duration-300 max-w-[1160px] z-[1] h-full flex-col lg:flex-row py-[18px] lg:py-0 px-[15px] mx-auto w-full gap-5 lg:gap-0">
        <div class="flex items-center gap-[10px] lg:gap-[104px]">
          <Image src={success.image} width={52} height={52} alt="Sucesso!" />

          <div
            class="prose text-lg leading-[21px] lg:text-2xl lg:leading-[34px] max-w-[240px] lg:max-w-[345px] text-center"
            dangerouslySetInnerHTML={{ __html: success.bigText ?? "" }}
          />
        </div>

        <div
          class="prose text-base leading-[20px] max-w-[298px] text-center"
          dangerouslySetInnerHTML={{ __html: success.smallText ?? "" }}
        />

        <button
          type="button"
          class="hover:bg-warning-600 bg-warning-500 transition-colors w-full lg:max-w-[188px] text-primary-500 uppercase font-bold rounded-[6px] h-10 lg:h-[50px] px-[42px] flex items-center justify-center"
          onClick={() => succeeded.value = false}
        >
          Voltar
        </button>
      </div>
      <div
        class="absolute inset-0 opacity-[0.3] lg:opacity-[0.15] bg-repeat-y lg:bg-no-repeat lg:bg-cover z-0"
        style={{ backgroundImage: `url(${background})` }}
      />
    </div>
  );
}

export default Newsletter;
