import { Request, Response } from "express";
import ProductoControllerExpressInterface from "../../../domain/interfaces/ProductoControllerExpressInterface";
import ProductoUseCasePort from "../../../domain/port/driver/ProductoUseCasePort";
import path from "path";

export default class ProductoControllerExpress implements ProductoControllerExpressInterface {
    constructor(private readonly productoUseCase: ProductoUseCasePort) { }

    public async obtenerProductos(_req: Request, res: Response): Promise<void> {
        const productos = await this.productoUseCase.obtenerProductos();

        if (!productos || productos.length === 0) {
            res.status(404).json({ message: "Productos no encontrados" });
            return;
        }

        res.status(200).json({ productos });
    }

    public async obtenerProductoPorId(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const producto = await this.productoUseCase.obtenerProductoPorId(Number(id));

        if (producto.isNull()) {
            res.status(404).json({ message: "Producto no encontrado" });
            return;
        }

        res.status(200).json(producto);
    }

    public async crearProducto(req: Request, res: Response): Promise<void> {
        const nuevoProducto = await this.productoUseCase.crearProducto(req.body);

        if (!nuevoProducto) {
            res.status(400).json({ message: "No se pudo crear el producto" });
            return;
        }

        res.status(201).json(nuevoProducto);
    }

    public async actualizarProducto(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const productoActualizado = await this.productoUseCase.actualizarProducto(
            Number(id),
            req.body
        );

        if (!productoActualizado) {
            res.status(400).json({ message: "No se pudo actualizar el producto" });
            return;
        }

        res.status(200).json(productoActualizado);
    }

    public async patchProducto(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const productoActualizado = await this.productoUseCase.patchProducto(
            Number(id),
            req.body
        );

        if (!productoActualizado) {
            res.status(400).json({ message: "No se pudo actualizar parcialmente el producto" });
            return;
        }

        res.status(200).json(productoActualizado);
    }

    public async eliminarProducto(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const eliminado = await this.productoUseCase.eliminarProducto(Number(id));

        if (!eliminado) {
            res.status(400).json({ message: "No se pudo eliminar el producto" });
            return;
        }

        res.status(200).json({ message: "Producto eliminado exitosamente" });
    }

    public async getImage(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const imagePath = await this.productoUseCase.getImage(Number(id));

        if (!imagePath) {
            res.status(404).send({ error: "Imagen no encontrada" });
            return;
        }

        const absolutePath = path.resolve(imagePath);

        res.sendFile(absolutePath);
    }



}
