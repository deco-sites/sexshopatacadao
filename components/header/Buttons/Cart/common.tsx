import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";

interface Props {
  loading: boolean;
  currency: string;
  total: number;
  items: AnalyticsItem[];
}

function CartButton({ loading, currency, total, items }: Props) {
  const { displayCart } = useUI();
  const totalItems = items.length;

  const onClick = () => {
    sendEvent({
      name: "view_cart",
      params: { currency, value: total, items },
    });
    displayCart.value = true;
  };

  return (
    <Button
      class="flex-none flex items-center gap-2 py-4 mr-4 lg:mr-0 group-data-[micro-header='true']/header:mr-0 lg:gap-6 !border-0 !border-transparent h-auto min-h-0 lg:bg-success-500 lg:hover:bg-success-600 group-data-[micro-header='true']/header:!bg-transparent lg:px-8 lg:pt-5 lg:pb-4 rounded-[6px] transition-all cursor-pointer flex-col lg:flex-row group-data-[micro-header='true']/header:flex-col group-data-[micro-header='true']/header:gap-2 group-data-[micro-header='true']/header:pb-3 bg-transparent hover:bg-transparent"
      aria-label="open cart"
      data-deco={displayCart.value && "open-cart"}
      // loading={loading}

      onClick={onClick}
    >
      <div class="indicator">
        <span
          class={`absolute rounded-full bg-primary-500 group-data-[micro-header='true']/header:bg-primary-500 lg:bg-[#3f3f40] -top-4 -right-5 select-none text-xs text-white w-5 h-5 leading-none flex items-center justify-center transition-colors font-montserrat font-normal`}
        >
          {totalItems > 9 ? "9+" : totalItems}
        </span>

        <Icon
          id="ShoppingCart"
          size={18}
          strokeWidth={0}
          class="text-primary-500 group-data-[micro-header='true']/header:text-primary-500 lg:text-white transition-colors"
        />
      </div>
      <span class="hidden lg:inline lg:uppercase text-white text-xs lg:text-sm group-data-[micro-header='true']/header:text-inherit group-data-[micro-header='true']/header:inline group-data-[micro-header='true']/header:normal-case lg:pb-1 select-none group-data-[micro-header='true']/header:text-xs font-normal transition-colors leading-none">
        Carrinho
      </span>
    </Button>
  );
}

export default CartButton;
