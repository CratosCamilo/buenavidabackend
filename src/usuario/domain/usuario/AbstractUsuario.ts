export default abstract class AbstractUsuario {
    protected id: number;
    protected nombre?: string;
    protected apellido?: string;
    protected correo?: string;
    protected contraseña?: string; 
    protected direccion?: string;
    protected rol?: "cliente" | "admin";
    protected fechaRegistro?: Date;
  
    constructor(usuario: UsuarioInterface) {
        this.id = usuario.id;
        this.nombre = usuario.nombre ?? undefined;
        this.apellido = usuario.apellido ?? undefined;
        this.correo = usuario.correo ?? undefined;
        this.contraseña = usuario.contraseña ?? undefined;
        this.direccion = usuario.direccion ?? undefined;
        this.rol = usuario.rol ?? "cliente"; 
        this.fechaRegistro = usuario.fechaRegistro ?? new Date(); 
    }
  
    public abstract isNull(): boolean;
    public getId = (): number => this.id;
    public getNombre = (): string | undefined => this.nombre;
    public getApellido = (): string | undefined => this.apellido;
    public getCorreo = (): string | undefined => this.correo;
    public getDireccion = (): string | undefined => this.direccion;
    public getRol = (): "cliente" | "admin" | undefined => this.rol;
    public getFechaRegistro = (): Date => this.fechaRegistro!; 
    public getContraseña = (): string | undefined => this.contraseña;

    public setNombre = (nombre?: string): void => {
        if (!nombre || this.validateString(nombre, 2, 50)) return;
        this.nombre = nombre;
    };

    public setApellido = (apellido?: string): void => {
        if (!apellido || this.validateString(apellido, 2, 50)) return;
        this.apellido = apellido;
    };

    public setCorreo = (correo?: string): void => {
        if (!correo || this.validateEmail(correo)) return;
        this.correo = correo;
    };

    public setDireccion = (direccion?: string): void => {
        if (direccion && this.validateString(direccion, 5, 100)) return;
        this.direccion = direccion;
    };

    public setRol = (rol?: "cliente" | "admin"): void => {
        if (!rol) return;
        this.rol = rol;
    };

    public setContraseña = (contraseña?: string): void => {
        if (!contraseña || contraseña.length < 6) return;
        this.contraseña = contraseña;
    };

    private validateString = (value: string, min: number, max: number): boolean =>
        value.length < min || value.length > max;

    private validateEmail = (email: string): boolean =>
        !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

export interface UsuarioInterface {
    id: number;
    nombre?: string;
    apellido?: string;
    correo?: string;
    contraseña?: string;
    direccion?: string;
    rol?: "cliente" | "admin";
    fechaRegistro?: Date;
}
