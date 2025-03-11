import ServerFactory from "./express/infrastructure/factory/ServerFactory";
import UsuarioRouterFactory from "./usuario/infrastructure/factory/UsuarioRouterFactory";

const startApp = async () => {
  const usuarioRouter = await UsuarioRouterFactory.create();
  const routers = [usuarioRouter];

  const server = ServerFactory.create(routers);
  server.start();
};

startApp();
