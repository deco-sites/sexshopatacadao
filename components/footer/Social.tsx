import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import ImageOrIcon, {
  ImageOrIconType,
} from "$store/components/ui/ImageOrIcon.tsx";

/** @title {{ name }} */
export interface SocialItem {
  image: ImageOrIconType;
  name: string;
  link: string;
}

export default function Social(
  { items, title }: {
    title?: string;
    items?: SocialItem[];
  },
) {
  if (!items?.length) return null;

  return (
    <div class="flex flex-col items-center">
      {title && (
        <h3 class="text-lg font-lobster text-primary-500 mb-[26px]">{title}</h3>
      )}
      <ul class="flex gap-14">
        {items.map((item) => {
          return (
            <li>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.name} Logo`}
                class="flex"
              >
                <ImageOrIcon
                  {...item.image}
                  alt={item.name}
                  width={30}
                  height={30}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
