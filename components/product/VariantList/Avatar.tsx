import Image from "apps/website/components/Image.tsx";
import Icon from "deco-sites/sexshopatacadao/components/ui/Icon.tsx";

function Avatar(
  { sku, img, label, url }: {
    sku: string;
    img: string;
    label: string;
    url?: string;
  },
) {
  const content = (
    <div
      class="flex flex-col items-center justify-center gap-3 group relative"
      data-variant-avatar
      data-variant-id={sku}
    >
      <div class="w-[84px] h-[84px] rounded-[5px] border-2 border-gray-400 group-data-[active='true']:border-success-400">
        <Image
          class="rounded-[5px]"
          width={80}
          height={80}
          loading="lazy"
          src={img}
          alt={label}
        />
      </div>
      <span class="text-xs leading-[131.19%] text-center text-gray-800 w-[84px]">
        {label}
      </span>
      <Icon
        id="Selected"
        size={18}
        class="hidden group-data-[active='true']:block absolute -top-[9px] left-[73px] z-[1] text-success-400"
      />
    </div>
  );

  if (url) {
    return (
      <a href={url}>
        {content}
      </a>
    );
  }

  return content;
}

export default Avatar;
