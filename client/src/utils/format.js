import dayjs from "dayjs";

export const formatCurrency = (value = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export const formatDateTime = (value) =>
  value ? dayjs(value).format("YYYY-MM-DD HH:mm") : "--";

export const formatDate = (value) =>
  value ? dayjs(value).format("YYYY-MM-DD") : "--";
