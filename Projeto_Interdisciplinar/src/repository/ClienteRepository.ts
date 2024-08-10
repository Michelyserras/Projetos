import { executarComandoSQL } from "../database/mysql";
import { ClienteEntity } from "../model/entity/Cliente";

export class ClienteRepository{

    private static instance: ClienteRepository;

    private constructor(){
        this.createTable();
    }

    public static getInstance(): ClienteRepository {
        if(!this.instance) {
            this.instance = new ClienteRepository();
        }
        return this.instance;
    }

    private async createTable() { //CRIA A TABELA CLIENTE NO BANCO DE DADOSi
        const query = `
        CREATE TABLE IF NOT EXISTS sistema.Cliente (
            cpf VARCHAR(14) PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            endereco VARCHAR(255) NOT NULL,
            telefone VARCHAR(12) NOT NULL
        )`;

        try {
            const resultado =  await executarComandoSQL(query, []);
            console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insertCliente(cliente:ClienteEntity) :Promise<ClienteEntity>{ //CADASTRAR UM CLIENTE
        const query = "INSERT INTO sistema.Cliente (cpf, nome, endereco, telefone) VALUES (?, ?, ?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [cliente.cpf, cliente.nome, cliente.endereco, cliente.telefone]);
            console.log('Cliente cadastrado com sucesso, cpf: ', resultado.cpf);
            return new Promise<ClienteEntity>((resolve)=>{
                resolve(cliente);
            })
        } catch (err) {
            console.error('Erro ao cadastrar o cliente:', err);
            throw err;
        }
    }

    async updateCliente(cliente:ClienteEntity) :Promise<ClienteEntity>{ //ATUALIZAR OS DADOS(NOME, ENDEREÇO E TELEFONE) DE UM CLIENTE PELO SEU CPF
        const query = "UPDATE sistema.Cliente set nome = ?, endereco = ?, telefone = ? where cpf = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [cliente.nome, cliente.endereco, cliente.telefone, cliente.cpf]);
            console.log('Cliente atualizado com sucesso: ', resultado);
            return new Promise<ClienteEntity>((resolve)=>{
                resolve(cliente);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o cliente de cpf ${cliente.cpf} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteCliente(cliente:ClienteEntity) :Promise<ClienteEntity>{ //DELETAR UM CLIENTE DO SISTEMA
        const query = "DELETE FROM sistema.Cliente where cpf = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [cliente.cpf]);
            console.log('Cliente deletado com sucesso: ', resultado);
            return new Promise<ClienteEntity>((resolve)=>{
                resolve(cliente);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o cliente de cpf ${cliente.cpf} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterCliente(cpf: string) :Promise<ClienteEntity>{ //PROCURAR POR CLIENTE
        const query = "SELECT * FROM sistema.Cliente where cpf = '?';" ;

        try {
            const resultado = await executarComandoSQL(query, [cpf]);
            console.log('Cliente localizado com sucesso, cpf: ', resultado);
            return new Promise<ClienteEntity>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o cliente de cpf ${cpf} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllCliente() :Promise<ClienteEntity[]>{ //LISTAR TODOS OS CLIENTES EXISTENTES
        const query = "SELECT * FROM sistema.Cliente" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<ClienteEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os clientes gerando o erro: ${err}`);
            throw err;
        }
    }
}