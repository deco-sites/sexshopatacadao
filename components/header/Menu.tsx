import Icon from "$store/components/ui/Icon.tsx";
import { type SiteNavigationElement } from "$store/components/header/Header.tsx";
import { clsx } from "deco-sites/sexshopatacadao/sdk/clx.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { UserData } from "$store/islands/Header/UserData.tsx";

export interface Props {
  items: SiteNavigationElement[];
}

function MenuItem(
  { item, fistLevel }: { item: SiteNavigationElement; fistLevel?: boolean },
) {
  const hasChildren = Boolean(item.children?.length);

  const titleContent = (
    <div
      data-highlighted={item.highlighted}
      class={clsx(
        "p-0 flex items-center h-[60px] data-[highlighted]:font-bold data-[highlighted]:text-primary-500",
        hasChildren && "collapse-title",
        fistLevel && "text-[#3f3f40]",
      )}
    >
      <span>{item.name}</span>
      {hasChildren && (
        <Icon
          id="AngleUp"
          size={14}
          strokeWidth={1}
          class="rotate-180 transition-transform custom-collapse-arrow ml-auto"
        />
      )}
    </div>
  );

  return (
    <div
      class={clsx(
        "custom-collapse px-3 w-full font-montserrat group",
        hasChildren && "collapse",
      )}
    >
      {hasChildren && <input type="checkbox" />}
      {hasChildren ? titleContent : (
        <a
          href={item.url}
        >
          {titleContent}
        </a>
      )}
      {hasChildren && (
        <div class="collapse-content px-0">
          <ul>
            {item.children?.map((node) => (
              <li>
                <MenuItem item={node} />
              </li>
            ))}
            <li>
              <a
                href={item.url}
                class="flex items-center h-[60px] font-bold px-3 text-[#3f3f40]"
              >
                Ver Todos
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

function Menu({ items }: Props) {
  const { displayMenu } = useUI();

  return (
    <div class="overflow-y-auto">
      <div class="flex flex-col h-max">
        <button
          type="button"
          class="absolute left-full top-0 m-3 text-white rounded-full"
          onClick={() => displayMenu.value = false}
        >
          <Icon id="XFilled" size={24} strokeWidth={0} />
        </button>
        <UserData class="px-3" />
        {
          /* <a
          class="flex items-center gap-4 h-[55px] px-3 w-full"
          href="/login"
          aria-label="Log in"
        >
          <Icon
            id="User"
            size={20}
            strokeWidth={0}
            class="text-primary-500"
          />
          <span class="block uppercase text-xs font-bold">
            Faça Login | Cadastre-se
          </span>
        </a> */
        }
        <a
          class="flex items-center gap-4 h-[55px] px-3 w-full text-primary-500 border-b border-t border-danger-500"
          href="/account#/orders"
          aria-label="Meus Pedidos"
        >
          <Icon
            id="ShoppingCart"
            size={20}
            strokeWidth={0}
          />
          <span class="block font-bold font-montserrat">
            Meus Pedidos
          </span>
        </a>
        <ul class="flex-grow flex flex-col">
          {items.map((item) => (
            <li>
              <MenuItem item={item} fistLevel />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Menu;
