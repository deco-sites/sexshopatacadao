import { Section } from "deco/blocks/section.ts";
import { renderSection } from "apps/website/pages/Page.tsx";
import type { BreadcrumbList } from "apps/commerce/types.ts";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";

export interface Props {
  /**
   * @title Nome da Pagina
   */
  pageName: string;
  Menu: Section;
  contentSections?: Section[];
}

export default function Institutional(
  { Menu, contentSections = [], pageName }: Props,
) {
  const itemListElement = [
    {
      "@type": "ListItem",
      name: pageName,
      item: "#",
      position: 1,
    },
  ] as BreadcrumbList["itemListElement"];

  return (
    <>
      {/* <Breadcrumb /> */}
      <Breadcrumb itemListElement={itemListElement} applyPadding={false} />
      <div class="flex flex-col lg:flex-row max-w-[96rem] mx-auto pb-32">
        <aside class="w-full lg:w-[30%] ">
          {renderSection(Menu)}
        </aside>
        <div class="flex flex-col w-full lg:max-w-[70%] px-4 lg:px-0 mt-8 lg:mt-0">
          {contentSections.map(renderSection)}
        </div>
      </div>
    </>
  );
}
