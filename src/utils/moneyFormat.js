const moneyFormat = (string) => {
   const formater = new Intl.NumberFormat("en-US");
   return formater.format(string) + "₫";
};
export default moneyFormat;
