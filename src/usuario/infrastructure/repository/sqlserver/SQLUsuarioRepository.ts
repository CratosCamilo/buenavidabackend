import DatabaseProvider from "../../../../express/infrastructure/provider/DatabaseProvider";
import Usuario from "../../../domain/usuario/Usuario";
import NullUsuario from "../../../domain/usuario/NullUsuario";
import SQLUsuarioRepositoryPort from "../../../domain/port/driven/SQLUsuarioRepositoryPort";
import sql from "mssql";

export default class SQLUsuarioRepository implements SQLUsuarioRepositoryPort {
    private readonly db: sql.ConnectionPool;

    constructor(db: sql.ConnectionPool) { 
        this.db = db;
    }

    public async findAll(): Promise<Usuario[]> {
        const result = await this.db.request().query("SELECT * FROM USUARIO");

        if (!result.recordset || result.recordset.length === 0) {
            return [];
        }

        return result.recordset.map(row => this.mapUsuario(row));
    }

    public async findById(id: number): Promise<Usuario> {
        const result = await this.db.request()
            .input("id", sql.Int, id)
            .query("SELECT * FROM USUARIO WHERE ID_USUARIO = @id");

        if (!result.recordset || result.recordset.length === 0) return new NullUsuario();

        return this.mapUsuario(result.recordset[0]);
    }

    public async save(usuario: Usuario): Promise<Usuario> {
        const result = await this.db.request()
            .input("nombre", sql.VarChar, usuario.getNombre())
            .input("apellido", sql.VarChar, usuario.getApellido())
            .input("correo", sql.VarChar, usuario.getCorreo())
            .input("contraseña", sql.VarChar, usuario.getContraseña())
            .input("direccion", sql.VarChar, usuario.getDireccion() || null)
            .input("rol", sql.VarChar, usuario.getRol())
            .query(
                `INSERT INTO USUARIO (NOMBRE, APELLIDO, CORREO, CONTRASEÑA, DIRECCION, ROL, FECHA_REGISTRO)
                OUTPUT INSERTED.* 
                VALUES (@nombre, @apellido, @correo, @contraseña, @direccion, @rol, GETDATE())`
            );

        return this.mapUsuario(result.recordset[0]);
    }

    public async update(id: number, usuarioParcial: Partial<Usuario>): Promise<Usuario | boolean> {
        const usuarioActual = await this.findById(id);
        if (usuarioActual.isNull()) return false;
    
        const pool = await DatabaseProvider.getConnection();
        const request = pool.request();
    
        request.input("id", sql.Int, id);
        request.input("nombre", sql.VarChar, usuarioParcial.getNombre?.() ?? usuarioActual.getNombre());
        request.input("apellido", sql.VarChar, usuarioParcial.getApellido?.() ?? usuarioActual.getApellido());
        request.input("correo", sql.VarChar, usuarioParcial.getCorreo?.() ?? usuarioActual.getCorreo());
        request.input("contraseña", sql.VarChar, usuarioParcial.getContraseña?.() ?? usuarioActual.getContraseña());
        request.input("direccion", sql.VarChar, usuarioParcial.getDireccion?.() ?? usuarioActual.getDireccion());
        request.input("rol", sql.VarChar, usuarioParcial.getRol?.() ?? usuarioActual.getRol());
    
        try {
            const result = await request.execute("sp_ActualizarUsuario");
    
            if (!result.recordset || result.recordset.length === 0) return false;
    
            return this.mapUsuario(result.recordset[0]);
        } catch (error: any) {
            console.error("🔴 Error al actualizar usuario:", error.message);
            return false;
        }
    }      

    public async patch(id: number, usuario: Partial<Usuario>): Promise<Usuario | boolean> {
        let query = "UPDATE USUARIO SET ";
        const updates: string[] = [];
        const request = this.db.request();

        Object.entries(usuario).forEach(([key, value]) => {
            if (value !== undefined) {
                updates.push(`${key.toUpperCase()} = @${key}`);
                request.input(key, value);
            }
        });

        if (updates.length === 0) return false;

        query += updates.join(", ") + " OUTPUT INSERTED.* WHERE ID_USUARIO = @id";
        request.input("id", sql.Int, id);

        const result = await request.query(query);

        if (!result.recordset || result.recordset.length === 0) return false;
        return this.mapUsuario(result.recordset[0]);
    }

    public async delete(id: number): Promise<boolean> {
        const result = await this.db.request()
            .input("id", sql.Int, id)
            .query("DELETE FROM USUARIO WHERE ID_USUARIO = @id");

        return result.rowsAffected[0] > 0;
    }

    
    private mapUsuario(row: any): Usuario {
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
