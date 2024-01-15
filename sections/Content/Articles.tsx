import { ImageWidget } from "apps/admin/widgets.ts";
import Header from "deco-sites/sexshopatacadao/components/ui/SectionHeader.tsx";
import Image from "apps/website/components/Image.tsx";
import Icon from "deco-sites/sexshopatacadao/components/ui/Icon.tsx";

/** @title {{ title }} */
export interface Article {
  image: ImageWidget;
  title: string;
  /** @format textarea */
  summary: string;
  href: string;
  linkLabel: string;
}

export interface Props {
  /** @format html */
  title: string;

  articles: Article[];
}

export default function Articles(props: Props) {
  const { articles, title } = props;

  return (
    <div class="flex flex-col max-w-[96rem] mx-auto">
      <Header title={title} />
      <div class="flex gap-10 lg:gap-6 w-full flex-col md:flex-row items-center px-2 my-3">
        {articles.map((article) => (
          <div class="flex flex-col flex-1 max-w-[500px] ">
            <a href={article.href} target="_blank" class="w-full">
              <Image
                class="w-full h-auto"
                src={article.image}
                alt={article.title}
                width={304}
                height={175}
              />
            </a>
            <a href={article.href} class="mt-6 mb-[1rem] block relative">
              <h3 class="text-[22px] leading-[1.15] h-20 uppercase line-clamp-3">
                {article.title}
              </h3>
              <div class="h-[1px] bg-black w-[103px] absolute left-0 -bottom-[14px]">
              </div>
            </a>
            <p class="block mt-4 mb-8 text-sm leading-normal h-[109px] font-light line-clamp-5">
              {article.summary}
            </p>
            <a
              href={article.href}
              target="_blank"
              class="flex items-center text-primary-500 text-sm font-bold gap-2"
            >
              <span>
                {article.linkLabel}
              </span>
              <Icon
                class="scale-x-150 scale-y-[2]"
                size={8}
                id="ChevronRight"
                strokeWidth={0}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
