import RepositoryInterface from "../../../../repository/domain/RepositoryInterface";
import Carrito from "../../carrito/Carrito";

export default interface SQLCarritoRepositoryPort
    extends RepositoryInterface<number, Carrito> {

    agregarItemAlCarrito(idCarrito: number, idProducto: number, cantidad: number): Promise<Carrito | boolean>;

    obtenerCarritoPorUsuario(idUsuario: number): Promise<Carrito>;

    obtenerTotalPrecioCarrito(idCarrito: number): Promise<number>;

    eliminarItemDeCarrito(idCarrito: number, idProducto: number): Promise<boolean>;

    eliminarCarrito(idCarrito: number): Promise<boolean>;
}
