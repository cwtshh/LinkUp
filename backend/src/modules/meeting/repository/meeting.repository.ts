import { Repository } from "typeorm";
import { Meeting } from "../model/meeting.entity";

export class MeetingRepository {
  constructor(private repository: Repository<Meeting>) {
    this.repository = repository;
  }

  async createMeeting(
    code: string,
    host_id: string,
    password_protected: boolean,
    status: "scheduled" | "active" | "ended",
    password?: string,
    startsAt?: Date,
    endsAt?: Date
  ): Promise<Meeting> {
    const meeting = this.repository.create({
      code,
      host: { id: host_id },
      password_protected,
      password,
      startsAt,
      endsAt,
      status: status,
    });

    return this.repository.save(meeting);
  }

  async getMeetByCode(code: string): Promise<Meeting | null> {
    return this.repository.findOne({ where: { code } });
  }
}
