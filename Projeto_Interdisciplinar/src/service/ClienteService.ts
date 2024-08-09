import { ClienteEntity } from "../model/entity/Cliente";
import { ClienteRepository } from "../repository/ClienteRepository";

export class ClienteService{

    private clienteRepository = ClienteRepository.getInstance();

    async cadastrarCliente(clienteData: any): Promise<ClienteEntity> { //Ao cadastrar cliente é necessário cadastrar pet, mas o cliente depois de cadastrado tbm poderá cadastrar pets separadamente
        const { cpf, nome, endereco, telefone } = clienteData;
        
        const cliente = new ClienteEntity(cpf, nome, endereco, telefone);

        const novocliente =  await this.clienteRepository.insertCliente(cliente);
        console.log("Service - Insert ", novocliente);
        return novocliente;
    }

    async atualizarCliente(clienteData: any): Promise<ClienteEntity> {
        const { cpf, nome, endereco, telefone } = clienteData;

        const cliente = new ClienteEntity(cpf, nome, endereco, telefone);

        await this.clienteRepository.updateCliente(cliente);
        console.log("Service - Update ", cliente);
        return cliente;
    }

    async deletarCliente(clienteData: any): Promise<ClienteEntity> { //Ao deletar um cliente é necessário deletar todos os pets ligados a esse cliente tbm
        const { cpf, nome, endereco, telefone } = clienteData;

        const cliente = new ClienteEntity(cpf, nome, endereco, telefone);

        await this.clienteRepository.deleteCliente(cliente);
        console.log("Service - Delete ", cliente);
        return cliente;
    }

    async filtrarCliente(clienteData: any): Promise<ClienteEntity> {
        const cliente =  await this.clienteRepository.filterCliente(clienteData.cpf);
        console.log("Service - Filtrar", cliente);
        return cliente;
    }

    async listarTodosClientes(): Promise<ClienteEntity[]> {
        const cliente =  await this.clienteRepository.filterAllCliente();
        console.log("Service - Filtrar Todos", cliente);
        return cliente;
    }
}