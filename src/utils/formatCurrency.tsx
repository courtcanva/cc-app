const formatCurrency = (price: string | number) => {
  const currency = Number(price).toLocaleString(undefined, {
    style: "currency",
    currency: "AUD",
  });
  return currency;
};

export default formatCurrency;
