import { Router } from "express";
import CarritoRouterExpressInterface from "../../../domain/interfaces/CarritoRouterExpressInterface";
import CarritoControllerExpressInterface from "../../../domain/interfaces/CarritoControllerExpressInterface";

export default class CarritoRouterExpress implements CarritoRouterExpressInterface {
    router: Router;
    path: string;

    constructor(private readonly carritoController: CarritoControllerExpressInterface) {
        this.router = Router();
        this.path = "/carrito";

        this.routes(); // 🔹 Llamamos al método routes() en el constructor
    }

    // ✅ Agregamos este método para definir las rutas correctamente
    public routes(): void {
        this.obtenerCarritoPorId();
        this.obtenerCarritoPorUsuario();
        this.crearCarrito();
        this.agregarItemAlCarrito();
        this.obtenerPrecioTotalCarrito();
        this.eliminarItemDeCarrito();
        this.eliminarCarrito();
    }

    public obtenerCarritoPorId(): void {
        this.router.get("/:id", this.carritoController.obtenerCarritoPorId.bind(this.carritoController));
    }

    public obtenerCarritoPorUsuario(): void {
        this.router.get("/usuario/:idUsuario", this.carritoController.obtenerCarritoPorUsuario.bind(this.carritoController));
    }

    public crearCarrito(): void {
        this.router.post("/", this.carritoController.crearCarrito.bind(this.carritoController));
    }

    public agregarItemAlCarrito(): void {
        this.router.post("/:id/items", this.carritoController.agregarItemAlCarrito.bind(this.carritoController));
    }

    public obtenerPrecioTotalCarrito(): void {
        this.router.get("/:id/total", this.carritoController.obtenerPrecioTotalCarrito.bind(this.carritoController));
    }

    public eliminarItemDeCarrito(): void {
        this.router.delete("/:id/items/:idProducto", this.carritoController.eliminarItemDeCarrito.bind(this.carritoController));
    }

    public eliminarCarrito(): void {
        this.router.delete("/:id", this.carritoController.eliminarCarrito.bind(this.carritoController));
    }
}
