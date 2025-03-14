import ServerFactory from "./express/infrastructure/factory/ServerFactory";
import UsuarioRouterFactory from "./usuario/infrastructure/factory/UsuarioRouterFactory";
import ProductoRouterFactory from "./producto/infrastructure/factory/ProductoRouterFactory"; // ✅ Importar Producto
import CarritoRouterFactory from "./carrito/infrastructure/factory/CarritoRouterFactory";

async function startServer() {
    const usuarioRouter = await UsuarioRouterFactory.create();
    const productoRouter = await ProductoRouterFactory.create();
    const carritoRouter = await CarritoRouterFactory.create();
    const routers = [usuarioRouter, productoRouter, carritoRouter];

    const server = ServerFactory.create(routers);
    server.start();
}

startServer();
