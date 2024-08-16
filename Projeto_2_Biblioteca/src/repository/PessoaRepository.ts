import {executarComandoSQL} from "../database/mysql";
import { PessoaEntity } from "../model/entity/PessoaEntity";

export class PessoaRepository{
    private static instance: PessoaRepository;

    private constructor(){
        this.createTable();
    }

    public static getInstance(): PessoaRepository {
        if(!this.instance) {
            this.instance = new PessoaRepository();
        }
        return this.instance;
    }


    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Pessoas (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL
        )`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async cadastrarPessoa(pessoa: PessoaEntity): Promise<PessoaEntity>{
        const query = 'INSERT INTO biblioteca.Pessoas(nome, email) VALUES (?,?)'
        try{
            const resultado = await executarComandoSQL(query, [pessoa.nome, pessoa.email]);
            console.log("Pessoa cadastrada com sucesso!", resultado);
            pessoa.id = resultado.insertId;
            return new Promise<PessoaEntity>((resolve)=>{
                resolve(pessoa);
            })
        } catch (err) {
            console.error('Erro ao cadastrar uma nova pessoa:', err);
            throw err;
        }
    }

    async atualizarPessoa(pessoa: PessoaEntity): Promise<PessoaEntity>{
        const query = 'UPDATE biblioteca.Pessoas set nome = ?, email = ? WHERE id = ?;';

        try{
            const resultado = await executarComandoSQL(query, [pessoa.nome, pessoa.email, pessoa.id]);
            console.log("Pessoa atualizada com sucesso:", resultado);
            return new Promise<PessoaEntity>((resolve)=>{
                resolve(pessoa);
            })
        }catch(err: any){
            console.error('Erro ao atualizar os dados da pessoa', err);
            throw err;
        }
    }

    async filtrarPessoaPorId(id: number): Promise<PessoaEntity | null>{
        const query = 'SELECT * FROM biblioteca.Pessoas where id = ?';
        try{
            const resultado = await executarComandoSQL(query,[id]);
            if(resultado.length > 0){
                console.log("Pessoa localizada com sucesso:", resultado);
                return resultado;
            }
            else{
                return null;
            }
        }catch(err: any){
            console.error(`Erro ao localizar pessoa com id = ${id} na base de dados`, err);
            throw err;
        }
    }

    async listarTodasPessoas(): Promise<PessoaEntity[] | null>{
        const query = 'SELECT * FROM biblioteca.Pessoas;';

        try{
            const resultado = await executarComandoSQL(query, []);
            if(resultado.length > 0){
                console.log("Pessoas cadastradas: ", resultado);
                return resultado;
            }
            else{
                return null;
            }
        }catch(err: any){
        console.error(`Erro ao listar pessoas cadastradas!`, err);
        throw err;
        }
    }

    async deletarPessoa(id: number): Promise<PessoaEntity>{
        const query = 'DELETE FROM biblioteca.Pessoas WHERE id = ?;';
        try{
            const resultado = await executarComandoSQL(query,[id]);
            console.log(`A pessoa com o id = ${id} foi deletada com sucesso!`, resultado);
            return new Promise<PessoaEntity>((resolve)=>{
                resolve(resultado);
            });
        }catch (err: any){
            console.error(`Erro ao deletar pessoa com id = ${id}`, err);
            throw err;
        }

    }

    async pesquisarPessoaPorEmail(email: string): Promise<PessoaEntity | null>{
        const query = 'SELECT * FROM biblioteca.Pessoas WHERE email = ?;';

        try{
            const emailExiste = await executarComandoSQL(query, [email]);
            if(emailExiste.length > 0){
                console.log(`O email: ${email} já foi cadastrado`, emailExiste);
                return emailExiste;
            }
            else{
                return null;
            }

        }catch(err: any){
            console.error("Erro ao localizar email!", err);
            throw err;
        }
    }


}