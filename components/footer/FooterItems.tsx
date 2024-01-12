import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import SectionTitle from "deco-sites/sexshopatacadao/components/footer/SectionTitle.tsx";
import { clsx } from "deco-sites/sexshopatacadao/sdk/clx.ts";

export type Item = { label: string; href: string };

export interface ListSection {
  readonly kind: "list";

  items?: Item[];
}

export interface TextSection {
  readonly kind: "text";

  /** @format html */
  text: string;
}

export type SectionContent = ListSection | TextSection;

/** @title {{title}} */
export interface FooterSection {
  title: string;

  /**
   * @title Tipo
   * @description Tipo de conteúdo
   */
  content: SectionContent;
}

export default function FooterItems(
  { sections, justify = false }: {
    sections: FooterSection[];
    justify: boolean;
  },
) {
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          <ul
            // class={`hidden md:flex flex-row gap-6 lg:gap-10 ${
            //   justify && "sm:justify-between"
            // }`}
            class={clsx(
              "hidden md:flex flex-row gap-6 lg:gap-10",
              justify && "sm:justify-between",
            )}
          >
            {sections.map(({ title, content }) => (
              <li>
                <div class="flex flex-col gap-4">
                  <SectionTitle>
                    {title}
                  </SectionTitle>
                  {content.kind === "list"
                    ? (
                      <ul class={`flex flex-col flex-wrap text-xs`}>
                        {content.items?.map((item) => (
                          <li>
                            <a
                              href={item.href}
                              class="block py-1 pt-1 pb-3 uppercase leading-[14px]"
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )
                    : (
                      <div
                        class="prose [&_p]:mb-4 leading-[25px] text-xs uppercase"
                        dangerouslySetInnerHTML={{ __html: content.text }}
                      />
                    )}
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile view */}
          <ul class="flex flex-col md:hidden">
            {sections.map(({ title, content }, index) => (
              <li>
                <div class="custom-collapse collapse">
                  <input
                    type="checkbox"
                    class="min-h-[0]"
                    checked={index == 0}
                  />
                  <div class="collapse-title min-h-[60px] !p-0 flex items-center">
                    <SectionTitle>{title}</SectionTitle>
                    <Icon
                      id="ChevronUp2"
                      size={16}
                      strokeWidth={0}
                      class="text-primary-500 rotate-180 transition-transform custom-collapse-arrow ml-auto"
                    />
                  </div>
                  <div class="collapse-content !p-0 uppercase">
                    {content.kind === "list"
                      ? (
                        <ul
                          class={`flex flex-col text-xs`}
                        >
                          {content.items?.map((item) => (
                            <li>
                              <a
                                href={item.href}
                                class="block py-1 pt-1 pb-3 leading-[14px]"
                              >
                                {item.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )
                      : (
                        <div
                          class="prose [&_p]:mb-4 leading-[25px] text-xs uppercase"
                          dangerouslySetInnerHTML={{ __html: content.text }}
                        />
                      )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
