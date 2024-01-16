import { BreadcrumbListLoader } from "$store/loaders/breadcrumb.ts";

export interface Props {
  data: BreadcrumbListLoader;
}

export default function PLPTitle({ data }: Props) {
  const title = data.itemListElement.at(-1)?.name;

  return (
    <h1 class="w-full max-w-[96rem] mx-auto my-4 font-montserrat text-2xl !leading-[1.15] font-semibold px-2 md:px-[5vw] text-black">
      {title}
    </h1>
  );
}
