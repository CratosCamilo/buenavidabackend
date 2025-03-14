import AbstractCarrito, { CarritoInterface } from "./AbstractCarrito";

export default class Carrito extends AbstractCarrito {
    constructor(carrito: CarritoInterface) {
        super(carrito);
    }

    public isNull(): boolean {
        return false;
    }

    public static fromPartial(datosCarrito: Partial<CarritoInterface>): Carrito {
        return new Carrito({
            id: datosCarrito.id ?? 0, // El ID será autogenerado en la DB
            idUsuario: datosCarrito.idUsuario ?? 0, // Se requiere el ID del usuario
            productos: datosCarrito.productos ?? [],
            fechaCreacion: datosCarrito.fechaCreacion ?? new Date(),
        });
    }
}
