
const priceFormat = (tilePrice: number, deliveryPrice: number, installPrice: number ) => {
  let totalPrice = (tilePrice + deliveryPrice + installPrice).toFixed(2);
  let decimal = totalPrice.indexOf('.');
  if (decimal < 0) { 
    decimal = totalPrice.length; 
    totalPrice += '.'; 
  }
  while (totalPrice.length <= decimal + 2) { 
    totalPrice += '0'; 
  } 

  return totalPrice;
}

export default priceFormat;