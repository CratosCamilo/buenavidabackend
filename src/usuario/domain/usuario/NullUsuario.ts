import AbstractUsuario from "./AbstractUsuario";

export default class NullUsuario extends AbstractUsuario {
  constructor() {
    super({
      id: 0,
      nombre: "Not found",
      apellido: "Not found",
      correo: "notfound@example.com",
      contraseña: "Not found",
      direccion: "",
      rol: "cliente",
      fechaRegistro: new Date(0),
    });
  }

  public isNull = (): boolean => true;

  public override setNombre = (_nombre?: string): void => {};
  public override setApellido = (_apellido?: string): void => {};
  public override setCorreo = (_correo?: string): void => {};
  public override setDireccion = (_direccion?: string): void => {};
  public override setRol = (_rol?: "cliente" | "admin"): void => {};
}
