import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { JSX } from "preact";

interface InputProps {
  id: string;
  placeholder: string;
  label: string;
}

function Input({ id, placeholder, label }: InputProps) {
  return (
    <div class="w-full relative">
      <div class="flex w-full mb-2 justify-between items-center">
        <label
          htmlFor={id}
          class="text-black text-sm font-normal leading-[15px]"
        >
          {label}
        </label>
      </div>

      <input
        required
        id={id}
        class="h-11 w-full font-normal text-base text-black placeholder:text-[#757575] bg-transparent border-[2px] focus:outline-gray-200 border-gray-200 rounded p-3"
        placeholder={placeholder}
      />
    </div>
  );
}

export interface Props {
  form?: {
    /**
     * @title Texto do botão de enviar
     */
    submitText?: string;
  };
}

function ContactForm({ form = { submitText: "Enviar" } }: Props) {
  const succeeded = useSignal(false);
  const loading = useSignal(false);

  const onSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    loading.value = true;

    const email = (e.currentTarget.elements.namedItem("email") as RadioNodeList)
      ?.value;
    const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
      ?.value;
    const message =
      (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;

    const data = {
      email,
      name,
      message,
    };

    try {
      await invoke["deco-sites/sexshopatacadao"].actions.contact.send(data);

      succeeded.value = true;
    } catch (error) {
      console.error("ERROR", error);
      alert("Erro ao enviar mensagem");
    }
  };

  return (
    <div class="mt-3 max-w-[1380px] mx-auto font-montserrat">
      <h1
        class={"text-base font-bold text-primary-500 my-4"}
      >
        Formulário de Contato
      </h1>
      <div class="container-center flex flex-col mt-7">
        {succeeded.value
          ? (
            <div class="text-gray-800 w-full flex flex-col justify-center items-center">
              <span class="my-4">Formulário enviado com sucesso</span>
              <button
                class="my-4 uppercase font-bold rounded-[5px] bg-primary-500 text-white w-full max-w-[350px] flex items-center justify-center h-10"
                onClick={() => window.location.reload()}
              >
                Enviar Novo Formulário
              </button>
            </div>
          )
          : (
            <form onSubmit={onSubmit} class="w-full">
              <div class="flex flex-col gap-7 mb-1">
                <Input
                  id="name"
                  label="Nome"
                  placeholder=""
                />
                <Input
                  id="email"
                  label="Email"
                  placeholder=""
                />

                <div class="flex items-center relative">
                  <label htmlFor="message" class="xl:pb-0 w-full">
                    <span class="text-black text-sm leading-[15px] mb-2 block">
                      Mensagem
                    </span>
                    <textarea
                      required
                      id="message"
                      name="message"
                      placeholder={"Digite sua mensagem aqui."}
                      class="w-full font-normal text-sm text-black placeholder:text-[#3f3f40] bg-transparent border-[2px] rounded border-gray-200 py-2 px-4"
                      rows={4}
                      cols={50}
                    />
                  </label>
                </div>
                <div class="w-full flex mb-7 lg:max-w-[200px]">
                  <button
                    type="submit"
                    class="w-full bg-primary-500 font-medium text-white h-10 disabled:bg-disabled-btn disabled:cursor-pointer group uppercase"
                  >
                    <span class="group-disabled:loading">
                      {form?.submitText}
                    </span>
                  </button>
                </div>
              </div>
            </form>
          )}
      </div>
    </div>
  );
}

export default ContactForm;
