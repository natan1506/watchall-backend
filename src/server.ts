import { app } from "./app";
import { env } from "./env";
import cors from "@fastify/cors";
import { userRoutes } from "./routes/user";
import { moviesRoutes } from "./routes/movies";

app.register(userRoutes);
app.register(moviesRoutes);

app.register(cors, {
  origin: env.NODE_ENV === "dev" ? env.NODE_ORIGIN : `${env.NODE_ORIGIN}/*`, // Permitir seu frontend específico
});

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.log(`🚀 Server Running! PORT: ${env.PORT} ${env.NODE_ORIGIN}`);
  });
