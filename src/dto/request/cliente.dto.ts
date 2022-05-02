import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class clienteDto{

    @IsString()
    @IsNotEmpty()
    nombreCliente: string;

    @IsString()
    @IsNotEmpty()
    apellidoCliente: string;

    @IsNumber()
    edadCliente: number;

    @IsDateString()
    fechaNacCliente: Date;
}