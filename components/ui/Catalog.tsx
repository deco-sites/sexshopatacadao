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

  background: ImageWidget;

  backgroundMobile: ImageWidget;

  /**
   * @ignore
   */
  children?: ComponentChildren;
}

function Catalog({
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
  backgroundMobile,
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
        acronym: "CT",
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
      class="relative bg-black w-full group lg:h-[350px] text-white py-6 overflow-hidden"
      data-succeeded={succeeded}
    >
      <div class="group-data-[succeeded='true']:opacity-0 group-data-[succeeded='true']:invisible transition-all duration-300 max-w-[1520px] z-[1] flex flex-col justify-between h-full py-[18px] lg:py-0 px-[15px] relative mx-auto w-full">
        {text && (
          <div
            class="prose text-lg text-primary-500 text-center lg:text-left lg:text-4xl max-w-[500px] mx-auto font-ubuntu font-bold"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        )}
        <form
          class="font-montserrat mx-auto w-full lg:max-w-[500px]"
          onSubmit={handleSubmit}
          noValidate
        >
          <div class="flex flex-col justify-center items-center px-[15px] gap-4 w-full mt-5 lg:mt-0">
            <div
              class="flex flex-col w-full relative group/input text-center lg:text-left "
              data-errored={nameErrored}
            >
              <label
                for={`${id}--name`}
                class="text-sm leading-[16px] mb-1"
              >
                Digite seu nome:
              </label>
              <input
                id={`${id}--name`}
                name="name"
                type="text"
                placeholder="Ex: Maria Eduarda"
                class="text-sm leading-[18px] text-black outline-none p-[10px] w-full max-w-[475px] rounded-md h-14 text-center lg:text-left placeholder:text-[#979899]"
                autocomplete="off"
                onFocus={() => nameErrored.value = false}
              />
              <span className="absolute -bottom-[30px] lg:-bottom-[18px] text-xs hidden group-data-[errored='true']/input:block font-ubuntu">
                O valor inserido não é valido.
              </span>
            </div>
            <div
              class="flex flex-col w-full relative group/input text-center lg:text-left "
              data-errored={emailErrored}
            >
              <label
                for={`${id}--email`}
                class="text-sm leading-[16px] mb-1"
              >
                Digite seu e-mail:
              </label>
              <input
                id={`${id}--email`}
                name="email"
                type="email"
                placeholder="Ex: seuemail@seuemail.com.br"
                class="text-sm leading-[18px] text-black outline-none w-full p-[10px] max-w-[475px] rounded-md h-14 text-center lg:text-left placeholder:text-[#979899]"
                autocomplete="off"
                onFocus={() => emailErrored.value = false}
              />
              <span className="absolute -bottom-[30px] lg:-bottom-[18px] text-xs hidden group-data-[errored='true']/input:block font-ubuntu">
                O e-mail inserido parece estar incorreto.
              </span>
            </div>
            <button
              type="submit"
              class="hover:bg-primary-600 bg-primary-500 transition-colors w-full lg:max-w-[210px] text-white uppercase font-bold rounded-[6px] h-10 lg:h-14 flex items-center justify-center group/btn disabled:bg-primary-600 lg:mt-0 "
              disabled={loading}
            >
              <span class="group-disabled/btn:loading group-disabled/btn:text-[0px]">
                Baixar
              </span>
            </button>
          </div>
        </form>
      </div>

      <div class="flex items-center justify-between opacity-0 invisible group-data-[succeeded='true']:opacity-100 group-data-[succeeded='true']:visible transition-all duration-300 max-w-[1160px] z-[1] h-full flex-col lg:flex-row py-[18px] lg:py-0 px-[15px] mx-auto w-full gap-5 lg:gap-0 absolute">
        <div class="flex items-center gap-[10px] lg:gap-[104px]">
          <Image src={success.image} width={1920} height={250} alt="Sucesso!" />

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
      <Image
        src={background}
        width={1920}
        height={250}
        class="absolute top-0 z-0 max-w-none h-[350px] w-auto aspect-[1920/250] left-1/2 -translate-x-1/2 hidden sm:block"
        loading={"lazy"}
      />
      <Image
        src={backgroundMobile}
        width={375}
        height={302}
        class="absolute top-0 z-0 max-w-none min-h-[302px] w-auto aspect-[375/302] left-1/2 -translate-x-1/2 block sm:hidden"
        loading={"lazy"}
      />
    </div>
  );
}

export default Catalog;
