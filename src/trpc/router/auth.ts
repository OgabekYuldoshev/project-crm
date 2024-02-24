import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { TRPCClientError } from '@trpc/client';
import { z } from 'zod';

import db from '@/lib/db';

import { privateProcedure, procedure, router } from '../trpc';

export const authRouter = router({
  getUsers: privateProcedure
    .input(
      z.object({
        params: z
          .object({
            q: z.nullable(z.string())
          })
          .optional()
      })
    )
    .query(async ({ input }) => {
      const users = await db.user.findMany({
        where: {
          email: {
            search: input.params?.q || undefined
          },
          firstName: {
            search: input.params?.q || undefined
          },
          lastName: {
            search: input.params?.q || undefined
          }
        }
      });

      return users;
    }),
  callback: procedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.email) {
      throw new TRPCClientError('UNAUTHORIZED');
    }

    const dbUser = await db.user.findFirst({
      where: {
        email: user.email
      }
    });

    if (!dbUser) {
      await db.user.create({
        data: {
          firstName: user.given_name,
          lastName: user.family_name,
          email: user.email,
          avatar: user.picture
        }
      });
    }

    return {
      success: true
    };
  })
});
