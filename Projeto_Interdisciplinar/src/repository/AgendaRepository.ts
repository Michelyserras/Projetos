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
<<<<<<< HEAD
            hora TIME NOT NULL, 
            tipoServico VARCHAR(255) NOT NULL,
            valorServico NUMBER(10, 5) NOT NULL,
=======
            tipoServico VARCHAR(255) NOT NULL,
            valorServico DECIMAL(10,5) NOT NULL,
>>>>>>> origin/New-dev
            cpfCliente VARCHAR(14) NOT NULL,
            idPet INT NOT NULL,
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
<<<<<<< HEAD
        const query = "INSERT INTO sistema.Agenda (data, hora, tipoServico, valorServico, cpfCliente, idPet) VALUES (?, ?, ?, ?, ?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [agenda.data, agenda.hora, agenda.tipoServico, agenda.valorServico, agenda.cpfCliente, agenda.idPet]);
=======
        const query = "INSERT INTO sistema.Agenda (data, tipoServico, valorServico, cpfCliente, idPet) VALUES (?, ?, ?, ?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [agenda.data, agenda.tipoServico, agenda.valorServico, agenda.cpfCliente, agenda.idPet]);
>>>>>>> origin/New-dev
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
<<<<<<< HEAD
        const query = "UPDATE sistema.Agenda set data = ?, hora = ?, tipoServico = ?, valorServico = ? where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [agenda.data, agenda.hora, agenda.tipoServico, agenda.valorServico, agenda.id]);
=======
        const query = "UPDATE sistema.Agenda SET data = ?, tipoServico = ?, valorServico = ? WHERE id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [agenda.data, agenda.tipoServico, agenda.valorServico, agenda.id]);
>>>>>>> origin/New-dev
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

<<<<<<< HEAD
    async geraFaturamento() :Promise<Number>{
        const query = "SELECT SUM(valorServico) from sistema.Agenda;"

=======
    async verificaAgenda(data: Date) :Promise<AgendaEntity | undefined>{
        const query = "SELECT * FROM sistema.Agenda where data = ?";

        try{
            const agendaExiste = await executarComandoSQL(query, [data]);
            console.log('Data cadastrada:', agendaExiste);
            return agendaExiste;
        } catch(err: any){
            console.error(`Falha ao verificar agenda`, err);
            
        }
    }

    async geraFaturamento() :Promise<Number>{
        const query = "SELECT SUM(valorServico) from sistema.Agenda;"

>>>>>>> origin/New-dev
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

    async geraFaturamentoPorCliente(cpfCliente: string) :Promise<Number>{
        const query = "SELECT SUM(valorServico) from sistema.Agenda where cpfCliente = ?;"

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Number>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao gerar o faturamento por cliente da agenda: ${err}`);
            throw err;
        }
    }

    async geraFaturamentoPorPet(idPet: number) :Promise<Number>{
        const query = "SELECT SUM(valorServico) from sistema.Agenda where idPet = ?;"

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Number>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao gerar o faturamento por pet da agenda: ${err}`);
            throw err;
        }
    }
}