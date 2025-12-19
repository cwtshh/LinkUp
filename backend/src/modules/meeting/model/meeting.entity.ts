import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/model/user.entity";

export type MeetingStatus = "scheduled" | "active" | "ended";

@Entity("meetings")
export class Meeting {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, length: 12 })
  code: string;

  @ManyToOne(() => User)
  host: User;

  @Column()
  status: MeetingStatus;

  @Column({ nullable: true })
  password?: string;

  @Column()
  password_protected: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", nullable: true })
  startsAt?: Date;

  @Column({ type: "timestamp", nullable: true })
  endsAt?: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;
}
