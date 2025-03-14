import ControllerExpressInterface from "../../../express/domain/ControllerExpressInterface";
import { Request, Response } from "express";

export default interface ProductoControllerExpressInterface
  extends ControllerExpressInterface {
  obtenerProductos(req: Request, res: Response): Promise<void>;
  obtenerProductoPorId(req: Request, res: Response): Promise<void>;
  crearProducto(req: Request, res: Response): Promise<void>;
  actualizarProducto(req: Request, res: Response): Promise<void>;
  patchProducto(req: Request, res: Response): Promise<void>;
  eliminarProducto(req: Request, res: Response): Promise<void>;
  getImage(req: Request, res: Response): Promise<void>; // 🔹 Nuevo método para obtener la imagen del producto
}
