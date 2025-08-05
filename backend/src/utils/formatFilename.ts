export const generateFilename = (type: string, id: number): string => {
   const random = Math.random().toString(36).substring(2, 8); 
   return `${type}-${id}-${Date.now()}-${random}`;
}
