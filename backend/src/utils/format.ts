export const generateFilename = (type: string, id?: string): string => {
  const random = Math.random().toString(36).substring(2, 8);
  return `${type}-${id}-${Date.now()}-${random}`;
};

export const formatDate = (date: Date): string => {
  return new Date(date).toISOString().split("T")[0];
};
