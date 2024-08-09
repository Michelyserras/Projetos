import { executarComandoSQL } from "../database/mysql";
import { AgendaEntity } from "../model/entity/Agenda";

export class AgendaRepository{

    private static instance: AgendaRepository;

    private constructor(){
        this.createTable();
    }

    public static getInstance(): AgendaRepository {
        if(!this.instance) {
            this.instance = new AgendaRepository();
        }
        return this.instance;
    }

    private async createTable() {
        //REVER O FORMATO DA HORA
        const query = `
        CREATE TABLE IF NOT EXISTS sistema.Agenda (
            id INT AUTO_INCREMENT PRIMARY KEY,
            data DATE NOT NULL,
            hora TIME NOT NULL, 
            idServico INT  NOT NULL,
            cpfCliente VARCHAR(14) NOT NULL,
            idPet INT NOT NULL,
            FOREIGN KEY (idServico) REFERENCES sistema.Servico(id),
            FOREIGN KEY (cpfCliente) REFERENCES sistema.Cliente(cpf),
            FOREIGN KEY (idPet) REFERENCES sistema.Pet(id)  
        )`;

        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.log('Error');
        }
    }

    async insertAgenda(agenda:AgendaEntity) :Promise<AgendaEntity>{ //CADASTRAR UM agenda
        const query = "INSERT INTO sistema.Agenda (data, hora, idServico, cpfCliente, idPet) VALUES (?, ?, ?, ?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [agenda.data, agenda.hora, agenda.idServico, agenda.cpfCliente, agenda.idPet]);
            console.log('Agenda cadastrada com sucesso, id: ', resultado.insertId);
            agenda.id = resultado.insertId;

            return new Promise<AgendaEntity>((resolve)=>{
                resolve(agenda);
            })
        } catch (err) {
            console.error('Erro ao cadastrar a agenda:', err);
            throw err;
        }
    }

    async updateAgenda(agenda:AgendaEntity) :Promise<AgendaEntity>{ //ATUALIZAR OS DADOS(NOME, ENDEREÇO E TELEFONE) DE UM agenda PELO SEU CPF
        const query = "UPDATE sistema.Agenda set data = ?, hora = ? where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [agenda.data, agenda.hora, agenda.id]);
            console.log('Agenda atualizada com sucesso: ', resultado);
            return new Promise<AgendaEntity>((resolve)=>{
                resolve(agenda);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar a agenda de id ${agenda.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteAgenda(agenda:AgendaEntity) :Promise<AgendaEntity>{ //DELETAR UM agenda DO SISTEMA
        const query = "DELETE FROM sistema.Agenda where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [agenda.id]);
            console.log('Agenda deletada com sucesso: ', resultado);
            return new Promise<AgendaEntity>((resolve)=>{
                resolve(agenda);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar a agenda de id ${agenda.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAgenda(id: number) :Promise<AgendaEntity>{ //PROCURAR POR agenda
        const query = "SELECT * FROM sistema.Agenda where id = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Agenda localizada com sucesso, id: ', resultado);
            return new Promise<AgendaEntity>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar a agenda de id ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllAgenda() :Promise<AgendaEntity[]>{ //LISTAR TODOS OS agendaS EXISTENTES
        const query = "SELECT * FROM sistema.Agenda" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<AgendaEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar as agendas gerando o erro: ${err}`);
            throw err;
        }
    }

    async geraFaturamento() :Promise<Number>{
        const query = "SELECT SUM(valor) from sistema.Agenda;"

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Number>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao gerar o faturamento total da agenda: ${err}`);
            throw err;
        }
    }
}