export const validatePercentage = (value: string) => {
  const pattern = /^\d{0,2}$/;
  return pattern.test(value);
};

export const validateDecimal = (value: string) => {
  const pattern = /^\d*(\.\d{0,2})?$/;
  return pattern.test(value);
};
