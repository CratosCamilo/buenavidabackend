import RouterExpressInterface from "../../../express/domain/RouterExpressInterface";
import ProductoService from "../../application/service/ProductoService";
import ProductoUseCase from "../../application/usecase/ProductoUseCase";
import ProductoControllerExpress from "../express/controller/ProductoControllerExpress";
import ProductoRouterExpress from "../express/router/ProductoRouterExpress";
import SQLProductoRepository from "../repository/sqlserver/SQLProductoRepository";
import DatabaseProvider from "../../../express/infrastructure/provider/DatabaseProvider";

export default class ProductoRouterFactory {
    public static async create(): Promise<RouterExpressInterface> {
        const dbConnection = await DatabaseProvider.getConnection();
        const productoRepository = new SQLProductoRepository(dbConnection);
        const productoService = new ProductoService(productoRepository);
        const productoUseCase = new ProductoUseCase(productoService);
        const productoController = new ProductoControllerExpress(productoUseCase);

        return new ProductoRouterExpress(productoController);
    }
}
