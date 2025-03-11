import UsuarioServiceInterface from "../../domain/interfaces/UsuarioServiceInterface";
import Usuario from "../../domain/usuario/Usuario";
import SQLUsuarioRepositoryPort from "../../domain/port/driven/SQLUsuarioRepositoryPort";
import { UsuarioInterface } from "../../domain/usuario/AbstractUsuario";

export default class UsuarioService implements UsuarioServiceInterface {
  constructor(private readonly usuarioRepository: SQLUsuarioRepositoryPort) {}

  public async obtenerUsuarios(): Promise<Usuario[]> {
    return await this.usuarioRepository.findAll();
  }

  public async obtenerUsuarioPorId(id: number): Promise<Usuario> {
    return await this.usuarioRepository.findById(id);
  }

  public async crearUsuario(datosUsuario: Partial<UsuarioInterface>): Promise<Usuario> {
    return await this.usuarioRepository.save(Usuario.fromPartial(datosUsuario));
  }
  
  
  public async actualizarUsuario(id: number, datosActualizados: Partial<UsuarioInterface>): Promise<Usuario | boolean> {
    return await this.usuarioRepository.update(id, Usuario.fromPartial(datosActualizados));
  }
  

  public async patchUsuario(id: number, datosActualizados: Partial<Usuario>): Promise<Usuario | boolean> {
    return await this.usuarioRepository.patch(id, datosActualizados);
  }

  public async eliminarUsuario(id: number): Promise<boolean> {
    return await this.usuarioRepository.delete(id);
  }
}
