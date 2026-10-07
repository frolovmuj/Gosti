import { z } from 'zod';

export const CODE_LENGTH = 4;

export const phoneFormSchema = z.object({
  phone: z
    .string()
    .regex(
      /^\+7 \d{3} \d{3}-\d{2}-\d{2}$/,
      'Введите номер полностью: +7 999 123-45-67',
    ),
});

export type PhoneFormValues = z.infer<typeof phoneFormSchema>;

export const codeFormSchema = z.object({
  code: z
    .string()
    .regex(/^\d*$/, 'Код состоит только из цифр')
    .length(CODE_LENGTH, 'Введите код из SMS полностью'),
});

export type CodeFormValues = z.infer<typeof codeFormSchema>;
