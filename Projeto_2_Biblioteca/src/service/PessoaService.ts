import { PessoaEntity } from "../model/entity/Pessoa";
import { PessoaRepository } from "../repository/PessoaRepository";

export class PessoaService{

    private pessoaRepository = PessoaRepository.getInstance();

    async cadastrarPessoa(pessoaData: any): Promise<PessoaEntity> {
        const { nome, email } = pessoaData;
        
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

    async deletarPessoa(pessoaData: any): Promise<PessoaEntity> { 
        const { id, nome, email } = pessoaData;
        const pessoaEncontrada = await this.filtrarPessoa(id); //Verifica se a pessoa existe

        if(pessoaEncontrada === null){ //Se a pessoa não exister não é possível realizar o delete
            throw new Error("Pessoa não existe.");
        }

        const pessoa = new PessoaEntity(id, nome, email);

        await this.pessoaRepository.deletarPessoa(pessoa.id);
        console.log("Service - Delete ", pessoa);
        return pessoa;
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