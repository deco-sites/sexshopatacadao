export default function TextSeo(
  { text }: { text: string },
) {
  const id = `text-seo`;
  const inputId = `text-seo-input`;

  return (
    <div class="py-9 lg:pt-14 lg:pb-12 flex justify-center bg-primary relative mb-6 lg:mb-0">
      <input type={"checkbox"} class={"hidden peer"} id={inputId} />
      <div
        class={"center flex flex-col px-[10px] overflow-hidden peer-checked:max-h-none max-h-[279px] lg:max-h-none lg:px-14 xl:px-[10px]"}
      >
        <div id={id} class={"contents"}>
          <div
            class="prose [&_p]:mb-4 leading-[25px] text-xs uppercase"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </div>
      </div>

      <label
        htmlFor={inputId}
        class="peer-checked:hidden lg:hidden w-full h-[35px] absolute bottom-0 bg-primary left-1/2 translate-x-[-50%] translate-y-[-50%]"
        style={{}}
      >
        <label
          htmlFor={inputId}
          class="mx-auto cursor-pointer flex items-center justify-center rounded w-[160px] h-[35px] border border-tertiary bg-white"
        >
          <span class="font-light text-tertiary text-sm">Continuar Lendo</span>
        </label>
      </label>
    </div>
  );
}
