import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  productID: string;
  quantity?: number;
}

function AddToCartButton(
  { seller, productID, eventParams, quantity = 1 }: Props,
) {
  const { addItems } = useCart();
  const onAddItem = () =>
    addItems({
      orderItems: [{
        id: productID,
        seller: seller,
        quantity,
      }],
    });

  return <Button onAddItem={onAddItem} eventParams={eventParams} />;
}

export default AddToCartButton;
