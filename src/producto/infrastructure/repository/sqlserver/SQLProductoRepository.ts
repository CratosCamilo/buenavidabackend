import DatabaseProvider from "../../../../express/infrastructure/provider/DatabaseProvider";
import Producto from "../../../domain/producto/Producto";
import NullProducto from "../../../domain/producto/NullProducto";
import SQLProductoRepositoryPort from "../../../domain/port/driven/SQLProductoRepositoryPort";
import sql from "mssql";

export default class SQLProductoRepository implements SQLProductoRepositoryPort {
    private readonly db: sql.ConnectionPool;

    constructor(db: sql.ConnectionPool) { 
        this.db = db;
    }

    public async findAll(): Promise<Producto[]> {
        const result = await this.db.request().query("SELECT * FROM PRODUCTO");

        if (!result.recordset || result.recordset.length === 0) {
            return [];
        }

        return result.recordset.map(row => this.mapProducto(row));
    }

    public async findById(id: number): Promise<Producto> {
        const result = await this.db.request()
            .input("id", sql.Int, id)
            .query("SELECT * FROM PRODUCTO WHERE ID_PRODUCTO = @id");

        if (!result.recordset || result.recordset.length === 0) return new NullProducto();

        return this.mapProducto(result.recordset[0]);
    }

    public async save(producto: Producto): Promise<Producto> {
        const result = await this.db.request()
            .input("nombre", sql.VarChar, producto.getNombre())
            .input("descripcion", sql.Text, producto.getDescripcion() || null)
            .input("precio", sql.Decimal(10, 2), producto.getPrecio())
            .input("descuento", sql.Decimal(5, 2), producto.getDescuento() || 0)
            .input("urlImagen", sql.VarChar, producto.getUrlImagen() || null)
            .input("categoria", sql.VarChar, producto.getCategoria() || null)
            .input("estaEnPromocion", sql.Bit, producto.getEstaEnPromocion())
            .input("stock", sql.Int, producto.getStock())
            .query(
                `INSERT INTO PRODUCTO (NOMBRE, DESCRIPCION, PRECIO, DESCUENTO, URL_IMAGEN, CATEGORIA, ESTA_EN_PROMOCION, STOCK)
                OUTPUT INSERTED.* 
                VALUES (@nombre, @descripcion, @precio, @descuento, @urlImagen, @categoria, @estaEnPromocion, @stock)`
            );

        return this.mapProducto(result.recordset[0]);
    }

    public async update(id: number, productoParcial: Partial<Producto>): Promise<Producto | boolean> {
        const productoActual = await this.findById(id);
        if (productoActual.isNull()) return false;

        const pool = await DatabaseProvider.getConnection();
        const request = pool.request();

        request.input("idProducto", sql.Int, id);
        request.input("nombre", sql.VarChar, productoParcial.getNombre?.() ?? productoActual.getNombre());
        request.input("descripcion", sql.Text, productoParcial.getDescripcion?.() ?? productoActual.getDescripcion());
        request.input("precio", sql.Decimal(10, 2), productoParcial.getPrecio?.() ?? productoActual.getPrecio());
        request.input("descuento", sql.Decimal(5, 2), productoParcial.getDescuento?.() ?? productoActual.getDescuento());
        request.input("urlImagen", sql.VarChar, productoParcial.getUrlImagen?.() ?? productoActual.getUrlImagen());
        request.input("categoria", sql.VarChar, productoParcial.getCategoria?.() ?? productoActual.getCategoria());
        request.input("estaEnPromocion", sql.Bit, productoParcial.getEstaEnPromocion?.() ?? productoActual.getEstaEnPromocion());
        request.input("stock", sql.Int, productoParcial.getStock?.() ?? productoActual.getStock());

        try {
            const result = await request.execute("sp_ActualizarProducto");

            if (!result.recordset || result.recordset.length === 0) return false;

            return this.mapProducto(result.recordset[0]);
        } catch (error: any) {
            console.error("🔴 Error al actualizar producto:", error.message);
            return false;
        }
    }

    public async patch(id: number, producto: Partial<Producto>): Promise<Producto | boolean> {
        let query = "UPDATE PRODUCTO SET ";
        const updates: string[] = [];
        const request = this.db.request();

        Object.entries(producto).forEach(([key, value]) => {
            if (value !== undefined) {
                updates.push(`${key.toUpperCase()} = @${key}`);
                request.input(key, value);
            }
        });

        if (updates.length === 0) return false;

        query += updates.join(", ") + " OUTPUT INSERTED.* WHERE ID_PRODUCTO = @id";
        request.input("id", sql.Int, id);

        const result = await request.query(query);

        if (!result.recordset || result.recordset.length === 0) return false;
        return this.mapProducto(result.recordset[0]);
    }

    public async delete(id: number): Promise<boolean> {
        const result = await this.db.request()
            .input("id", sql.Int, id)
            .query("DELETE FROM PRODUCTO WHERE ID_PRODUCTO = @id");

        return result.rowsAffected[0] > 0;
    }
    

    /**
     * 🟢 Función de mapeo para convertir una fila de la base de datos en un objeto Producto.
     */
    private mapProducto(row: any): Producto {
        return new Producto({
            id: row.ID_PRODUCTO,
            nombre: row.NOMBRE,
            descripcion: row.DESCRIPCION,
            precio: row.PRECIO,
            descuento: row.DESCUENTO,
            urlImagen: row.URL_IMAGEN,
            categoria: row.CATEGORIA,
            estaEnPromocion: row.ESTA_EN_PROMOCION,
            stock: row.STOCK
        });
    }
}
