export const validatePercentage = (value: string) => {
  const pattern = /^\d{0,2}$/;
  return pattern.test(value);
};

export const validateDecimal = (value: string) => {
  const pattern = /^\d*(\.\d{0,2})?$/;
  return pattern.test(value);
};

export const validateUsername = (username: string): string | undefined => {
  if (!username) {
    return "Username is required";
  }
  const regex = /^[a-zA-Z0-9_]+$/;
  if (username.length < 4) {
    return "Username must be at least 4 characters long";
  }
  if (username.length > 14) {
    return "Username must be less than 15 characters long";
  }
  if (!regex.test(username)) {
    return "Username can only contain letters, numbers, and underscores";
  }
  return undefined;
}

export const validateSettingsName = (settingsName: string): string | undefined => {
  if (!settingsName) {
    return "Setting name is required";
  }
  if (settingsName.length < 4) {
    return "Setting name must be at least 4 characters long";
  }
  return undefined;
}
