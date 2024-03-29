import type { BreadcrumbList } from "apps/commerce/types.ts";
import { clsx } from "deco-sites/sexshopatacadao/sdk/clx.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];

  applyPadding?: boolean;
}

function Breadcrumb({ itemListElement = [], applyPadding = true }: Props) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];

  return (
    <div
      class={clsx(
        "w-full max-w-[96rem] mx-auto font-montserrat text-xs font-medium leading-[1.15]",
        applyPadding && "md:px-[5vw]",
      )}
    >
      <ul class="block p-[15px]">
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }, index, list) => (
            <li
              data-highlight={name === "Home"}
              class="data-[highlight='true']:text-primary-500 data-[highlight='true']:font-bold leading-[1.15] [&:first-child]:px-0 [&:not(:first-child)]:before:content-['/'] px-1 inline-block hover:text-primary-500"
            >
              {index == list.length - 1
                ? <span class="px-1 py-[2px]" href={item}>{name}</span>
                : <a class="px-1 py-[2px]" href={item}>{name}</a>}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Breadcrumb;
