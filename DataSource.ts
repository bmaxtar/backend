import { DataSource } from "typeorm"
import { Todo } from "./Todo"

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: true,
  entities: [Todo],
})
