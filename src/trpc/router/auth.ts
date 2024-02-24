import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { TRPCClientError } from '@trpc/client';

import db from '@/lib/db';

import { procedure, router } from '../trpc';

export const authRouter = router({
  callback: procedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.email) {
      throw new TRPCClientError('UNAUTHORIZED');
    }

    const dbUser = await db.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (!dbUser) {
      await db.user.create({
        data: {
          firstName: user.given_name,
          lastName: user.family_name,
          email: user.email,
          avatar: user.picture,
        },
      });
    }

    return {
      success: true,
    };
  }),
});
