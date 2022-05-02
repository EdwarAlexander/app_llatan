import express, { Express, json } from 'express';
import connection from './sequelize';
import cors from 'cors';
import swagger from 'swagger-ui-express';
import clienteRouter from '../routes/cliente.route';
import documentacion from "../docs/swagger.json";


const port_server = Number(process.env.PORT_SERVER);

export default class Server {
    private readonly app: Express;
    private readonly port: number;

    constructor() {
        this.app = express();
        this.port = port_server;
        this.app.use(cors());
        this.bodyParser();
        this.router();
    }

    private bodyParser() {
        this.app.use(json());
    }

    private router() {
        this.app.use(clienteRouter);

        //documentacion de la api
        if (process.env.NODE_ENV === "production") {
            documentacion.host = "";
            documentacion.schemes = ["https"];
        } else {
            documentacion.host = `127.0.0.1:${this.port}`;
            documentacion.schemes = ["http"];
        }
        this.app.use("/docs", swagger.serve, swagger.setup(documentacion));
    }

    start() {
        this.app.listen(this.port, async () => {
            console.log(`Server Online port:${this.port}`);
            await connection.sync();
            console.log(`Connect data base`);
        });
    }
}