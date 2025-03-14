import AbstractProducto from "../../../producto/domain/producto/AbstractProducto";

export default abstract class AbstractCarrito {
    protected id: number;
    protected idUsuario: number; // ✅ Ahora almacena solo el ID del usuario
    protected productos: { producto: AbstractProducto; cantidad: number }[];
    protected fechaCreacion: Date;

    constructor(carrito: CarritoInterface) {
        this.id = carrito.id;
        this.idUsuario = carrito.idUsuario; // ✅ Se almacena el ID en lugar del objeto usuario
        this.productos = carrito.productos ?? [];
        this.fechaCreacion = carrito.fechaCreacion ?? new Date();
    }

    public abstract isNull(): boolean;

    public getId(): number {
        return this.id;
    }

    public getIdUsuario(): number {
        return this.idUsuario; // ✅ Devuelve solo el ID
    }

    public getProductos(): { producto: AbstractProducto; cantidad: number }[] {
        return this.productos;
    }

    public getFechaCreacion(): Date {
        return this.fechaCreacion;
    }

    public getTotalItems(): number {
        return this.productos.reduce((total, item) => total + (item?.cantidad ?? 0), 0);
    }

    public getTotalPrecio(): number {
        return this.productos.reduce((total, item) => total + ((item?.producto?.getPrecio() ?? 0) * (item?.cantidad ?? 0)), 0);
    }

    public addItem(producto: AbstractProducto, cantidad: number = 1): void {
        const itemExistente = this.productos.find(item => item.producto.getId() === producto.getId());
        if (itemExistente) {
            itemExistente.cantidad += cantidad;
        } else {
            this.productos.push({ producto, cantidad });
        }
    }

    public removeItem(productoId: number, cantidad: number = 1): void {
        const index = this.productos.findIndex(item => item.producto.getId() === productoId);
        if (index !== -1) {
            if ((this.productos[index]?.cantidad ?? 0) > cantidad) {
                this.productos[index].cantidad -= cantidad;
            } else {
                this.productos.splice(index, 1);
            }
        }
    }
}

export interface CarritoInterface {
    id: number;
    idUsuario: number; // ✅ Se cambia de usuario a idUsuario
    productos?: { producto: AbstractProducto; cantidad: number }[]; // ✅ Sigue siendo opcional
    fechaCreacion?: Date;
}
