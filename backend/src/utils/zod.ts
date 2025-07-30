import { z } from 'zod';

export const optionalNullable = <T extends z.ZodTypeAny>(schema: T) =>
  schema.optional().transform((val) => val ?? null);
