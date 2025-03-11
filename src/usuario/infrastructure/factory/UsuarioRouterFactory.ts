import RouterExpressInterface from "../../../express/domain/RouterExpressInterface";
import UsuarioService from "../../application/service/UsuarioService";
import UsuarioUseCase from "../../application/usecase/UsuarioUseCase";
import UsuarioControllerExpress from "../express/controller/UsuarioControllerExpress";
import UsuarioRouterExpress from "../express/router/UsuarioRouterExpress";
import SQLUsuarioRepository from "../repository/sqlserver/SQLUsuarioRepository";
import DatabaseProvider from "../../../express/infrastructure/provider/DatabaseProvider";

export default class UsuarioRouterFactory {
  public static async create(): Promise<RouterExpressInterface> {
    const dbConnection = await DatabaseProvider.getConnection();
    const usuarioRepository = new SQLUsuarioRepository(dbConnection);
    const usuarioService = new UsuarioService(usuarioRepository);
    const usuarioUseCase = new UsuarioUseCase(usuarioService);
    const usuarioController = new UsuarioControllerExpress(usuarioUseCase);

    return new UsuarioRouterExpress(usuarioController);
  }
}
