import { executarComandoSQL } from "../database/mysql";
import { PetEntity } from "../model/entity/Pet";

export class PetRepository{

    private static instance: PetRepository;

    private constructor(){
        this.createTable();
    }

    public static getInstance(): PetRepository {
        if(!this.instance) {
            this.instance = new PetRepository();
        }
        return this.instance;
    }

    private async createTable(){
        //PRECISA USAR FOREIGN KEY(por exemplo no cpfCliente)?
        const query = `
        CREATE TABLE IF NOT EXISTS sistema.Pet (
            id INT AUTO_INCREMENT PRIMARY KEY,
            cpfCliente VARCHAR(14) NOT NULL,
            nome VARCHAR(255) NOT NULL,
            idade INT NOT NULL,
            peso DECIMAL(10, 3) NOT NULL,
            especie VARCHAR(255) NOT NULL,
            historicoPet VARCHAR(255) NOT NULL,
            FOREIGN KEY (cpfCliente) REFERENCES sistema.cliente(cpf)
        )`;

        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Query exercutada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insertPet(pet:PetEntity) :Promise<PetEntity>{ //CADASTRAR UM pet
        const query = "INSERT INTO sistema.Pet (cpfCliente, nome, idade, peso, especie, historicoPet) VALUES (?, ?, ?, ?, ?, ?);" ;

        try {
            const resultado = await executarComandoSQL(query, [pet.cpfCliente, pet.nome, pet.idade, pet.peso, pet.especie, pet.historicoPet]);
            console.log('Pet cadastrado com sucesso, id: ', resultado.insertId);
            pet.id = resultado.insertId;
            return new Promise<PetEntity>((resolve)=>{
                resolve(pet);
            })
        } catch (err) {
            console.error('Erro ao cadastrar o pet:', err);
            throw err;
        }
    }

    async updatePet(pet:PetEntity) :Promise<PetEntity>{ //ATUALIZAR OS DADOS(NOME, ENDEREÇO E TELEFONE) DE UM pet PELO SEU CPF
        const query = "UPDATE sistema.pet set cpfCliente = ?, nome = ?, idade = ?, peso = ?, especie = ?, historicoPet = ? where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [pet.cpfCliente, pet.nome, pet.idade, pet.peso, pet.especie, pet.historicoPet, pet.id]);
            console.log('Pet atualizado com sucesso: ', resultado);
            return new Promise<PetEntity>((resolve)=>{
                resolve(pet);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o pet de id ${pet.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deletePet(id:number) :Promise<PetEntity>{ //DELETAR UM pet DO SISTEMA
        const query = "DELETE FROM sistema.Pet where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('pet deletado com sucesso: ', resultado);
            return new Promise<PetEntity>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o pet de id ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterPet(id: number) :Promise<PetEntity | null>{ //PROCURAR POR pet
        const query = "SELECT * FROM sistema.Pet where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Pet localizado com sucesso, id: ', resultado);
            if(resultado.length > 0){
                console.log("Pet encontrado com sucesso.");
                return resultado[0];
            }
            else{
                return null;
            }
        } catch (err:any) {
            console.error(`Falha ao procurar o pet de id ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllPet() :Promise<PetEntity[] | null>{ //LISTAR TODOS OS petS EXISTENTES
        const query = "SELECT * FROM sistema.Pet;" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            if(resultado.length > 0){
                console.log("Há pets cadastrados.", resultado);
                return resultado;
            }
            else{
                return null;
            }
        } catch (err:any) {
            console.error(`Falha ao listar os pets gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteTodosPetPorCliente(cpfCliente: string) :Promise<PetEntity[]>{ 
        const query = "DELETE FROM sistema.Pet where cpfCliente = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [cpfCliente]);
            console.log('pets deletado com sucesso: ', resultado);
            return new Promise<PetEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar os pet do  ${cpfCliente} gerando o erro: ${err}`);
            throw err;
        }
    }

    async pesquisarPetporCpf(cpfCliente: string) :Promise<PetEntity[] | null >{
        const query = "SELECT * FROM sistema.Pet where cpfCliente = ?;";

        try{
            const resultado = await executarComandoSQL(query, [cpfCliente]);
            if(resultado.length > 0){
                console.log('Pets encontrados com sucesso: ', resultado);
                return resultado;
            }
            else{
                return null;
            }
          
        } catch (err: any){
            console.error(`Falha ao procurar os pets do ${cpfCliente} gerando o erro: ${err}`);
            throw err;
        }
    }

}