import { ClienteEntity } from "../model/entity/Cliente";
import { PetEntity } from "../model/entity/Pet";
import { ClienteRepository } from "../repository/ClienteRepository";
import { PetRepository } from "../repository/PetRepository";


export class ClienteService{

    private clienteRepository = ClienteRepository.getInstance();
    private petRepository = PetRepository.getInstance();

    async cadastrarCliente(clienteData: any): Promise<ClienteEntity> {
        const { cpf, nome, endereco, telefone } = clienteData;
        const clienteEncontrado = await this.filtrarCliente(cpf);

        if(clienteEncontrado && clienteEncontrado.cpf === cpf){
            throw new Error('Cliente já cadastrado.');
        }
        
        const cliente = new ClienteEntity(cpf, nome, endereco, telefone);

        const novocliente =  await this.clienteRepository.insertCliente(cliente);
        console.log("Service - Insert ", novocliente);
        return novocliente;
    }

    async atualizarCliente(clienteData: any): Promise<ClienteEntity> {
        const { cpf, nome, endereco, telefone } = clienteData;
        const cpfEncontrado = await this.filtrarCliente(cpf);

        if(cpfEncontrado === null){
            throw new Error('Cliente não encontrado.');
        }

        const cliente = new ClienteEntity(cpf, nome, endereco, telefone);

        await this.clienteRepository.updateCliente(cliente);
        console.log("Service - Update ", cliente);
        return cliente;
    }

    async deletarCliente(cpf: any): Promise<ClienteEntity> { 
        const clienteEncontrado = await this.filtrarCliente(cpf);

        if(clienteEncontrado === null){
            throw new Error('Cliente não encontrado.');
        }

        const cliente = new ClienteEntity(clienteEncontrado.cpf, clienteEncontrado.nome, clienteEncontrado.endereco, clienteEncontrado.telefone);
        await this.petRepository.deleteTodosPetPorCliente(cpf); //DELETA TODOS OS PETS QUE PERTECEM AO CLIENTE

        await this.clienteRepository.deleteCliente(cpf);
        console.log("Service - Delete ", cliente);
        return cliente;
    }

    async filtrarCliente(clienteData: any): Promise<ClienteEntity | null> {
        const cliente =  await this.clienteRepository.filterCliente(clienteData);
        console.log("Service - Filtrar", cliente);
        return cliente;
    }

    async listarTodosClientes(): Promise<ClienteEntity[] | null> {
        const cliente =  await this.clienteRepository.filterAllCliente();
        console.log("Service - Filtrar Todos", cliente);
        return cliente;
    }
}