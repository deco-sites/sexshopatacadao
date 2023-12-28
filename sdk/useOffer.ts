import type {
  AggregateOffer,
  UnitPriceSpecification,
} from "apps/commerce/types.ts";

const bestInstallment = (
  acc: UnitPriceSpecification | null,
  curr: UnitPriceSpecification,
) => {
  if (curr.priceComponentType !== "https://schema.org/Installment") {
    return acc;
  }

  if (!acc) {
    return curr;
  }

  if (acc.price > curr.price) {
    return curr;
  }

  if (acc.price < curr.price) {
    return acc;
  }

  if (
    acc.billingDuration && curr.billingDuration &&
    acc.billingDuration < curr.billingDuration
  ) {
    return curr;
  }

  return acc;
};

const parseInstallments = (
  installment: UnitPriceSpecification,
  sellingPrice: number,
) => {
  const { billingDuration, billingIncrement, price, name } = installment;

  if (!billingDuration || !billingIncrement) {
    return null;
  }

  const withTaxes = sellingPrice < price;

  return {
    billingDuration,
    billingIncrement,
    withTaxes,
    name,
  };
};

export const useOffer = (aggregateOffer?: AggregateOffer) => {
  const offer = aggregateOffer?.offers[0];
  const listPrice = offer?.priceSpecification.find((spec) =>
    spec.priceType === "https://schema.org/ListPrice"
  );
  const installment = offer?.priceSpecification.reduce(bestInstallment, null);
  const seller = offer?.seller;
  const price = offer?.price;
  const availability = offer?.availability;

  const parsedInstallments = (!!installment && !!price)
    ? parseInstallments(
      installment,
      price,
    )
    : null;

  return {
    price,
    listPrice: listPrice?.price,
    availability,
    seller,
    installments: parsedInstallments
      ? `${parsedInstallments.billingDuration}x de R$ ${parsedInstallments.billingIncrement} ${
        parsedInstallments.withTaxes ? "c/ juros" : "s/ juros"
      }`
      : null,
    installmentsData: parsedInstallments,
  };
};
