import { FastifyInstance } from "fastify";
import { UserRepository } from "../../modules/user/repository/user.repository";
import { User } from "../../modules/user/model/user.entity";
import { UserService } from "../../modules/user/service/user.service";
import { getLang } from "../../utils/translation/getLang";
import { getMessage } from "../../utils/translation/getMessage";

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
}
