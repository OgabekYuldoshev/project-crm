import { authRouter } from './router/auth';
import { router } from './trpc';

export const appRouter = router({
  auth: authRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;