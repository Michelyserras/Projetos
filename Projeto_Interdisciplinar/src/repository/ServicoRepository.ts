import { executarComandoSQL } from "../database/mysql";
import { ServicoEntity } from "../model/entity/Servico";

export class ServicoRepository{

    private static instance: ServicoRepository;

    private constructor(){
        this.createTable();
    }

    public static getInstance(): ServicoRepository {
        if(!this.instance) {
            this.instance = new ServicoRepository();
        }
        return this.instance;
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS sistema.Servico (
            id INT AUTO_INCREMENT PRIMARY KEY,
            tipoServico VARCHAR(255) NOT NULL,
            valor DECIMAL(10, 3) NOT NULL,
            descricao VARCHAR(255) NOT NULL
        )`;

        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.log('Error');
        }
    }

    async insertServico(servico:ServicoEntity) :Promise<ServicoEntity>{ //CADASTRAR UM servico
        const query = "INSERT INTO sistema.Servico (tipoServico, valor, descricao) VALUES (?, ?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [servico.tipoServico, servico.valor, servico.descricao]);
            console.log('Servico cadastrado com sucesso, id: ', resultado.insertId);
            servico.id = resultado.insertId;

           return servico;

        } catch (err) {
            console.error('Erro ao cadastrar o servico:', err);
            throw err;
        }
    }

    async updateServico(servico:ServicoEntity) :Promise<ServicoEntity>{ //ATUALIZAR OS DADOS(NOME, ENDEREÇO E TELEFONE) DE UM servico PELO SEU CPF
        const query = "UPDATE sistema.Servico set tipoServico = ?, valor = ?, descricao = ? where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [servico.tipoServico, servico.valor, servico.descricao, servico.id]);
            console.log('Servico atualizado com sucesso: ', resultado);
            return resultado
        } catch (err:any) {
            console.error(`Erro ao atualizar o servico de id ${servico.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteServico(servico:ServicoEntity) :Promise<ServicoEntity>{ //DELETAR UM servico DO SISTEMA
        const query = "DELETE FROM sistema.Servico where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [servico.id]);
            console.log('Servico deletado com sucesso: ', resultado);
            return servico;
            
        } catch (err:any) {
            console.error(`Falha ao deletar o servico de id ${servico.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterServico(id: number) :Promise<ServicoEntity>{ //PROCURAR POR servico
        const query = "SELECT * FROM sistema.Servico where id = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log(`Servico localizado com sucesso, id: ${id} `, resultado);
            return resultado;
        } catch (err:any) {
            console.error(`Falha ao procurar o servico de id ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllServico() :Promise<ServicoEntity[]>{ //LISTAR TODOS OS servicoS EXISTENTES
        const query = "SELECT * FROM sistema.Servico" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return resultado;
        } catch (err:any) {
            console.error(`Falha ao listar os servicos gerando o erro: ${err}`);
            throw err;
        }
    }
}