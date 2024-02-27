import { useUser } from "apps/vtex/hooks/useUser.ts";
import Icon from "deco-sites/sexshopatacadao/components/ui/Icon.tsx";

export const UserDataDesktop = () => {
  const { user } = useUser();
  const isLoggedIn = !!user.value?.email;

  return (
    <div class="flex-none items-center hidden lg:flex">
      <div class="flex items-center gap-2 group group-data-[micro-header='true']/header:justify-between group-data-[micro-header='true']/header:flex-col transition-all h-[48px] relative">
        <Icon
          id="User"
          size={20}
          strokeWidth={0}
          class="text-primary-500"
        />
        <a
          class="flex items-center "
          href="/login"
          aria-label="Log in"
        >
          <span class="block uppercase text-xs font-bold group-data-[micro-header='true']/header:hidden">
            {isLoggedIn ? `Olá, ${user.value?.email}` : (
              <>
                Faça Login | Cadastre-se
              </>
            )}
          </span>
          <span class="hidden text-xs group-data-[micro-header='true']/header:block leading-none">
            Entrar
          </span>
        </a>
        {isLoggedIn && (
          <>
            <div class="group-hover:flex hidden -translate-x-1/2 left-1/2 absolute  
              w-[2rem] h-[2rem] rotate-45 shadow-[4px_8px_8px_rgba(0,0,0,.25)] top-[34px]">
            </div>
            <ul class="group-hover:flex hidden -translate-x-1/2 left-1/2 top-full absolute bottom-[-20px] bg-white shadow-[4px_8px_8px_rgba(0,0,0,.25)] min-h-[170px] min-w-[300px] flex-col justify-center items-center z-50">
              <li>
                <a href="/account">Minha conta</a>
              </li>
              <li>
                <a href="/account#/orders">Meus pedidos</a>
              </li>
              <li>
                <a
                  class="block px-4 py-[10px] text-center text-danger"
                  href={`/api/vtexid/pub/logout?scope=atacadaosexyshop&returnUrl=${window.location?.href}`}
                >
                  Sair
                </a>
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
