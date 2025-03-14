import CarritoServiceInterface from "../../domain/interfaces/CarritoServiceInterface";
import Carrito from "../../domain/carrito/Carrito";
import SQLCarritoRepositoryPort from "../../domain/port/driven/SQLCarritoRepositoryPort";
import ProductoService from "../../../producto/application/service/ProductoService";
import { CarritoInterface } from "../../domain/carrito/AbstractCarrito";

export default class CarritoService implements CarritoServiceInterface {
    constructor(
        private readonly carritoRepository: SQLCarritoRepositoryPort,
        private readonly productoService: ProductoService // ✅ Agregado correctamente
    ) {}

    public async obtenerCarritoPorId(id: number): Promise<Carrito> {
        return await this.carritoRepository.findById(id);
    }
    public async obtenerCarritoPorUsuario(idUsuario: number): Promise<Carrito> { // ✅ Agregado este método
        return await this.carritoRepository.obtenerCarritoPorUsuario(idUsuario);
    }

    public async crearCarrito(datosCarrito: Partial<CarritoInterface>): Promise<Carrito> {
        return await this.carritoRepository.save(Carrito.fromPartial(datosCarrito));
    }

    public async agregarItemAlCarrito(idCarrito: number, idProducto: number, cantidad: number): Promise<Carrito | boolean> {
        return await this.carritoRepository.agregarItemAlCarrito(idCarrito, idProducto, cantidad);
    }

    public async obtenerPrecioTotalCarrito(idCarrito: number): Promise<number> {
        return await this.carritoRepository.obtenerTotalPrecioCarrito(idCarrito);
    }

    public async eliminarItemDeCarrito(idCarrito: number, idProducto: number): Promise<boolean> {
        return await this.carritoRepository.eliminarItemDeCarrito(idCarrito, idProducto);
    }

    public async eliminarCarrito(idCarrito: number): Promise<boolean> {
        return await this.carritoRepository.eliminarCarrito(idCarrito);
    }
}
