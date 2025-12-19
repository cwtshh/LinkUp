import { FastifyInstance } from "fastify";
import { userRouter } from "./user/userRoutes";
import { meetingRouter } from "./meeting/meetingRoutes";

export async function router(app: FastifyInstance) {
  app.register(userRouter, { prefix: "/user" });
  app.register(meetingRouter, { prefix: "/meeting" });
}
