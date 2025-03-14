import AbstractProducto, { ProductoInterface } from "./AbstractProducto";

export default class Producto extends AbstractProducto {
    constructor(producto: ProductoInterface) {
        super(producto);
    }

    public isNull = (): boolean => false;

    public static fromPartial(datosProducto: Partial<ProductoInterface>): Producto {
        return new Producto({
            id: datosProducto.id ?? 0, // SQL Server lo generará automáticamente
            nombre: datosProducto.nombre,
            descripcion: datosProducto.descripcion,
            precio: datosProducto.precio,
            descuento: datosProducto.descuento,
            urlImagen: datosProducto.urlImagen,
            categoria: datosProducto.categoria,
            estaEnPromocion: datosProducto.estaEnPromocion,
            stock: datosProducto.stock
        });
    }
}
