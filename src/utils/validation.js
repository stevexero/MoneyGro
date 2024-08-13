export const validatePercentage = (value) => {
  const pattern = /^\d{0,2}$/;
  return pattern.test(value);
};

export const validateDecimal = (value) => {
  const pattern = /^\d*(\.\d{0,2})?$/;
  return pattern.test(value);
};
