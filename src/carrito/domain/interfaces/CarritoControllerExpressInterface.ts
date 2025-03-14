import ControllerExpressInterface from "../../../express/domain/ControllerExpressInterface";
import { Request, Response } from "express";

export default interface CarritoControllerExpressInterface
  extends ControllerExpressInterface {
  obtenerCarritoPorId(req: Request, res: Response): Promise<void>;
  obtenerCarritoPorUsuario(req: Request, res: Response): Promise<void>;
  crearCarrito(req: Request, res: Response): Promise<void>;
  agregarItemAlCarrito(req: Request, res: Response): Promise<void>;
  obtenerPrecioTotalCarrito(req: Request, res: Response): Promise<void>;
  eliminarItemDeCarrito(req: Request, res: Response): Promise<void>;
  eliminarCarrito(req: Request, res: Response): Promise<void>;
}
