import RouterExpressInterface from "../../../express/domain/RouterExpressInterface";
import CarritoService from "../../application/service/CarritoService";
import CarritoUseCase from "../../application/usecase/CarritoUseCase";
import CarritoControllerExpress from "../express/controller/CarritoControllerExpress";
import CarritoRouterExpress from "../express/router/CarritoRouterExpress";
import SQLCarritoRepository from "../repository/sqlserver/SQLCarritoRepository";
import SQLProductoRepository from "../../../producto/infrastructure/repository/sqlserver/SQLProductoRepository";
import DatabaseProvider from "../../../express/infrastructure/provider/DatabaseProvider";
import ProductoService from "../../../producto/application/service/ProductoService";

export default class CarritoRouterFactory {
    public static async create(): Promise<RouterExpressInterface> {
        const dbConnection = await DatabaseProvider.getConnection();

        // Instanciamos los repositorios
        const carritoRepository = new SQLCarritoRepository(dbConnection);
        const productoRepository = new SQLProductoRepository(dbConnection);

        // Instanciamos los servicios
        const productoService = new ProductoService(productoRepository);
        const carritoService = new CarritoService(carritoRepository, productoService);

        // Instanciamos el caso de uso
        const carritoUseCase = new CarritoUseCase(carritoService);

        // Instanciamos el controlador
        const carritoController = new CarritoControllerExpress(carritoUseCase);

        // Retornamos la ruta con el controlador
        return new CarritoRouterExpress(carritoController);
    }
}
