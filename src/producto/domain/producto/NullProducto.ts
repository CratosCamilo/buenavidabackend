import AbstractProducto from "./AbstractProducto";

export default class NullProducto extends AbstractProducto {
    constructor() {
        super({
            id: 0,
            nombre: "No encontrado",
            descripcion: "No disponible",
            precio: 0.00,
            descuento: 0.00,
            urlImagen: "",
            categoria: "No especificada",
            estaEnPromocion: false,
            stock: 0
        });
    }

    public isNull = (): boolean => true;

    public override setNombre = (_nombre?: string): void => {};
    public override setDescripcion = (_descripcion?: string): void => {};
    public override setPrecio = (_precio?: number): void => {};
    public override setDescuento = (_descuento?: number): void => {};
    public override setUrlImagen = (_urlImagen?: string): void => {};
    public override setCategoria = (_categoria?: string): void => {};
    public override setEstaEnPromocion = (_estaEnPromocion?: boolean): void => {};
    public override setStock = (_stock?: number): void => {};
}
