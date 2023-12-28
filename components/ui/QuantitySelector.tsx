import Button from "../ui/Button.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
}

const QUANTITY_MAX_VALUE = 100;

function QuantitySelector({ onChange, quantity, disabled, loading }: Props) {
  const decrement = () => onChange?.(Math.max(0, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  return (
    <div class="border border-gray-400 rounded-[5px] flex h-[45px]">
      <Button
        class="w-[42px] sm:w-[49px] h-[43px] min-h-[unset] border-r rounded-[5px] border-gray-400 bg-white text-3xl flex items-center justify-center text-[#361328] hover:bg-primary-500 hover:text-white font-normal"
        onClick={decrement}
        disabled={disabled}
        loading={loading}
      >
        -
      </Button>
      <input
        class="input text-center min-h-[unset] w-[42px] sm:w-[49px] h-[43px] !outline-none p-0 [appearance:textfield] text-sm"
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
        class="w-[42px] sm:w-[49px] h-[43px] min-h-[unset] border-l rounded-[5px] border-gray-400 bg-white text-3xl flex items-center justify-center text-[#361328] hover:bg-primary-500 hover:text-white font-normal"
        onClick={increment}
        disabled={disabled}
        loading={loading}
      >
        +
      </Button>
    </div>
  );
}

export default QuantitySelector;
