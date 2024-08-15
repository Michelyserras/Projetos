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
        CREATE TABLE IF NOT EXISTS biblioteca.Emprestimos(
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
        const query = 'INSERT INTO biblioteca.Emprestimos(livroId, usuarioId, dataEmprestimo, dataDevolucao) VALUES (?,?,?,?)'
        try{
            const resultado = await executarComandoSQL(query, [Emprestimo.livroId, Emprestimo.usuarioId, Emprestimo.dataEmprestimo, Emprestimo.dataDevolucao]);
            console.log("Emprestimo realizado com sucesso!", resultado);
            Emprestimo.id = resultado.insertId;
            return new Promise<EmprestimoEntity>((resolve)=>{
                resolve(Emprestimo);
            })
        } catch (err) {
            console.error('Erro ao realizar emprestimo:', err);
            throw err;
        }
    }

    async atualizarEmprestimo(Emprestimo: EmprestimoEntity): Promise<EmprestimoEntity>{
        const query = 'UPDATE biblioteca.Emprestimos SET livroId = ?, usuarioId = ?, dataEmprestimo = ?, dataDevolucao = ? WHERE id = ?;';

        try{
            const resultado = await executarComandoSQL(query, [Emprestimo.livroId, Emprestimo.usuarioId, Emprestimo.dataEmprestimo, Emprestimo.dataDevolucao, Emprestimo.id]);
            console.log("Emprestimo atualizado com sucesso:", resultado);
            return new Promise<EmprestimoEntity>((resolve)=>{
                resolve(Emprestimo);
            })
        }catch(err: any){
            console.error('Erro ao atualizar os dados da Emprestimo', err);
            throw err;
        }
    }

    async filtrarEmprestimoPorId(id: number): Promise<EmprestimoEntity | null>{
        const query = 'SELECT * FROM biblioteca.Emprestimos WHERE id = ?';
        try{
            const resultado = await executarComandoSQL(query,[id]);
            if(resultado.length > 0){
                console.log("Emprestimo localizado com sucesso:", resultado);
                return resultado;
            }
            else{
                return null;
            }
        }catch(err: any){
            console.error(`Erro ao localizar Emprestimo com id = ${id} na base de dados`, err);
            throw err;
        }
    }

    async listarTodasEmprestimos(): Promise<EmprestimoEntity[] | null>{
        const query = 'SELECT * FROM biblioteca.Emprestimos;';

        try{
            const resultado = await executarComandoSQL(query, []);
            if(resultado.length > 0){
                console.log("Emprestimos realizados: ", resultado);
                return resultado;
            }
            else{
                return null;
            }
        }catch(err: any){
        console.error(`Erro ao listar Emprestimos realizados!`, err);
        throw err;
        }
    }

    async deletarEmprestimo(id: number): Promise<EmprestimoEntity>{
        const query = 'DELETE * FROM biblioteca.Emprestimos WHERE id = ?;';
        try{

            const resultado = await executarComandoSQL(query,[id]);
            console.log(`O Emprestimo com o id = ${id} foi deletado com sucesso!`, resultado);
            return new Promise<EmprestimoEntity>((resolve)=>{
                resolve(resultado);
            });

        }catch (err: any){
            console.error(`Erro ao deletar Emprestimo com id = ${id}`, err);
            throw err;
        }
    }

}