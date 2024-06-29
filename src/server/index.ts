import { Login } from "@mui/icons-material";
import { router } from "./trpc";
import { loginRouter } from "./routers/login";
import { ResourcesRouter } from "./routers/resources";
import { partnersRouter } from "./routers/partners";
import { attentionsRouter } from "./routers/attentions";

export const appRouter = router({
    Login: loginRouter,
    resources: ResourcesRouter,
    partners: partnersRouter,
    attentions: attentionsRouter
});

export type AppRouter = typeof appRouter;