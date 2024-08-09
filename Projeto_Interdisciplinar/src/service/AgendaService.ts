import { AgendaEntity } from "../model/entity/Agenda";
import { ServicoEntity } from "../model/entity/Servico";
import { AgendaRepository } from "../repository/AgendaRepository";
import { ServicoRepository } from "../repository/ServicoRepository";
import { PetRepository } from "../repository/PetRepository";
import { ClienteRepository } from "../repository/ClienteRepository";

export class AgendaService{

    private agendaRepository = AgendaRepository.getInstance();
    private servicoRepository = ServicoRepository.getInstance();
    private petRepository = PetRepository.getInstance();
    private clienteRepository = ClienteRepository.getInstance();

    async cadastrarAgenda(agendaData: any): Promise<AgendaEntity> { //Ao cadastrar um agendamento é necessário verificar qual o tipo de serviço escolhido para buscarmos na tabela Serviço se existe e descobrir o valor
        const { data, hora, idServico, cpfCliente, idPet } = agendaData;
        const agendaEncontrada = await this.filtrarAgenda(agendaData);//USAR AQUI A NOVA FUNÇÃO PARA VERIFICAR SE O AGENDAMENTO JÁ EXISTE NA DATA E HORA
        const petEncontrado = await this.petRepository.filterPet(idPet);
        const cpfClienteEncontrado = await this.clienteRepository.filterCliente(cpfCliente);

        if(agendaEncontrada){ //PRECISA FAZER UMA FUNÇÃO PARA PODERMOS VERIFICAR SE JÁ HÁ O AGENDAMENTO NA DATA E HORA ESCOLHIDA
            throw new Error('Já há um agendamento nesta data e hora.');
        } 
        else if(!petEncontrado){
            throw new Error('Pet não encontrado.');
        }
        else if(!cpfCliente){
            throw new Error('Cliente não encontrado.');
        }
        else{
            const agenda = new AgendaEntity(undefined, data, hora, idServico, cpfCliente, idPet);
    
            const novaAgenda =  await this.agendaRepository.insertAgenda(agenda);
            console.log("Service - Insert ", novaAgenda);
            return novaAgenda;
        }
    }
    //FAZER A FUNÇÃO DE CADASTRAR APRESENTAR OS DADOS DO PET QUE SERÁ ATENDIDO, DADOS DO CLIENTE DONO DO PET E DADOS DO SERVIÇO ESCOLHIDO

    async atualizarAgenda(agendaData: any): Promise<AgendaEntity> { //Ao atualizar agenda deve ser possível trocar o tipo de serviço escolhido durante o cadastro
        const { id, data, hora, idServico, cpfCliente, idPet } = agendaData;
        const agendaEncontrada = await this.filtrarAgenda(agendaData);
        const petEncontrado = await this.petRepository.filterPet(idPet);
        const cpfClienteEncontrado = await this.clienteRepository.filterCliente(cpfCliente);//USAR AQUI A NOVA FUNÇÃO PARA VERIFICAR SE O AGENDAMENTO JÁ EXISTE NA DATA E HORA

        if(agendaEncontrada){ //PRECISA FAZER UMA FUNÇÃO PARA PODERMOS VERIFICAR SE JÁ HÁ O AGENDAMENTO NA DATA E HORA ESCOLHIDA
            throw new Error('Já há um agendamento nesta data e hora.');
        }
        else if(!petEncontrado){
            throw new Error('Pet não encontrado.');
        }
        else if(!cpfCliente){
            throw new Error('Cliente não encontrado.');
        }
        else{
            const agenda = new AgendaEntity(id, data, hora, idServico, cpfCliente, idPet);
    
            await this.agendaRepository.updateAgenda(agenda);
            console.log("Service - Update ", agenda);
            return agenda;
        }
    }

    async deletarAgenda(agendaData: any): Promise<AgendaEntity> { 
        const { id, data, hora, idServico, cpfCliente, idPet } = agendaData;
        const agendaEncontrada = await this.filtrarAgenda(agendaData);
        
        if(!agendaEncontrada){
            throw new Error('Agendamento não encontrado.');
        }

        const agenda = new AgendaEntity(id, data, hora, idServico, cpfCliente, idPet);

        await this.agendaRepository.deleteAgenda(agenda);
        console.log("Service - Delete ", agenda);
        return agenda;
    }

    async filtrarAgenda(agendaData: any): Promise<AgendaEntity> {
        const agenda =  await this.agendaRepository.filterAgenda(agendaData.id);
        console.log("Service - Filtrar", agenda);
        return agenda;
    }

    async listarTodasAgendas(): Promise<AgendaEntity[]> {
        const agenda =  await this.agendaRepository.filterAllAgenda();
        console.log("Service - Filtrar Todos", agenda);
        return agenda;
    }

    //GERAR FATURAMENTO SERIA SOMAR O VALOR DE TODOS OS SERVIÇOS
    //CRIAR FUNÇÃO GERAR FATURA TOTAL DA AGENDA
    //CRIAR FUNÇÃO GERAR FATURA POR CPF CLIENTE
    //CRIAR FUNÇÃO GERAR FATURA POR PET ID
}