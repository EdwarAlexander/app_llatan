import { Router } from 'express';
import * as clienteController from '../controllers/cliente.controller';

const clienteRouter = Router();

clienteRouter.route("/clientes")
    .post(clienteController.saveCliente)
    .get(clienteController.listClienteAll);
clienteRouter.route("/clientes/kpi")
    .get(clienteController.listClientekpi);

export default clienteRouter;