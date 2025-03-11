
import RepositoryInterface from "../../../../repository/domain/RepositoryInterface";
import Usuario from "../../usuario/Usuario";

export default interface SQLUsuarioRepositoryPort
  extends RepositoryInterface<number, Usuario> {}
