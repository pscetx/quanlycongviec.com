export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'vi-VN',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric" as const,
    month: "long" as const,
    day: "numeric" as const,
    hour: "numeric" as const,
    minute: "numeric" as const,
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const formatDateToLocalNoHour = (
  dateStr: string,
  locale: string = 'vi-VN',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric" as const,
    month: "long" as const,
    day: "numeric" as const,
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
