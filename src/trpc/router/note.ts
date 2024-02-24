import { TRPCClientError } from '@trpc/client';
import z from 'zod';

import { CreateNoteValidation } from '@/helpers/validators';
import db from '@/lib/db';

import { privateProcedure, router } from '../trpc';

export const noteRouter = router({
  getNotes: privateProcedure
    .input(
      z
        .object({
          params: z
            .object({
              sort: z.string().optional(),
            })
            .optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const data = await db.note.findMany({
        where: {
          userId: ctx.userId,
        },
        orderBy: {
          createdAt: input?.params?.sort as any,
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      return {
        notes: data,
        success: true,
      };
    }),
  deleteNote: privateProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      await db.note.delete({
        where: {
          id: input.id,
        },
      });

      return {
        success: true,
      };
    }),
  getSingle: privateProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const note = await db.note.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!note) throw new TRPCClientError('Note not found');
      return note;
    }),
  createNote: privateProcedure
    .input(CreateNoteValidation)
    .mutation(async ({ input, ctx }) => {
      const newNote = await db.note.create({
        data: {
          title: input.title,
          content: input.content,
          tags: input.tags,
          userId: ctx.user.id,
        },
      });
      return {
        success: true,
        note_id: newNote.id,
      };
    }),
});
