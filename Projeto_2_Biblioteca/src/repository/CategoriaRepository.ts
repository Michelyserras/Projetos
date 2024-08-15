import {executarComandoSQL} from "../database/mysql";
import { CategoriaEntity } from "../model/entity/Categoria";

export class CategoriaRepository{
    private static instance: CategoriaRepository;

    private constructor(){
        this.createTable();
    }

    public static getInstance(): CategoriaRepository {
        if(!this.instance) {
            this.instance = new CategoriaRepository();
        }
        return this.instance;
    }


    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Categorias (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(50) NOT NULL,
        );`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async cadastrarCategoria(Categoria: CategoriaEntity): Promise<CategoriaEntity>{
        const query = 'INSERT INTO biblioteca.Categorias(nome) VALUES (?);';
        try{
            const resultado = await executarComandoSQL(query, [Categoria.nome]);
            console.log("Categoria cadastrada com sucesso:", resultado);
            Categoria.id = resultado.insertId;
            return new Promise<CategoriaEntity>((resolve)=>{
                resolve(Categoria);
            })
        } catch (err) {
            console.error('Erro ao cadastrar uma nova categoria:', err);
            throw err;
        }
    }

    async atualizarCategoria(Categoria: CategoriaEntity): Promise<CategoriaEntity>{
        const query = 'UPDATE biblioteca.Categorias SET nome = ? WHERE id = ?;';

        try{
            const resultado = await executarComandoSQL(query, [Categoria.nome, Categoria.id]);
            console.log("Categoria atualizada com sucesso:", resultado);
            return new Promise<CategoriaEntity>((resolve)=>{
                resolve(Categoria);
            })
        }catch(err: any){
            console.error('Erro ao atualizar os dados da Categoria', err);
            throw err;
        }
    }

    async filtrarCategoriaPorId(id: number): Promise<CategoriaEntity | null>{
        const query = 'SELECT * FROM biblioteca.Categorias WHERE id = ?';
        try{
            const resultado = await executarComandoSQL(query,[id]);
            if(resultado.length > 0){
                console.log("Categoria localizada com sucesso:", resultado);
                return resultado;
            }
            else{
                return null;
            }
        }catch(err: any){
            console.error(`Erro ao localizar Categoria com id = ${id} na base de dados`, err);
            throw err;
        }
    }

    async listarTodasCategorias(): Promise<CategoriaEntity[] | null>{
        const query = 'SELECT * FROM biblioteca.Categorias;';

        try{
            const resultado = await executarComandoSQL(query, []);
            if(resultado.length > 0){
                console.log("Categorias cadastrados: ", resultado);
                return resultado;
            }
            else{
                return null;
            }
        }catch(err: any){
        console.error(`Erro ao listar Categorias cadastrados!`, err);
        throw err;
        }
    }

    async deletarCategoria(id: number): Promise<CategoriaEntity>{
        const query = 'DELETE * FROM biblioteca.Categorias WHERE id = ?;';
        try{
            const resultado = await executarComandoSQL(query,[id]);
            console.log(`A Categoria com o id = ${id} foi deletada com sucesso!`, resultado);
            return new Promise<CategoriaEntity>((resolve)=>{
                resolve(resultado);
            });
        }catch (err: any){
            console.error(`Erro ao deletar Categoria com id = ${id}`, err);
            throw err;
        }

    }

    async pesquisarCategoriaPorNome(nome: string): Promise<CategoriaEntity | null>{
        const query = 'SELECT * FROM biblioteca.Categorias WHERE nome = ?;';
        try{
            const categoriaExiste = await executarComandoSQL(query, [nome]);
            if(categoriaExiste.length > 0){
                console.log(` Já existe uma categoria com o nome: ${nome} na base de dados`, categoriaExiste);
                return categoriaExiste;
            }
            else{
                return null;
            }
        }catch(err: any){
            console.error(`Erro ao localizar Categoria`, err);
            throw err;
        }
        }
}