import { DataSource } from "typeorm"
import 'dotenv/config'
import "reflect-metadata"
import { User } from "./entities/user.entity"
import { Contact } from "./entities/contact.entity"
import { createTables1675962084997 } from './migrations/1675962084997-createTables'


const AppDataSource = new DataSource(
    process.env.NODE_ENV === "test" ?
    {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/*.ts"]
    } :
    {
      type: "postgres",
      host: process.env.HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      logging: true,
      synchronize: false,
      entities: [User, Contact],
      migrations: [createTables1675962084997]
    }
)

export default AppDataSource