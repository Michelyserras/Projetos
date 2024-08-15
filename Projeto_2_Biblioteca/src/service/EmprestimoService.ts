import { EmprestimoEntity } from "../model/entity/Emprestimo";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";

export class EmprestimoService{

    private emprestimoRepository = EmprestimoRepository.getInstance();

    async realizarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> { //Ao registrar um empréstimo, verficar se o usuário e o livro existem, garantindo também a existência associada da pessoa correspondente ao usuário.
        const { livroId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;
        
        const emprestimo = new EmprestimoEntity(undefined, livroId, usuarioId, dataEmprestimo, dataDevolucao);

        const novoEmprestimo =  await this.emprestimoRepository.realizarEmprestimo(emprestimo);
        console.log("Service - Insert ", novoEmprestimo);
        return novoEmprestimo;
    }

    async atualizarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> {
        const { id, livroId, usuarioId, dataEmprestimo, dataDevolucao} = emprestimoData;

        const emprestimo = new EmprestimoEntity(id, livroId, usuarioId, dataEmprestimo, dataDevolucao);

        await this.emprestimoRepository.atualizarEmprestimo(emprestimo);
        console.log("Service - Update ", emprestimo);
        return emprestimo;
    }

    async deletarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> {
        const { id, nome } = emprestimoData;

        const emprestimo = new EmprestimoEntity(id, nome);

        await this.emprestimoRepository.deletarEmprestimo(emprestimo.id);
        console.log("Service - Delete ", emprestimo);
        return emprestimo;
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