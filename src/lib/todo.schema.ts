import { z } from 'zod';

const todoSchema = z.object({
  title: z
    .string()
    .nonempty({ message: 'This is required' })
    .min(4, { message: 'At least 4 characters are needed' }),
  description: z.string().nonempty({ message: 'This is required' }),
  deadline: z
    .union([z.string().nonempty(), z.literal(''), z.date()])
    .transform((val) => (val === '' ? undefined : new Date(val)))
    .optional()
    .refine(
      (date) => {
        if (!date) return true;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      },
      { message: 'Deadline cannot be in the past' },
    ),
  priority: z.string().nonempty(),
});

export { todoSchema };
