import type { ImageWidget } from "apps/admin/widgets.ts";
import ImageOrIcon, {
  ImageOrIconType,
} from "$store/components/ui/ImageOrIcon.tsx";
import { SpreadAssignment } from "https://deno.land/x/ts_morph@17.0.1/mod.ts";
import Slider from "deco-sites/sexshopatacadao/components/ui/Slider.tsx";
import Icon from "deco-sites/sexshopatacadao/components/ui/Icon.tsx";
import SliderJS from "deco-sites/sexshopatacadao/islands/SliderJS.tsx";

/** @title {{ title }} {{ description }} */
interface Benefit {
  /** @title Image or Icon */
  icon: ImageOrIconType;
  /** @title Title */
  title: string;
  /** @title Description */
  description: string;
  /** @title Link */
  link?: string;
}

/** @title {{ text }} */
interface HelpItem {
  /** @title Image or Icon */
  icon: ImageOrIconType;
  /** @title Text */
  text: string;
  /** @title Link */
  link?: string;
}

export interface EditableProps {
  helpItems?: HelpItem[];

  /** @title Benefits */
  benefits?: Benefit[];
}

export interface Props extends EditableProps {
  isMobile: boolean;
}

const BenefitItem = ({ description, icon, title, link }: Benefit) => {
  const content = (
    <div class="flex gap-3 items-center justify-center">
      <ImageOrIcon
        icon={icon.icon}
        image={icon.image}
        width={25}
        height={30}
        loading="lazy"
        alt={`${title} ${description}`}
      />
      <div className="flex flex-col text-white text-[13px] leading-[12px]">
        <strong class="">
          {title}
        </strong>
        <span class="font-medium">
          {description}
        </span>
      </div>
    </div>
  );

  if (!link) {
    return content;
  }

  return (
    <a href={link} class="flex">
      {content}
    </a>
  );
};

const HelpItem = ({ icon, text, link }: HelpItem) => {
  const content = (
    <div class="flex gap-3 items-center h-10 border-b border-white group-last:border-transparent w-full">
      <ImageOrIcon
        icon={icon.icon}
        image={icon.image}
        width={21}
        height={21}
        loading="eager"
        alt={text}
      />
      <strong className="text-white text-xs">
        {text}
      </strong>
    </div>
  );

  if (!link) {
    return content;
  }

  return (
    <a href={link} class="flex">
      {content}
    </a>
  );
};

function Buttons() {
  return (
    <>
      <div class="flex items-center justify-center z-10 col-start-1 row-start-1">
        <Slider.PrevButton class="w-full h-full flex items-center justify-center">
          <Icon
            class="text-white"
            size={14}
            id="ChevronLeft"
            strokeWidth={0}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-1">
        <Slider.NextButton class="w-full h-full flex items-center justify-center">
          <Icon
            class="text-white"
            size={14}
            id="ChevronRight"
            strokeWidth={0}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

const HeaderBenefits = ({ helpItems, benefits, isMobile }: Props) => {
  return (
    <div class="grid group-data-[micro-header='true']/header:opacity-0 group-data-[micro-header='true']/header:invisible group-data-[micro-header='true']/header:grid-rows-[0fr] grid-rows-[1fr] transition-all font-montserrat">
      <div class="group-data-[micro-header='true']/header:overflow-hidden w-full bg-primary-500 flex items-center justify-center min-[1341px]:gap-12 max-[1340px]:gap-6">
        {isMobile
          ? (
            <div
              id="header-benefits"
              class="h-[50px] grid grid-cols-[36px_1fr_36px] grid-rows-1"
            >
              <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6">
                {benefits?.map((benefit, index) => {
                  return (
                    <Slider.Item
                      index={index}
                      class="carousel-item w-full justify-center items-center"
                    >
                      <BenefitItem {...benefit} />
                    </Slider.Item>
                  );
                })}
              </Slider>

              <Buttons />

              <SliderJS rootId="header-benefits" interval={5000} infinite />
            </div>
          )
          : (
            <>
              {!!helpItems?.length && (
                <div class="relative h-full text-white group bg-primary-600 transition-colors pl-3 pr-2">
                  <div class="flex items-center cursor-default">
                    <div class="flex flex-col uppercase">
                      <strong class="text-sm leading-none">Precisa</strong>
                      <span class="text-xs leading-none">
                        de <strong>ajuda</strong>
                      </span>
                    </div>
                    <strong class="text-4xl leading-none">?</strong>
                  </div>
                  <ul class="absolute z-20 bg-primary-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col left-0 top-full py-2 px-5 rounded-b-[10px] ">
                    {helpItems?.map((helpItem) => (
                      <li class="group">
                        <HelpItem {...helpItem} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <ul class="h-10 flex items-center gap-12 max-[1340px]:gap-6">
                {benefits?.map((benefit) => (
                  <li class="flex">
                    <BenefitItem {...benefit} />
                  </li>
                ))}
              </ul>
            </>
          )}
      </div>
    </div>
  );
};

export default HeaderBenefits;
