import fastifyEnv from "@fastify/env";
import fp from "fastify-plugin";

export default fp(async (app) => {
  await app.register(fastifyEnv, {
    dotenv: true,
    schema: {
      type: "object",
      required: ["API_PORT", "DB_URL"],
      properties: {
        API_PORT: { type: "number", default: 3004 },
        DB_URL: { type: "string" },
      },
    },
  });
});
