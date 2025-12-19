// status de reuniao
export type MeetingStatus = "scheduled" | "active" | "ended";

export interface Meeting {
  code: string;
  host_id: string;
  password_protected: boolean;
  status: MeetingStatus;
  password?: string;
  startsAt?: Date;
  endsAt?: Date;
}
