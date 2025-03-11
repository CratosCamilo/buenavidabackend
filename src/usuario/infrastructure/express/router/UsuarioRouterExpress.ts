import { Router } from "express";
import UsuarioRouterExpressInterface from "../../../domain/interfaces/UsuarioRouterExpressInterface";
import UsuarioControllerExpressInterface from "../../../domain/interfaces/UsuarioControllerExpressInterface";

export default class UsuarioRouterExpress implements UsuarioRouterExpressInterface {
  router: Router;
  path: string;

  constructor(private readonly usuarioController: UsuarioControllerExpressInterface) {
    this.router = Router();
    this.path = "/usuarios";

    this.routes();
  }

  public routes = (): void => {
    this.getUsuarios();
    this.getUsuarioById();
    this.createUsuario();
    this.updateUsuario();
    this.patchUsuario();
    this.deleteUsuario();
  };

  public getUsuarios() {
    this.router.get("/", this.usuarioController.obtenerUsuarios.bind(this.usuarioController));
  }

  public getUsuarioById() {
    this.router.get("/:id", this.usuarioController.obtenerUsuarioPorId.bind(this.usuarioController));
  }

  public createUsuario() {
    this.router.post("/", this.usuarioController.crearUsuario.bind(this.usuarioController));
  }

  public updateUsuario() {
    this.router.put("/:id", this.usuarioController.actualizarUsuario.bind(this.usuarioController));
  }

  public patchUsuario() {
    this.router.patch("/:id", this.usuarioController.patchUsuario.bind(this.usuarioController));
  }

  public deleteUsuario() {
    this.router.delete("/:id", this.usuarioController.eliminarUsuario.bind(this.usuarioController));
  }
}
