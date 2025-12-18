import { DataSource } from "typeorm";
import { User } from "../../modules/user/model/user.entity";

export const createDataSource = (db_url: string): DataSource => {
  if (!db_url) {
    throw new Error("Database URL is not defined");
  }

  return new DataSource({
    type: "postgres",
    url: db_url,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
  });
};
