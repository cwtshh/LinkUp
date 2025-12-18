import { FastifyInstance } from "fastify";
import { userRouter } from "./user/userRoutes";

export async function router(app: FastifyInstance) {
  app.register(userRouter, { prefix: "/user" });
}
