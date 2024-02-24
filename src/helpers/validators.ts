import { z } from 'zod';

export const CreateNoteValidation = z.object({
  title: z.string().min(3),
  content: z.string().min(3),
  tags: z.string().array().min(1)
});

export type TCreateNoteValidation = z.infer<typeof CreateNoteValidation>;
