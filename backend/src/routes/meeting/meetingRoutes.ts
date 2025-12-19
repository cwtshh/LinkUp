import { FastifyInstance } from "fastify";
import { MeetingRepository } from "../../modules/meeting/repository/meeting.repository";
import { generateMeetingCode } from "../../utils/meeting/generateMeetingCode";
import { MeetingService } from "../../modules/meeting/service/meeting.service";

export async function meetingRouter(app: FastifyInstance) {
  const meetingRepo = new MeetingRepository(
    app.dataSource.getRepository("Meeting")
  );
  const meetingService = new MeetingService(meetingRepo);

  // TODO: deixar bilingue
  app.post(
    "/create",
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const { host_id, password_protected, password, startsAt, endsAt } =
        request.body as {
          host_id: string;
          password_protected: boolean;
          password?: string;
          startsAt?: Date;
          endsAt?: Date;
        };
      try {
        const generatedCode = generateMeetingCode();
        let status: "scheduled" | "active" | "ended";
        // considerar apenas o dia para definir se é agora ou agendado
        if (startsAt && new Date(startsAt).getDate() === new Date().getDate()) {
          status = "active";
        } else {
          status = "scheduled";
        }

        const meeting = await meetingRepo.createMeeting(
          generatedCode,
          host_id,
          password_protected,
          status,
          password,
          startsAt,
          endsAt
        );

        return reply.status(201).send({
          title: "Reunião criada com sucesso",
          meeting: meeting,
        });
      } catch (error) {
        return reply.status(400).send({
          title: "Falha ao criar reunião",
          message: (error as Error).message,
        });
      }
    }
  );

  app.get(
    "/:code",
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const { code } = request.params as { code: string };

      try {
        const meeting = await meetingService.getMeetingByCode(code);

        if (!meeting) {
          return reply.status(404).send({
            title: "Reunião não encontrada",
            message: `Nenhuma reunião encontrada com o código ${code}.`,
          });
        }

        return reply.status(200).send({
          title: "Reunião encontrada com sucesso",
          meeting: meeting,
        });
      } catch (error) {
        return reply.status(400).send({
          title: "Falha ao buscar reunião",
          message: (error as Error).message,
        });
      }
    }
  );
}
