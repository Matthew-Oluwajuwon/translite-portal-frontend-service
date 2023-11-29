/* eslint-disable prettier/prettier */

const useAmountFormat = () => {
  const numberWithCommas = (x: any) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  };

  return { numberWithCommas }
};

export default useAmountFormat
