import ControllerExpressInterface from "../../../express/domain/ControllerExpressInterface";
import { Request, Response } from "express";

export default interface UsuarioControllerExpressInterface extends ControllerExpressInterface {
  obtenerUsuarios(req: Request, res: Response): Promise<void>;
  obtenerUsuarioPorId(req: Request, res: Response): Promise<void>;
  crearUsuario(req: Request, res: Response): Promise<void>;
  actualizarUsuario(req: Request, res: Response): Promise<void>;
  patchUsuario(req: Request, res: Response): Promise<void>;
  eliminarUsuario(req: Request, res: Response): Promise<void>;
}
