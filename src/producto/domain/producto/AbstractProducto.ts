export default abstract class AbstractProducto {
    protected id: number;
    protected nombre?: string;
    protected descripcion?: string;
    protected precio?: number;
    protected descuento?: number;
    protected urlImagen?: string;
    protected categoria?: string;
    protected estaEnPromocion?: boolean;
    protected stock?: number;

    constructor(producto: ProductoInterface) {
        this.id = producto.id;
        this.nombre = producto.nombre;
        this.descripcion = producto.descripcion;
        this.precio = producto.precio;
        this.descuento = producto.descuento;
        this.urlImagen = producto.urlImagen;
        this.categoria = producto.categoria;
        this.estaEnPromocion = producto.estaEnPromocion;
        this.stock = producto.stock; 
    }
    

    public abstract isNull(): boolean;

    public getId = (): number => this.id;
    public getNombre = (): string | undefined => this.nombre;
    public getDescripcion = (): string | undefined => this.descripcion;
    public getPrecio = (): number | undefined => this.precio;
    public getDescuento = (): number | undefined => this.descuento;
    public getUrlImagen = (): string | undefined => this.urlImagen;
    public getCategoria = (): string | undefined => this.categoria;
    public getEstaEnPromocion = (): boolean | undefined => this.estaEnPromocion;
    public getStock = (): number | undefined => this.stock;

    public setNombre = (nombre?: string): void => {
        if (!nombre || this.validateString(nombre, 3, 150)) return;
        this.nombre = nombre;
    };

    public setDescripcion = (descripcion?: string): void => {
        if (descripcion && this.validateString(descripcion, 0, 500)) return;
        this.descripcion = descripcion;
    };

    public setPrecio = (precio?: number): void => {
        if (precio === undefined || precio < 0) return;
        this.precio = precio;
    };

    public setDescuento = (descuento?: number): void => {
        if (descuento === undefined || descuento < 0 || descuento > 100) return;
        this.descuento = descuento;
    };

    public setUrlImagen = (urlImagen?: string): void => {
        if (urlImagen && this.validateString(urlImagen, 5, 255)) return;
        this.urlImagen = urlImagen;
    };

    public setCategoria = (categoria?: string): void => {
        if (categoria && this.validateString(categoria, 3, 100)) return;
        this.categoria = categoria;
    };

    public setEstaEnPromocion = (estaEnPromocion?: boolean): void => {
        this.estaEnPromocion = estaEnPromocion ?? false;
    };

    public setStock = (stock?: number): void => {
        if (stock === undefined || stock < 0) return;
        this.stock = stock;
    };

    private validateString = (value: string, min: number, max: number): boolean =>
        value.length < min || value.length > max;
}

export interface ProductoInterface {
    id: number;
    nombre?: string;
    descripcion?: string;
    precio?: number;
    descuento?: number;
    urlImagen?: string;
    categoria?: string;
    estaEnPromocion?: boolean;
    stock?: number;
}
