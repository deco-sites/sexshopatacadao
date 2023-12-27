import type { BreadcrumbList } from "apps/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];

  return (
    <div class="w-full max-w-[96rem] mx-auto flex p-[15px] font-montserrat text-xs font-medium leading-[1.15]">
      <ul>
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }) => (
            <li
              data-highlight={name === "Home"}
              class="data-[highlight='true']:text-primary-500 data-[highlight='true']:font-bold leading-[1.15] px-1 py-[2px]"
            >
              <a href={item}>{name}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Breadcrumb;
