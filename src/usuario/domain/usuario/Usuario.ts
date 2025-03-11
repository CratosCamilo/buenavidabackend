import AbstractUsuario, { UsuarioInterface } from "./AbstractUsuario";

export default class Usuario extends AbstractUsuario {
    constructor(usuario: UsuarioInterface) {
        super(usuario);
    }

    public isNull = (): boolean => false;

    public static fromPartial(datosUsuario: Partial<UsuarioInterface>): Usuario {
        
        return new Usuario({
            id: datosUsuario.id ?? 0, 
            nombre: datosUsuario.nombre,
            apellido: datosUsuario.apellido,
            correo: datosUsuario.correo,
            contraseña: datosUsuario.contraseña,
            direccion: datosUsuario.direccion,
            rol: datosUsuario.rol,
            fechaRegistro: datosUsuario.fechaRegistro ?? new Date(),
        });
    }
    

    public static fromSQL(row: any): Usuario {
        return new Usuario({
          id: row.ID_USUARIO,
          nombre: row.NOMBRE,
          apellido: row.APELLIDO,
          correo: row.CORREO,
          contraseña: row.CONTRASEÑA,
          direccion: row.DIRECCION,
          rol: row.ROL,
          fechaRegistro: row.FECHA_REGISTRO
        });
    }
}
