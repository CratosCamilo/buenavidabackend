import UsuarioUseCasePort from "../../domain/port/driver/UsuarioUseCasePort";
import Usuario from "../../domain/usuario/Usuario";
import UsuarioServiceInterface from "../../domain/interfaces/UsuarioServiceInterface";
import { UsuarioInterface } from "../../domain/usuario/AbstractUsuario";

export default class UsuarioUseCase implements UsuarioUseCasePort {
  constructor(private readonly usuarioService: UsuarioServiceInterface) {}

  async obtenerUsuarios(): Promise<Usuario[]> {
    return await this.usuarioService.obtenerUsuarios();
  }

  async obtenerUsuarioPorId(id: number): Promise<Usuario> {
    return await this.usuarioService.obtenerUsuarioPorId(id);
  }

  async crearUsuario(datosUsuario: Partial<UsuarioInterface>): Promise<Usuario> {

    return await this.usuarioService.crearUsuario(datosUsuario);
  }

  async actualizarUsuario(id: number, datosActualizados: Partial<UsuarioInterface>): Promise<Usuario | boolean> {
    return await this.usuarioService.actualizarUsuario(id, datosActualizados);
  }

  async patchUsuario(id: number, datosActualizados: Partial<Usuario>): Promise<Usuario | boolean> {
    return await this.usuarioService.patchUsuario(id, datosActualizados);
  }

  async eliminarUsuario(id: number): Promise<boolean> {
    return await this.usuarioService.eliminarUsuario(id);
  }
}
