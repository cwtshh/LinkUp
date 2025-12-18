import Fastify from "fastify";
import env from "./config/env";
import Database from "./config/database/Databse";
import { router } from "./routes/router";
import cors from "@fastify/cors";
import jwt from "./config/jwt/jwt";
import cookie from "@fastify/cookie";

export const app = Fastify({ logger: true });

app.register(env);
app.register(Database);
app.register(cookie, {
  secret: process.env.COOKIE_SECRET || "segredinho", // for cookies signature
  parseOptions: {}, // options for parsing cookies
});
app.register(cors, {
  origin: ["http://localhost:5173", "https://meuapp.com"], // frontends permitidos
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // permite cookies
});
app.register(jwt);
app.register(router);
