const formatCurrency = (price: string) => {
  const currency = Number(price).toLocaleString(undefined, {
    style: "currency",
    currency: "AUD",
  });
  return currency;
};

export default formatCurrency;
