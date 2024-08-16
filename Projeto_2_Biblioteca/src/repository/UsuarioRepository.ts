import { executarComandoSQL } from "../database/mysql";
import { UsuarioEntity } from "../model/entity/UsuarioEntity";

export class UsuarioRepository{

    private static instance: UsuarioRepository;

    private constructor(){
        this.createTable();
    }

    public static getInstance(): UsuarioRepository {
        if(!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }


    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            idPessoa INT NOT NULL,
            senha VARCHAR(255) NOT NULL,
            FOREIGN KEY (idPessoa) REFERENCES biblioteca.Pessoas(id)
        )`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async cadastrarUsuario(Usuario: UsuarioEntity): Promise<UsuarioEntity>{
        const query = 'INSERT INTO biblioteca.Usuarios(idPessoa, senha) VALUES (?,?);'
        try{
            const resultado = await executarComandoSQL(query, [Usuario.idPessoa, Usuario.senha]);
            console.log("Usuario cadastrado com sucesso:", resultado);
            Usuario.id = resultado.insertId;
            return new Promise<UsuarioEntity>((resolve)=>{
                resolve(Usuario);
            })
        } catch (err) {
            console.error('Erro ao cadastrar novo usuario!', err);
            throw err;
        }
    }

    async atualizarUsuario(Usuario: UsuarioEntity): Promise<UsuarioEntity>{
        const query = 'UPDATE biblioteca.Usuarios SET idPessoa= ?, senha = ? WHERE id = ?;';

        try{
            const resultado = await executarComandoSQL(query, [Usuario.idPessoa, Usuario.senha, Usuario.id]);
            console.log("Usuario atualizado com sucesso:", resultado);
            return new Promise<UsuarioEntity>((resolve)=>{
                resolve(Usuario);
            })
        }catch(err: any){
            console.error('Erro ao atualizar os dados do Usuario', err);
            throw err;
        }
    }

    async filtrarUsuarioPorId(id: number): Promise<UsuarioEntity | null>{
        const query = 'SELECT * FROM biblioteca.Usuarios WHERE id = ?;';
        try{
            const resultado = await executarComandoSQL(query,[id]);
            if(resultado.length > 0){
                console.log("Usuario localizado com sucesso:", resultado);
                return resultado;
            }
            else{
                return null;
            }
        }catch(err: any){
            console.error(`Erro ao localizar Usuario com id = ${id} na base de dados`, err);
            throw err;
        }
    }

    async listarTodosUsuarios(): Promise<UsuarioEntity[] | null>{
        const query = 'SELECT * FROM biblioteca.Usuarios;';

        try{
            const resultado = await executarComandoSQL(query, []);
            if(resultado.length > 0){
                console.log("Usuarios cadastrados: ", resultado);
                return resultado;
            }
            else{
                return null;
            }
        }catch(err: any){
        console.error(`Erro ao listar Usuarios cadastrados!`, err);
        throw err;
        }
    }

    async deletarUsuario(id: number): Promise<UsuarioEntity>{
        const query = 'DELETE FROM biblioteca.Usuarios WHERE id = ?;';
        try{

            const resultado = await executarComandoSQL(query,[id]);
            console.log(`O Usuario com o id = ${id} foi deletada com sucesso!`, resultado);
            return new Promise<UsuarioEntity>((resolve)=>{
                resolve(resultado);
            });

        }catch (err: any){
            console.error(`Erro ao deletar Usuario com id = ${id}`, err);
            throw err;
        }
    }

}