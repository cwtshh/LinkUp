import "fastify";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      NODE_ENV: string;
      PORT: number;
      DB_URL: string;
    };
    dataSource: import("typeorm").DataSource;
    authenticate: any;
  }
}
