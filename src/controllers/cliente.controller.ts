import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { Cliente } from '../config/models';
import { clienteDto } from '../dto/request/cliente.dto';
import connection from '../config/sequelize';


const saveCliente = async (req: Request, res: Response) => {
    try {
        const request = req.body;
        const validator = plainToClass(clienteDto, request);
        const errors = await validate(validator);
        if (errors.length !== 0) {
            const information_errors = errors.map((error) => error.constraints);
            return res.status(400).json({
                content: information_errors,
                message: "error creating concepto"
            });
        }
        const newCliente = await Cliente.create(request);
        return res.status(201).json({
            content: newCliente,
            message: "cliente creado"
        });
    } catch (error) {
        return res.status(500).json({
            content: null,
            message: "error creacion de cliente"
        });
    }
}

const listClienteAll = async (req: Request, res: Response) => {
    try {
        const cliente = await Cliente.findAll({
            order: [
                ["nombreCliente", "asc"]
            ]
        });
        return res.status(200).json({
            content: cliente,
            message: "lista cliente"
        });
    } catch (error) {
        return res.status(500).json({
            content: null,
            message: "error lista cliente"
        });
    }
}

const listClientekpi = async (req: Request, res: Response) => {
    try {
        //metodo para obtener el promedio de todos los registros
        const clientePromedio: any = await Cliente.findAll({
            attributes: [
                [connection.fn('avg', connection.col('edad')), 'prom'],
            ],
            raw: true
        });
        const promedio = clientePromedio[0]['prom'] === null ? 0 : Math.round(clientePromedio[0]['prom']);

        //metodo desviacion estandar
        let suma = 0;
        const edades: any = await Cliente.findAll({
            attributes: [
                'edad'
            ],
            raw: true
        });
        const cantArr = edades.length;
        for (let i = 0; i < cantArr; i++) {
            const edad = edades[i]['edad'];
            const item = Math.pow((edad - promedio), 2);
            suma += item;
        }
        const desvEstandar = Math.sqrt(suma / (cantArr - 1));
        //mostrar resultados
        return res.status(200).json({
            avg: promedio,
            desv: desvEstandar,
            message: "listakpi cliente"
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            content: null,
            message: "error listakpi cliente"
        });
    }
}

export {
    saveCliente,
    listClienteAll,
    listClientekpi
}