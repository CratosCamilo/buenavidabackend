import AbstractCarrito from "./AbstractCarrito";

export default class NullCarrito extends AbstractCarrito {
    constructor() {
        super({
            id: 0,
            idUsuario: 0,
            productos: [],
            fechaCreacion: new Date(0), // Fecha inválida para representar un carrito inexistente
        });
    }

    public isNull(): boolean {
        return true;
    }
}
