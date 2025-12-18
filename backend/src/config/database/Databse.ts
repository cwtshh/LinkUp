import fp from "fastify-plugin";
import { createDataSource } from "./DataSource";

export default fp(async (app) => {
  const dataSource = createDataSource(app.config.DB_URL);

  await dataSource.initialize();

  app.decorate("dataSource", dataSource);
});
