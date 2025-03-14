import { Router } from "express";
import ProductoRouterExpressInterface from "../../../domain/interfaces/ProductoRouterExpressInterface";
import ProductoControllerExpressInterface from "../../../domain/interfaces/ProductoControllerExpressInterface";

export default class ProductoRouterExpress implements ProductoRouterExpressInterface {
    router: Router;
    path: string;

    constructor(private readonly productoController: ProductoControllerExpressInterface) {
        this.router = Router();
        this.path = "/productos";

        this.routes();
    }

    public routes = (): void => {
        this.obtenerProductos();
        this.obtenerProductoPorId();
        this.crearProducto();
        this.actualizarProducto();
        this.patchProducto();
        this.eliminarProducto();
        this.obtenerImagenProducto(); // 🔹 Nueva ruta para obtener la imagen del producto
    };

    public obtenerProductos() {
        this.router.get(
            "/",
            this.productoController.obtenerProductos.bind(this.productoController)
        );
    }

    public obtenerProductoPorId() {
        this.router.get(
            "/:id",
            this.productoController.obtenerProductoPorId.bind(this.productoController)
        );
    }

    public crearProducto() {
        this.router.post(
            "/",
            this.productoController.crearProducto.bind(this.productoController)
        );
    }

    public actualizarProducto() {
        this.router.put(
            "/:id",
            this.productoController.actualizarProducto.bind(this.productoController)
        );
    }

    public patchProducto() {
        this.router.patch(
            "/:id",
            this.productoController.patchProducto.bind(this.productoController)
        );
    }

    public eliminarProducto() {
        this.router.delete(
            "/:id",
            this.productoController.eliminarProducto.bind(this.productoController)
        );
    }

    public obtenerImagenProducto() {
        this.router.get(
            "/:id/imagen",
            this.productoController.getImage.bind(this.productoController) // 🔹 Nueva ruta para obtener la imagen
        );
    }
}
