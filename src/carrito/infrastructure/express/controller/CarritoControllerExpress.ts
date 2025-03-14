import { Request, Response } from "express";
import CarritoControllerExpressInterface from "../../../domain/interfaces/CarritoControllerExpressInterface";
import CarritoUseCasePort from "../../../domain/port/driver/CarritoUseCasePort";

export default class CarritoControllerExpress implements CarritoControllerExpressInterface {
    constructor(private readonly carritoUseCase: CarritoUseCasePort) {}

    public async obtenerCarritoPorId(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const carrito = await this.carritoUseCase.obtenerCarritoPorId(Number(id));

        if (carrito.isNull()) {
            res.status(404).send({ message: "Carrito no encontrado" });
            return;
        }

        res.status(200).send(carrito);
    }

    public async obtenerCarritoPorUsuario(req: Request, res: Response): Promise<void> {
        const { idUsuario } = req.params;
        const carrito = await this.carritoUseCase.obtenerCarritoPorUsuario(Number(idUsuario));

        if (carrito.isNull()) {
            res.status(404).send({ message: "Carrito del usuario no encontrado" });
            return;
        }

        res.status(200).send(carrito);
    }

    public async crearCarrito(req: Request, res: Response): Promise<void> {
        
        const nuevoCarrito = await this.carritoUseCase.crearCarrito(req.body);

        if (!nuevoCarrito) {
            res.status(400).send({ message: "No se pudo crear el carrito" });
            return;
        }

        res.status(201).send(nuevoCarrito);
    }

    public async agregarItemAlCarrito(req: Request, res: Response): Promise<void> {
        const { idCarrito, idProducto, cantidad } = req.body;
        const resultado = await this.carritoUseCase.agregarItemAlCarrito(
            Number(idCarrito),
            Number(idProducto),
            Number(cantidad)
        );

        if (!resultado) {
            res.status(400).send({ message: "No se pudo agregar el producto al carrito" });
            return;
        }

        res.status(200).send(resultado);
    }

    public async obtenerPrecioTotalCarrito(req: Request, res: Response): Promise<void> {
        const { idCarrito } = req.params;
        const total = await this.carritoUseCase.obtenerPrecioTotalCarrito(Number(idCarrito));

        res.status(200).send({ total });
    }

    public async eliminarItemDeCarrito(req: Request, res: Response): Promise<void> {
        const { idCarrito, idProducto } = req.params;
        const resultado = await this.carritoUseCase.eliminarItemDeCarrito(
            Number(idCarrito),
            Number(idProducto)
        );

        if (!resultado) {
            res.status(400).send({ message: "No se pudo eliminar el producto del carrito" });
            return;
        }

        res.status(200).send({ message: "Producto eliminado del carrito" });
    }

    public async eliminarCarrito(req: Request, res: Response): Promise<void> {
        const { idCarrito } = req.params;
        const resultado = await this.carritoUseCase.eliminarCarrito(Number(idCarrito));

        if (!resultado) {
            res.status(400).send({ message: "No se pudo eliminar el carrito" });
            return;
        }

        res.status(200).send({ message: "Carrito eliminado exitosamente" });
    }
}
