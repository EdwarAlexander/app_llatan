import { DataTypes } from 'sequelize';
import connection from '../config/sequelize';

export default () => connection.define(
    "cliente",
    {
        idCliente: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "id"
        },
        nombreCliente: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: "nombre"
        },
        apellidoCliente: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: "apellido"
        },
        edadCliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "edad"
        },
        fechaNacCliente: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: "fecnac"
        }
    },
    {
        tableName: "cliente",
        timestamps: false
    }
);