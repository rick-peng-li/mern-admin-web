export const extractErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Request failed";
