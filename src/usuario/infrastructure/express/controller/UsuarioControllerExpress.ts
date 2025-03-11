import { Request, Response } from "express";
import UsuarioControllerExpressInterface from "../../../domain/interfaces/UsuarioControllerExpressInterface";
import UsuarioUseCasePort from "../../../domain/port/driver/UsuarioUseCasePort";

export default class UsuarioControllerExpress implements UsuarioControllerExpressInterface {
    constructor(private readonly usuarioUseCase: UsuarioUseCasePort) { }

    public async obtenerUsuarios(_req: Request, res: Response): Promise<void> {
        try {
            const usuarios = await this.usuarioUseCase.obtenerUsuarios();

            if (!usuarios || usuarios.length === 0) {
                res.status(404).json({ message: "Usuarios no encontrados" });
                return;
            }

            res.status(200).json({ usuarios }); 
        } catch (error) {
            console.error("🔴 Error al obtener usuarios:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }


    public async obtenerUsuarioPorId(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const usuario = await this.usuarioUseCase.obtenerUsuarioPorId(Number(id));

        if (usuario.isNull()) {
            res.status(404).send({ message: "Usuario no encontrado" });
            return;
        }

        res.status(200).send(usuario);
    }

    public async crearUsuario(req: Request, res: Response): Promise<void> {
        const nuevoUsuario = await this.usuarioUseCase.crearUsuario(req.body);

        if (!nuevoUsuario) {
            res.status(400).send({ message: "No se pudo crear el usuario" });
            return;
        }

        res.status(201).send(nuevoUsuario);
    }

    public async actualizarUsuario(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const usuarioActualizado = await this.usuarioUseCase.actualizarUsuario(
                Number(id),
                req.body
            );
    
            if (usuarioActualizado === false) {
                res.status(400).json({ message: "El correo ya está en uso por otro usuario" });
                return;
            }
    
            res.status(200).json(usuarioActualizado);
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
    

    public async patchUsuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const usuarioActualizado = await this.usuarioUseCase.patchUsuario(
            Number(id),
            req.body
        );

        if (!usuarioActualizado) {
            res.status(400).send({ message: "No se pudo actualizar parcialmente el usuario" });
            return;
        }

        res.status(200).send(usuarioActualizado);
    }

    public async eliminarUsuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const eliminado = await this.usuarioUseCase.eliminarUsuario(Number(id));

        if (!eliminado) {
            res.status(400).send({ message: "No se pudo eliminar el usuario" });
            return;
        }

        res.status(200).send({ message: "Usuario eliminado exitosamente" });
    }
}
