import CarritoUseCasePort from "../../domain/port/driver/CarritoUseCasePort";
import CarritoServiceInterface from "../../domain/interfaces/CarritoServiceInterface";
import Carrito from "../../domain/carrito/Carrito";
import AbstractProducto from "../../../producto/domain/producto/AbstractProducto";
import { CarritoInterface } from "../../domain/carrito/AbstractCarrito";

export default class CarritoUseCase implements CarritoUseCasePort {
    constructor(private readonly carritoService: CarritoServiceInterface) {}

    public async obtenerCarritoPorId(id: number): Promise<Carrito> {
        return await this.carritoService.obtenerCarritoPorId(id);
    }

    public async obtenerCarritoPorUsuario(idUsuario: number): Promise<Carrito> {
        return await this.carritoService.obtenerCarritoPorUsuario(idUsuario);
    }

    public async crearCarrito(datosCarrito: Partial<CarritoInterface>): Promise<Carrito> {
        return await this.carritoService.crearCarrito(datosCarrito);
    }

    public async agregarItemAlCarrito(idCarrito: number, idProducto: number, cantidad: number): Promise<Carrito | boolean> {
        return await this.carritoService.agregarItemAlCarrito(idCarrito, idProducto, cantidad);
    }
    

    public async obtenerPrecioTotalCarrito(idCarrito: number): Promise<number> {
        return await this.carritoService.obtenerPrecioTotalCarrito(idCarrito);
    }

    public async eliminarItemDeCarrito(idCarrito: number, idProducto: number): Promise<boolean> {
        return await this.carritoService.eliminarItemDeCarrito(idCarrito, idProducto);
    }

    public async eliminarCarrito(idCarrito: number): Promise<boolean> {
        return await this.carritoService.eliminarCarrito(idCarrito);
    }
}
