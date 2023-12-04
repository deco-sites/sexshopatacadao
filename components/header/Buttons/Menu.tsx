import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export default function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <div class="flex-1 lg:flex-none">
      <Button
        class="bg-transparent hover:bg-transparent !border-transparent !outline-none text-primary-500"
        aria-label="open menu"
        onClick={() => {
          displayMenu.value = true;
        }}
      >
        <Icon id="Bars3" size={20} strokeWidth={0} />
      </Button>
    </div>
  );
}
