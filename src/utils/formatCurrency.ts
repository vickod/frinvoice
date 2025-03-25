type formatProps = {
    amount: number;
    // currency: "EUR" | "USD" | "RUB";
    currency: "EUR";
  };
  
  export function formatCurrency({ amount, currency }: formatProps) {
    return new Intl.NumberFormat("fr-BE", {
      style: "currency",
      currency: currency,
    }).format(amount);
  }
  