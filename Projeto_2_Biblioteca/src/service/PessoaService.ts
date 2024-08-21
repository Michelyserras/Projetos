import { PessoaEntity } from "../model/entity/PessoaEntity";
import { PessoaRepository } from "../repository/PessoaRepository";

export class PessoaService{

    private pessoaRepository = PessoaRepository.getInstance();

    async cadastrarPessoa(pessoaData: any): Promise<PessoaEntity> { 
        const { nome, email } = pessoaData;
        const emailEncontrado = await this.pessoaRepository.pesquisarPessoaPorEmail(email); //Verifica se o email já está cadastrado

        if(emailEncontrado !== null){ //Se o email já está cadastrado não é possível realizar o cadastro da pessoa para não ter email duplicado
            throw new Error("Esse email já está cadastrado.");
        }
        
        const pessoa = new PessoaEntity(undefined, nome, email);

        const novaPessoa =  await this.pessoaRepository.cadastrarPessoa(pessoa);
        console.log("Service - Insert ", novaPessoa);
        return novaPessoa;
    }

    async atualizarPessoa(pessoaData: any): Promise<PessoaEntity> {
        const { id, nome, email } = pessoaData;
        const pessoaEncontrada = await this.filtrarPessoa(id); //Verifica se a pessoa existe

        if(pessoaEncontrada === null){ //Se a pessoa não exister não é possível realizar as atualizações
            throw new Error("Pessoa não existe.");
        }

        const pessoa = new PessoaEntity(id, nome, email);

        await this.pessoaRepository.atualizarPessoa(pessoa);
        console.log("Service - Update ", pessoa);
        return pessoa;
    }

    async deletarPessoa(id: any): Promise<PessoaEntity> { 
        const pessoaEncontrada = await this.filtrarPessoa(id); //Verifica se a pessoa existe

        if(pessoaEncontrada === null){ //Se a pessoa não exister não é possível realizar o delete
            throw new Error("Pessoa não existe.");
        }

        await this.pessoaRepository.deletarPessoa(id);
        console.log("Service - Delete ", pessoaEncontrada);
        return pessoaEncontrada;
    }

    async filtrarPessoa(pessoaData: any): Promise<PessoaEntity | null> {
        const idNumber = parseInt(pessoaData, 10);

        const pessoa =  await this.pessoaRepository.filtrarPessoaPorId(idNumber);
        console.log("Service - Filtrar", pessoa);
        return pessoa;
    }

    async listarTodasPessoas(): Promise<PessoaEntity[] | null> {
        const pessoa =  await this.pessoaRepository.listarTodasPessoas();
        console.log("Service - Filtrar Todos", pessoa);
        return pessoa;
    }
}