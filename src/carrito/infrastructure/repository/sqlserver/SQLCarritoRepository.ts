import sql from "mssql";
import SQLCarritoRepositoryPort from "../../../domain/port/driven/SQLCarritoRepositoryPort";
import Carrito from "../../../domain/carrito/Carrito";
import NullCarrito from "../../../domain/carrito/NullCarrito";
import DatabaseProvider from "../../../../express/infrastructure/provider/DatabaseProvider";

export default class SQLCarritoRepository implements SQLCarritoRepositoryPort {
    private readonly db: sql.ConnectionPool;

    constructor(db: sql.ConnectionPool) {
        this.db = db;
    }

    /**
     * 📌 Obtener todos los carritos
     */
    public async findAll(): Promise<Carrito[]> {
        const result = await this.db.request().query("SELECT * FROM CARRITO");

        if (!result.recordset || result.recordset.length === 0) {
            return [];
        }

        return result.recordset.map(row => this.mapCarrito(row));
    }

    /**
     * 📌 Obtener un carrito por ID
     */
    public async findById(id: number): Promise<Carrito> {
        const result = await this.db.request()
            .input("idCarrito", sql.Int, id)
            .query("SELECT * FROM CARRITO WHERE ID_CARRITO = @idCarrito");

        if (!result.recordset || result.recordset.length === 0) {
            return new NullCarrito();
        }

        return this.mapCarrito(result.recordset[0]);
    }

    /**
     * 📌 Obtener un carrito por el ID del usuario
     */
    public async obtenerCarritoPorUsuario(idUsuario: number): Promise<Carrito> {
        const result = await this.db.request()
            .input("idUsuario", sql.Int, idUsuario)
            .query("SELECT * FROM CARRITO WHERE ID_USUARIO = @idUsuario");

        if (!result.recordset || result.recordset.length === 0) {
            return new NullCarrito();
        }

        return this.mapCarrito(result.recordset[0]);
    }

    /**
     * 📌 Crear un carrito para un usuario
     */
    public async save(carrito: Carrito): Promise<Carrito> {
        const result = await this.db.request()
            .input("idUsuario", sql.Int, carrito.getIdUsuario())
            .query(
                `INSERT INTO CARRITO (ID_USUARIO, FECHA_CREACION)
                 OUTPUT INSERTED.* 
                 VALUES (@idUsuario, GETDATE())`
            );

        return this.mapCarrito(result.recordset[0]);
    }

    /**
     * 📌 Agregar un producto al carrito
     */
    public async agregarItemAlCarrito(idCarrito: number, idProducto: number, cantidad: number): Promise<Carrito | boolean> {
        try {
            await this.db.request()
                .input("idCarrito", sql.Int, idCarrito)
                .input("idProducto", sql.Int, idProducto)
                .input("cantidad", sql.Int, cantidad)
                .query(
                    `MERGE ITEM_CARRITO AS target
                     USING (SELECT @idCarrito AS ID_CARRITO, @idProducto AS ID_PRODUCTO) AS source
                     ON target.ID_CARRITO = source.ID_CARRITO AND target.ID_PRODUCTO = source.ID_PRODUCTO
                     WHEN MATCHED THEN 
                         UPDATE SET target.CANTIDAD = target.CANTIDAD + @cantidad
                     WHEN NOT MATCHED THEN
                         INSERT (ID_CARRITO, ID_PRODUCTO, CANTIDAD)
                         VALUES (@idCarrito, @idProducto, @cantidad);`
                );

            return await this.findById(idCarrito);
        } catch (error) {
            console.error("🔴 Error al agregar producto al carrito:", error);
            return false;
        }
    }

    /**
     * 📌 Obtener el precio total del carrito
     */
    public async obtenerTotalPrecioCarrito(idCarrito: number): Promise<number> {
        const result = await this.db.request()
            .input("idCarrito", sql.Int, idCarrito)
            .query(
                `SELECT SUM(p.PRECIO * ic.CANTIDAD) AS TOTAL
                 FROM ITEM_CARRITO ic
                 JOIN PRODUCTO p ON ic.ID_PRODUCTO = p.ID_PRODUCTO
                 WHERE ic.ID_CARRITO = @idCarrito`
            );

        return result.recordset[0]?.TOTAL ?? 0;
    }

    /**
     * 📌 Eliminar un producto del carrito
     */
    public async eliminarItemDeCarrito(idCarrito: number, idProducto: number): Promise<boolean> {
        const result = await this.db.request()
            .input("idCarrito", sql.Int, idCarrito)
            .input("idProducto", sql.Int, idProducto)
            .query(
                `DELETE FROM ITEM_CARRITO 
                 WHERE ID_CARRITO = @idCarrito AND ID_PRODUCTO = @idProducto`
            );

        return result.rowsAffected[0] > 0;
    }

    /**
     * 📌 Eliminar un carrito y sus ítems
     */
    public async eliminarCarrito(idCarrito: number): Promise<boolean> {
        try {
            await this.db.request()
                .input("idCarrito", sql.Int, idCarrito)
                .query("DELETE FROM ITEM_CARRITO WHERE ID_CARRITO = @idCarrito");

            const result = await this.db.request()
                .input("idCarrito", sql.Int, idCarrito)
                .query("DELETE FROM CARRITO WHERE ID_CARRITO = @idCarrito");

            return result.rowsAffected[0] > 0;
        } catch (error) {
            console.error("🔴 Error al eliminar carrito:", error);
            return false;
        }
    }

    /**
     * 📌 Eliminar un carrito (implementando delete)
     */
    public async delete(id: number): Promise<boolean> {
        try {
            await this.db.request()
                .input("idCarrito", sql.Int, id)
                .query("DELETE FROM ITEM_CARRITO WHERE ID_CARRITO = @idCarrito");

            const result = await this.db.request()
                .input("idCarrito", sql.Int, id)
                .query("DELETE FROM CARRITO WHERE ID_CARRITO = @idCarrito");

            return result.rowsAffected[0] > 0;
        } catch (error) {
            console.error("🔴 Error al eliminar carrito con delete:", error);
            return false;
        }
    }

    /**
     * 📌 Actualizar carrito (se puede mejorar con procedimientos almacenados)
     */
    public async update(id: number, carrito: Carrito): Promise<Carrito | boolean> {
        try {
            const result = await this.db.request()
                .input("idCarrito", sql.Int, id)
                .input("idUsuario", sql.Int, carrito.getIdUsuario())
                .query(
                    `UPDATE CARRITO SET ID_USUARIO = @idUsuario
                     OUTPUT INSERTED.* 
                     WHERE ID_CARRITO = @idCarrito`
                );

            if (!result.recordset || result.recordset.length === 0) return false;

            return this.mapCarrito(result.recordset[0]);
        } catch (error) {
            console.error("🔴 Error al actualizar carrito:", error);
            return false;
        }
    }

    /**
     * 📌 Patch: Actualización parcial del carrito
     */
    public async patch(id: number, datosCarrito: Partial<Carrito>): Promise<Carrito | boolean> {
        let query = "UPDATE CARRITO SET ";
        const updates: string[] = [];
        const request = this.db.request();

        Object.entries(datosCarrito).forEach(([key, value]) => {
            if (value !== undefined) {
                updates.push(`${key.toUpperCase()} = @${key}`);
                request.input(key, value);
            }
        });

        if (updates.length === 0) return false;

        query += updates.join(", ") + " OUTPUT INSERTED.* WHERE ID_CARRITO = @idCarrito";
        request.input("idCarrito", sql.Int, id);

        const result = await request.query(query);

        if (!result.recordset || result.recordset.length === 0) return false;
        return this.mapCarrito(result.recordset[0]);
    }

    /**
     * 📌 Mapear un carrito desde la base de datos
     */
    private mapCarrito(row: any): Carrito {
        return new Carrito({
            id: row.ID_CARRITO,
            idUsuario: row.ID_USUARIO,
            productos: [],
            fechaCreacion: row.FECHA_CREACION
        });
    }
}
