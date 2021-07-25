import { createConnection } from "typeorm";
import { Clients } from "./entity/Clients";
import { Experts } from "./entity/Experts";
import { Feedback } from "./entity/Feedback";
import { Orders } from "./entity/Order";
import { Users } from "./entity/Users"

export class Database {
    async connect() {
        const connection = await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "admin",
            password: "admin",
            database: "test",
            entities: [
                Users,
                Orders,
                Experts,
                Feedback,
                Clients
            ],
            synchronize: true,
            logging: false
        })
        await connection.synchronize()
    }
}