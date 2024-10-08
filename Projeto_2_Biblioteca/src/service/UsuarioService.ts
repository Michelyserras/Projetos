import { UsuarioEntity } from "../model/entity/UsuarioEntity";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { PessoaRepository } from "../repository/PessoaRepository";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";

export class UsuarioService{

    private usuarioRepository = UsuarioRepository.getInstance();
    private pessoaRepository = PessoaRepository.getInstance();
    private emprestimoRepository = EmprestimoRepository.getInstance();

    async cadastrarUsuario(usuarioData: any): Promise<UsuarioEntity> { //Ao cadastrar um usuário, verificar se a pessoa existe.
        const { idPessoa, senha } = usuarioData;
        const pessoaEncontrada = await this.pessoaRepository.filtrarPessoaPorId(idPessoa); //Verifica se a pessoa existe

        if(pessoaEncontrada === null){ //Se a pessoa não for encontrada o usuário não será cadastrado
            throw new Error("Pessoa não cadastrada.");
        }
        
        const usuario = new UsuarioEntity(undefined, idPessoa, senha);

        const novoUsuario =  await this.usuarioRepository.cadastrarUsuario(usuario);
        console.log("Service - Insert ", novoUsuario);
        return novoUsuario;
    }

    async atualizarUsuario(usuarioData: any): Promise<UsuarioEntity> {
        const { id, idPessoa, senha} = usuarioData;
        const usuarioEncontrado = await this.filtrarUsuario(id); //Verifica se o usuário está cadastrado
        const pessoaEncontrada = await this.pessoaRepository.filtrarPessoaPorId(idPessoa); //Verifica se a pessoa existe

        if(usuarioEncontrado === null || pessoaEncontrada === null){ //Se o usuário ou pessoa não estiverem cadastrados não é realizado as atualizações
            throw new Error("Usuário ou pessoa não cadastrados.");
        }

        const usuario = new UsuarioEntity(id, idPessoa, senha);

        await this.usuarioRepository.atualizarUsuario(usuario);
        console.log("Service - Update ", usuario);
        return usuario;
    }

    async deletarUsuario(id: any): Promise<UsuarioEntity> {
        const usuarioEncontrado = await this.filtrarUsuario(id); //Verifica se o usuário está cadastrado
        const emprestimoUsuario = await this.emprestimoRepository.filtrarEmprestimoPorUsuarioId(id);
        
        if(usuarioEncontrado === null){ //Se o usuário não estiver cadastrado não realiza o delete
            throw new Error("Usuário não cadastrado.");
        }
        else if(emprestimoUsuario){
            throw new Error("Esse usuário possui empréstimos pendentes! Não pode ser deletado.");
        }

        await this.usuarioRepository.deletarUsuario(id);
        console.log("Service - Delete ", usuarioEncontrado);
        return usuarioEncontrado;
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