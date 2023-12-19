export interface Props {
  /** @format html */
  title: string;

  token?: string;
}

export default function Instafeed({ title }: Props) {
  return (
    <div class="flex flex-col gap-7 w-full">
      <div class="max-w-[1220px] flex gap-[10px] w-full items-center justify-between text-center mx-auto">
        <div
          class={`flex-1 max-w-[163px] h-1 bg-primary-500`}
        />
        <h2
          class={`bg-white relative text-3xl z-[1] text-primary-500 !leading-[1.15] uppercase`}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div
          class={`flex-1 max-w-[163px] h-1 bg-primary-500`}
        />
      </div>
      <div />
    </div>
  );
}
