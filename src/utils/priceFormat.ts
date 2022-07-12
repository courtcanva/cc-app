const priceFormat = (price: number) => {
  let formatPrice = (price).toFixed(2);
  let decimal = formatPrice.indexOf(".");
  if (isNaN(price)) { 
    formatPrice = "0" 
} 
  if (decimal < 0) { 
    decimal = formatPrice.length; 
    formatPrice += "."; 
  }
  while (formatPrice.length <= decimal + 2) { 
    formatPrice += "0"; 
  } 

  return formatPrice;
}

export default priceFormat;
