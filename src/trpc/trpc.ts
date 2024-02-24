import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { initTRPC, TRPCError } from '@trpc/server';

import db from '@/lib/db';

const t = initTRPC.create();

const isAuth = t.middleware(async (opts) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.email) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  const dbUser = await db.user.findFirst({
    where: {
      email: user.email
    }
  });

  if (!dbUser) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return opts.next({
    ctx: {
      userId: dbUser.id,
      user: dbUser
    }
  });
});

export const router = t.router;
export const procedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
