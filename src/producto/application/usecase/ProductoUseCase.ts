import ProductoUseCasePort from "../../domain/port/driver/ProductoUseCasePort";
import ProductoServiceInterface from "../../domain/interfaces/ProductoServiceInterface";
import Producto from "../../domain/producto/Producto";
import { ProductoInterface } from "../../domain/producto/AbstractProducto";

export default class ProductoUseCase implements ProductoUseCasePort {
    constructor(private readonly productoService: ProductoServiceInterface) { }

    public async obtenerProductos(): Promise<Producto[]> {
        return await this.productoService.obtenerProductos();
    }

    public async obtenerProductoPorId(id: number): Promise<Producto> {
        return await this.productoService.obtenerProductoPorId(id);
    }

    public async crearProducto(datosProducto: Partial<ProductoInterface>): Promise<Producto> {
        return await this.productoService.crearProducto(datosProducto);
    }

    public async actualizarProducto(id: number, datosActualizados: Partial<ProductoInterface>): Promise<Producto | boolean> {
        return await this.productoService.actualizarProducto(id, datosActualizados);
    }

    public async patchProducto(id: number, datosActualizados: Partial<ProductoInterface>): Promise<Producto | boolean> {
        return await this.productoService.patchProducto(id, datosActualizados);
    }

    public async eliminarProducto(id: number): Promise<boolean> {
        return await this.productoService.eliminarProducto(id);
    }

    // 🔹 Agregamos la función para obtener la imagen de un producto
    public async getImage(id: number): Promise<string> {
        const imagePath = await this.productoService.getImage(id) ?? "";        
        return imagePath;
    }
    
    
}
