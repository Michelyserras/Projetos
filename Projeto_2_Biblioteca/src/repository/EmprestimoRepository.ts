import { executarComandoSQL } from "../database/mysql";
import { EmprestimoEntity } from "../model/entity/Emprestimo";

export class EmprestimoRepository{

    private static instance: EmprestimoRepository;

    private constructor(){
        this.createTable();
    }

    public static getInstance(): EmprestimoRepository {
        if(!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }


    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Emprestimo (
            id INT AUTO_INCREMENT PRIMARY KEY,
            livroId INT NOT NULL,
            usuarioId INT NOT NULL,
            dataEmprestimo DATE NOT NULL,
            dataDevolucao DATE NOT NULL,
            FOREIGN KEY (livroId) REFERENCES biblioteca.Livros(id),
            FOREIGN KEY (usuarioId) REFERENCES biblioteca.Usuarios(id)
        )`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async realizarEmprestimo(Emprestimo: EmprestimoEntity): Promise<EmprestimoEntity>{
        const query = 'INSERT INTO biblioteca.Emprestimo(livroId, usuarioId, dataEmprestimo, dataDevolucao) VALUES (?,?,?,?)'
        try{
            const resultado = await executarComandoSQL(query, [Emprestimo.livroId, Emprestimo.usuarioId, Emprestimo.dataEmprestimo, Emprestimo.dataDevolucao]);
            console.log("Emprestimo realizado com sucesso!", resultado);
            Emprestimo.id = resultado.insertId;
            return new Promise<EmprestimoEntity>((resolve)=>{
                resolve(Emprestimo);
            })
        } catch (err) {
            console.error('Erro ao cadastrar a agenda:', err);
            throw err;
        }
    }

}