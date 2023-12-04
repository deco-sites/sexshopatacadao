import Button from "../../ui/Button.tsx";
import Icon from "deco-sites/sexshopatacadao/components/ui/Icon.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
}

const QUANTITY_MAX_VALUE = 100;

function CartQuantitySelector(
  { onChange, quantity, disabled, loading }: Props,
) {
  const decrement = () => onChange?.(Math.max(0, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  return (
    <div class="join border rounded-none w-min mt-2">
      <Button
        class="join-item h-[28px] min-h-[unset] w-[28px] text-[#727273] p-0 flex items-center justify-center !bg-transparent !border-transparent !outline-none"
        onClick={decrement}
        disabled={disabled}
        loading={loading}
      >
        <Icon id="AngleUp" size={14} strokeWidth={1} class="rotate-180" />
      </Button>
      <input
        class="input text-center join-item [appearance:textfield] h-[28px] min-h-[unset] text-black text-xs"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        max={QUANTITY_MAX_VALUE}
        min={1}
        value={quantity}
        disabled={disabled}
        onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
        maxLength={3}
        size={3}
      />
      <Button
        class="join-item h-[28px] min-h-[unset] w-[28px] text-primary-500  p-0 flex items-center justify-center !bg-transparent  !border-transparent !outline-none"
        onClick={increment}
        disabled={disabled}
        loading={loading}
      >
        <Icon id="AngleUp" size={14} strokeWidth={1} />
      </Button>
    </div>
  );
}

export default CartQuantitySelector;
