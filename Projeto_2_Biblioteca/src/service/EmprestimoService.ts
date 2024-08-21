import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { LivroRepository } from "../repository/LivroRepository";
import { stringParaData } from "../util/DataUtil";

export class EmprestimoService{

    private emprestimoRepository = EmprestimoRepository.getInstance();
    private usuarioRepository = UsuarioRepository.getInstance();
    private livroRepository = LivroRepository.getInstance();

    async realizarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> { //Ao registrar um empréstimo, verficar se o usuário e o livro existem, garantindo também a existência associada da pessoa correspondente ao usuário.
        const { livroId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;
        const usuarioEncontrado = await this.usuarioRepository.filtrarUsuarioPorId(usuarioId); //Verifica se o usuário existe
        const livroEncontrado = await this.livroRepository.filtrarLivroPorId(livroId); //Verifica se o livro existe

        if(usuarioEncontrado === null || livroEncontrado === null){ //Se o usuário ou livro não estiver cadastrado o empréstimo não é realizado
            throw new Error("Usuário ou livro não cadastrado.");
        }
        
        const emprestimo = new EmprestimoEntity(undefined, livroId, usuarioId, dataEmprestimo, dataDevolucao);

        const novoEmprestimo =  await this.emprestimoRepository.realizarEmprestimo(emprestimo);
        console.log("Service - Insert ", novoEmprestimo);
        return novoEmprestimo;
    }

    async atualizarEmprestimo(emprestimoData: EmprestimoEntity): Promise<EmprestimoEntity> {
        let { id, livroId, usuarioId, dataEmprestimo, dataDevolucao} = emprestimoData;

        const emprestimoEncontrado = await this.filtrarEmprestimo(id); //Verifica se o emprestimo existe
        const usuarioEncontrado = await this.usuarioRepository.filtrarUsuarioPorId(usuarioId); //Verifica se o usuário existe
        const livroEncontrado = await this.livroRepository.filtrarLivroPorId(livroId); //Verifica se o livro existe

        if(emprestimoEncontrado === null || usuarioEncontrado === null || livroEncontrado === null){ //Se o emprestimo, usuario ou livro não existirem não realiza as atualizações
            throw new Error("Emprestimo, usuário ou livro não existem.");
        }

        
        const emprestimo = new EmprestimoEntity(id,livroId, usuarioId, dataEmprestimo.toISOString().split('T')[0], dataDevolucao.toISOString().split('T')[0]);

        await this.emprestimoRepository.atualizarEmprestimo(emprestimo);
        console.log("Service - Update ", emprestimo);
        return emprestimo;
    }

    async deletarEmprestimo(id: any): Promise<EmprestimoEntity> {
        const emprestimoEncontrado = await this.filtrarEmprestimo(id); //Verifica se o emprestimo existe

        if(emprestimoEncontrado === null){ //Se o emprestimo não existir não realizar o delete
            throw new Error("Emprestimo não existe.");
        }

        await this.emprestimoRepository.deletarEmprestimo(id);
        console.log("Service - Delete", emprestimoEncontrado);
        return emprestimoEncontrado;
    }

    async filtrarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity | null> {
        const idNumber = parseInt(emprestimoData, 10);

        const emprestimo =  await this.emprestimoRepository.filtrarEmprestimoPorId(idNumber);
        console.log("Service - Filtrar", emprestimo);
        return emprestimo;
    }

    async listarTodosEmprestimos(): Promise<EmprestimoEntity[] | null> {
        const emprestimo =  await this.emprestimoRepository.listarTodasEmprestimos();
        console.log("Service - Filtrar Todos", emprestimo);
        return emprestimo;
    }
}