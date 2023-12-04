import { type SiteNavigationElement } from "$store/components/header/Header.tsx";
import Image from "apps/website/components/Image.tsx";
import { headerHeight } from "./constants.ts";

function NavItem({ item }: { item: SiteNavigationElement }) {
  const { url, name, children, highlighted } = item;
  const iconSrc = item?.icon;

  return (
    <li
      data-highlighted={highlighted ? "true" : undefined}
      class="navitem flex items-center group/navitem border-black"
    >
      <a href={url} class="flex flex-col items-center pb-5">
        <div class="w-[40px] max-h-[51px] group-data-[micro-header='true']/header:opacity-0 group-data-[micro-header='true']/header:max-h-0 transition-all">
          {iconSrc && (
            <img
              class="w-full h-[51px] object-cover group-hover/navitem:scale-[1.1] group-hover/navitem:rotate-[-5deg] group-data-[micro-header='true']/header:!scale-0 transition-all duration-500"
              src={iconSrc}
              alt={name}
              width={40}
              height={51}
              loading="eager"
            />
          )}
        </div>
        <span class="block text-center uppercase text-[13px] font-bold group-hover/navitem:text-primary-500 transition-colors h-8 leading-none">
          {name}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div class="absolute top-[calc(100%-16px)] w-full left-0 flex invisible opacity-0 group-hover/navitem:visible group-hover/navitem:opacity-100 transition-all duration-100 bg-white z-50 rounded-[6px] shadow-[0_2px_5px_rgba(0,0,0,.3)] py-5 px-10" // style={{ top: "0px", left: "0px", marginTop: headerHeight }}
          >
            <ul class="grid grid-cols-3 gap-3 w-full">
              {children.map((node) => (
                <li class="hover:text-primary-500 font-bold uppercase text-[13px]">
                  <a class="" href={node.url}>
                    <span>{node.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
