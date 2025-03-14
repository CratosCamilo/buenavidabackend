import ProductoServiceInterface from "../../domain/interfaces/ProductoServiceInterface";
import Producto from "../../domain/producto/Producto";
import SQLProductoRepositoryPort from "../../domain/port/driven/SQLProductoRepositoryPort";
import { ProductoInterface } from "../../domain/producto/AbstractProducto";
import path from "path";
import fs from "fs";

export default class ProductoService implements ProductoServiceInterface {
    constructor(private readonly productoRepository: SQLProductoRepositoryPort) { }

    public async obtenerProductos(): Promise<Producto[]> {
        const productos = await this.productoRepository.findAll();
        return productos.length ? productos : [];
    }

    public async obtenerProductoPorId(id: number): Promise<Producto> {
        return await this.productoRepository.findById(id);
    }

    public async crearProducto(datosProducto: Partial<ProductoInterface>): Promise<Producto> {
        return await this.productoRepository.save(Producto.fromPartial(datosProducto));
    }

    public async actualizarProducto(id: number, datosActualizados: Partial<ProductoInterface>): Promise<Producto | boolean> {
        return await this.productoRepository.update(id, Producto.fromPartial(datosActualizados));
    }

    public async patchProducto(id: number, datosActualizados: Partial<ProductoInterface>): Promise<Producto | boolean> {
        return await this.productoRepository.patch(id, Producto.fromPartial(datosActualizados));
    }

    public async eliminarProducto(id: number): Promise<boolean> {
        return await this.productoRepository.delete(id);
    }

    public async getImage(id: number): Promise<string> {  
        const imagePath = path.join(__dirname, "../../../../uploads", `${id}.jpg`);    
        return fs.existsSync(imagePath) ? imagePath : ""; 
    }

}
