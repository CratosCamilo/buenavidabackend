import RepositoryInterface from "../../../../repository/domain/RepositoryInterface";
import Producto from "../../producto/Producto";

export default interface SQLProductoRepositoryPort
  extends RepositoryInterface<number, Producto> {}
