import { UsuarioInterface } from "../../usuario/AbstractUsuario";
import Usuario from "../../usuario/Usuario";

export default interface UsuarioUseCasePort {
  obtenerUsuarios(): Promise<Usuario[]>;
  obtenerUsuarioPorId(id: number): Promise<Usuario>;
  crearUsuario(datosUsuario: Partial<UsuarioInterface>): Promise<Usuario>;
  actualizarUsuario(id: number, datosActualizados: Partial<UsuarioInterface>): Promise<Usuario | boolean>;
  patchUsuario(id: number, datosActualizados: Partial<Usuario>): Promise<Usuario | boolean>;
  eliminarUsuario(id: number): Promise<boolean>;
}
