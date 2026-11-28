const kwanza = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "AOA",
  maximumFractionDigits: 0,
});

const dateFormat = new Intl.DateTimeFormat("pt-PT", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const dateTimeFormat = new Intl.DateTimeFormat("pt-PT", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Africa/Luanda",
});

export const formatKwanza = (value: number) => kwanza.format(value);

/** Receive ("2026-12-12"). */
export const formatDate = (iso: string) =>
  dateFormat.format(new Date(`${iso}T00:00:00Z`));

/* Receive ISO ("2026-11-29T16:00:00Z") */
export const formatDateTime = (iso: string) =>
  dateTimeFormat.format(new Date(iso));

export const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
