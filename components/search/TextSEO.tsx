export default function TextSeo(
  { text }: { text: string },
) {
  const id = `text-seo`;
  const inputId = `text-seo-input`;

  return (
    <div class="max-w-[96rem] mx-auto px-2 md:px-[5vw]">
      <div class="border border-primary-500 pt-4 px-1 pb-7 md:px-5 rounded-[5px]">
        <input type={"checkbox"} class={"hidden peer"} id={inputId} />
        <div class="flex flex-col group">
          <div
            class={"grid grid-rows-[120px] peer-checked:group-[]:grid-rows-[1fr]"}
          >
            <div
              class="prose plp-seo overflow-hidden"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </div>

          <label
            htmlFor={inputId}
            class="self-center md:self-end mt-1"
          >
            <span class="text-gray-750 link leading-none after:content-['Ver_mais'] peer-checked:group-[]:after:content-['Ver_menos']">
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
