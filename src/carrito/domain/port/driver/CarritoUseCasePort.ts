import Carrito from "../../carrito/Carrito";
import AbstractProducto from "../../../../producto/domain/producto/AbstractProducto";
import { CarritoInterface } from "../../carrito/AbstractCarrito";

export default interface CarritoUseCasePort {
    obtenerCarritoPorId(id: number): Promise<Carrito>;
    obtenerCarritoPorUsuario(idUsuario: number): Promise<Carrito>;  // ✅ Se añade este método
    crearCarrito(datosCarrito: Partial<CarritoInterface>): Promise<Carrito>;
    agregarItemAlCarrito(idCarrito: number, idProducto: number, cantidad: number): Promise<Carrito | boolean>;
    obtenerPrecioTotalCarrito(idCarrito: number): Promise<number>;
    eliminarItemDeCarrito(idCarrito: number, idProducto: number): Promise<boolean>;
    eliminarCarrito(idCarrito: number): Promise<boolean>;
}
