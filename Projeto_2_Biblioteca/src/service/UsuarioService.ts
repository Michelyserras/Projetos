import { UsuarioEntity } from "../model/entity/Usuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class UsuarioService{

    private usuarioRepository = UsuarioRepository.getInstance();

    async cadastrarUsuario(usuarioData: any): Promise<UsuarioEntity> {
        const { idPessoa, senha } = usuarioData;
        
        const usuario = new UsuarioEntity(undefined, idPessoa, senha);

        const novoUsuario =  await this.usuarioRepository.cadastrarUsuario(usuario);
        console.log("Service - Insert ", novoUsuario);
        return novoUsuario;
    }

    async atualizarUsuario(usuarioData: any): Promise<UsuarioEntity> {
        const { id, idPessoa, senha} = usuarioData;

        const usuario = new UsuarioEntity(id, idPessoa, senha);

        await this.usuarioRepository.atualizarUsuario(usuario);
        console.log("Service - Update ", usuario);
        return usuario;
    }

    async deletarUsuario(usuarioData: any): Promise<UsuarioEntity> {
        const { id, idPessoa, senha } = usuarioData;

        const usuario = new UsuarioEntity(id, idPessoa, senha);

        await this.usuarioRepository.deletarUsuario(usuario.id);
        console.log("Service - Delete ", usuario);
        return usuario;
    }

    async filtrarUsuario(usuarioData: any): Promise<UsuarioEntity | null> {
        const idNumber = parseInt(usuarioData, 10);

        const usuario =  await this.usuarioRepository.filtrarUsuarioPorId(idNumber);
        console.log("Service - Filtrar", usuario);
        return usuario;
    }

    async listarTodosUsuarios(): Promise<UsuarioEntity[] | null> {
        const usuario =  await this.usuarioRepository.listarTodosUsuarios();
        console.log("Service - Filtrar Todos", usuario);
        return usuario;
    }
}