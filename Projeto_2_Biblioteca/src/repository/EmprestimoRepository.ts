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
            price DECIMAL(10,2) NOT NULL,
            expirationDate DATE NOT NULL
        )`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

}