import {executarComandoSQL} from "../database/mysql";
import { LivroEntity } from "../model/entity/LivroEntity";

export class LivroRepository{
    private static instance: LivroRepository;

    private constructor(){
        this.createTable();
    }

    public static getInstance(): LivroRepository {
        if(!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance;
    }


    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Livros (
            id INT AUTO_INCREMENT PRIMARY KEY,
            titulo VARCHAR(50) NOT NULL,
            autor VARCHAR(50) NOT NULL,
            categoriaId INT NOT NULL,
            FOREIGN KEY (categoriaId) REFFERENCES biblioteca.Categorias(id)
        );`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async cadastrarLivro(Livro: LivroEntity): Promise<LivroEntity>{
        const query = 'INSERT INTO biblioteca.Livros(titulo, autor, categoriaId) VALUES (?,?,?)'
        try{
            const resultado = await executarComandoSQL(query, [Livro.autor, Livro.titulo, Livro.categoriaId]);
            console.log("Livro cadastrado com sucesso:", resultado);
            Livro.id = resultado.insertId;
            return new Promise<LivroEntity>((resolve)=>{
                resolve(Livro);
            })
        } catch (err) {
            console.error('Erro ao cadastrar um novo Livro:', err);
            throw err;
        }
    }

    async atualizarLivro(Livro: LivroEntity): Promise<LivroEntity>{
        const query = 'UPDATE biblioteca.Livros SET autor = ?, titulo = ?, categoriaId = ? WHERE id = ?;';

        try{
            const resultado = await executarComandoSQL(query, [Livro.autor, Livro.titulo, Livro.categoriaId, Livro.id]);
            console.log("Livro atualizado com sucesso:", resultado);
            return new Promise<LivroEntity>((resolve)=>{
                resolve(Livro);
            })
        }catch(err: any){
            console.error('Erro ao atualizar os dados do Livro', err);
            throw err;
        }
    }

    async filtrarLivroPorId(id: number): Promise<LivroEntity | null>{
        const query = 'SELECT * FROM biblioteca.Livros WHERE id = ?';
        try{
            const resultado = await executarComandoSQL(query,[id]);
            if(resultado.length > 0){
                console.log("Livro localizado com sucesso:", resultado);
                return resultado;
            }
            else{
                return null;
            }
        }catch(err: any){
            console.error(`Erro ao localizar Livro com id = ${id} na base de dados`, err);
            throw err;
        }
    }

    async listarTodasLivros(): Promise<LivroEntity[] | null>{
        const query = 'SELECT * FROM biblioteca.Livros;';

        try{
            const resultado = await executarComandoSQL(query, []);
            if(resultado.length > 0){
                console.log("Livros cadastrados: ", resultado);
                return resultado;
            }
            else{
                return null;
            }
        }catch(err: any){
        console.error(`Erro ao listar Livros cadastrados!`, err);
        throw err;
        }
    }

    async deletarLivro(id: number): Promise<LivroEntity>{
        const query = 'DELETE * FROM biblioteca.Livros WHERE id = ?;';
        try{
            const resultado = await executarComandoSQL(query,[id]);
            console.log(`O Livro com o id = ${id} foi deletado com sucesso!`, resultado);
            return new Promise<LivroEntity>((resolve)=>{
                resolve(resultado);
            });
        }catch (err: any){
            console.error(`Erro ao deletar Livro com id = ${id}`, err);
            throw err;
        }

    }


}