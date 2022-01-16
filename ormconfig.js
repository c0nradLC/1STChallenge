module.exports = {
  name: "default",
  type: "mysql",
  host: "0.0.0.0",
  port: 3306,
  username: "root",
  password: "1stchallenge",
  database: process.env.TYPEORM_DATABASE,
  migrations: ["./src/database/migrations/*.ts"],
  entities: ["./src/modules/**/entities/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
};