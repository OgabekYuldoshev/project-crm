import { authRouter } from './router/auth';
import { noteRouter } from './router/note';
import { router } from './trpc';

export const appRouter = router({
  auth: authRouter,
  note: noteRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
