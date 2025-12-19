import { MeetingRepository } from "../repository/meeting.repository";

export class MeetingService {
  constructor(private meetingRepository: MeetingRepository) {}

  async createMeeting(data: {
    code: string;
    host_id: string;
    password_protected: boolean;
    status: "scheduled" | "active" | "ended";
    password?: string;
    startsAt?: Date;
    endsAt?: Date;
  }) {
    const {
      code,
      host_id,
      password_protected,
      status,
      password,
      startsAt,
      endsAt,
    } = data;

    if (!code || !host_id) {
      throw new Error("Code and Host ID are required.");
    }

    return this.meetingRepository.createMeeting(
      code,
      host_id,
      password_protected,
      status,
      password,
      startsAt,
      endsAt
    );
  }

  async getMeetingByCode(code: string) {
    if (!code) {
      throw new Error("Code is required.");
    }

    return this.meetingRepository.getMeetByCode(code);
  }
}
