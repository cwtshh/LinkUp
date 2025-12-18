import { FastifyInstance } from "fastify";
import { UserRepository } from "../../modules/user/repository/user.repository";
import { User } from "../../modules/user/model/user.entity";
import { UserService } from "../../modules/user/service/user.service";
import { getLang } from "../../utils/translation/getLang";
import { getMessage } from "../../utils/translation/getMessage";
import { FastifyRequest, FastifyReply } from "fastify";

export async function userRouter(app: FastifyInstance) {
  const userRepo = new UserRepository(app.dataSource.getRepository(User));
  const userService = new UserService(userRepo);

  app.post("/register", async (request, reply) => {
    const lang = getLang(request);

    try {
      const user = await userService.registerUser(
        request.body as { name: string; email: string; password: string }
      );

      return reply.status(201).send({
        title: getMessage(lang, "userCreatedTitle"),
        message: getMessage(lang, "userCreated"),
      });
    } catch (error) {
      return reply.status(400).send({
        title: getMessage(lang, "userCreationFailedTitle"),
        message: (error as Error).message,
      });
    }
  });

  app.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
    const lang = getLang(request);
    const body = request.body as { email: string; password: string };

    try {
      const user = await userService.loginUser(body.email, body.password);

      const token = app.jwt.sign({ id: user.id, email: user.email });

      reply
        .setCookie("clickUpToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          signed: true,
        })
        .send({
          title: "Login Feito com Sucesso",
          description: "Você foi autenticado com sucesso.",
          user: user,
        });
    } catch (error) {
      return reply.status(400).send({
        title: getMessage(lang, "invalidCredentials"),
        message: (error as Error).message,
      });
    }
  });

  app.post(
    "/refresh",
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      try {
        const user_id = (request as any).user.id;
        console.log("Novo token gerado:", user_id);

        const user = await userService.refreshSession(user_id);

        // gera novo token
        const token = app.jwt.sign({ id: user.id, email: user.email });

        // atualiza o cookie com o novo token
        reply
          .setCookie("clickUpToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            signed: true,
          })
          .send({
            title: "Login Feito com Sucesso",
            description: "Você foi autenticado com sucesso.",
            user: user,
          });
      } catch (error) {
        return reply.status(400).send({
          title: "Session Refresh Failed",
          message: (error as Error).message,
        });
      }
    }
  );
}
