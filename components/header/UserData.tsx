import Icon from "$store/components/ui/Icon.tsx";
import { useUser } from "apps/vtex/hooks/useUser.ts";
import { clsx } from "deco-sites/sexshopatacadao/sdk/clx.ts";

export const UserData = ({ class: _class }: { class?: string }) => {
  const { user } = useUser();

  return (
    <div
      class={clsx(
        "flex-none items-center flex max-w-[192px]",
        _class,
      )}
    >
      <a
        class="flex items-center "
        href={user.value ? "/account" : "/login"}
        aria-label="Log in"
      >
        <div class="flex items-center gap-2 group-data-[micro-header='true']/header:justify-between group-data-[micro-header='true']/header:flex-col transition-all h-[48px]">
          <Icon
            id="User"
            size={20}
            strokeWidth={0}
            class="text-primary-500"
          />
          {user.value
            ? (
              <span class="block text-xs truncate font-bold">
                Olá, {user.value.givenName ?? user.value.email}
              </span>
            )
            : (
              <>
                <span class="block uppercase text-xs font-bold group-data-[micro-header='true']/header:hidden">
                  Faça Login | Cadastre-se
                </span>
                <span class="hidden text-xs group-data-[micro-header='true']/header:block leading-none">
                  Entrar
                </span>
              </>
            )}
        </div>
      </a>
    </div>
  );
};
