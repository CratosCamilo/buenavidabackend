import Producto from "../../producto/Producto";
import { ProductoInterface } from "../../producto/AbstractProducto";

export default interface ProductoUseCasePort {
    obtenerProductos(): Promise<Producto[]>;
    obtenerProductoPorId(id: number): Promise<Producto>;
    crearProducto(datosProducto: Partial<ProductoInterface>): Promise<Producto>;
    actualizarProducto(id: number, datosActualizados: Partial<ProductoInterface>): Promise<Producto | boolean>;
    patchProducto(id: number, datosActualizados: Partial<ProductoInterface>): Promise<Producto | boolean>;
    eliminarProducto(id: number): Promise<boolean>;
    getImage(id: number): Promise<string>;
}
