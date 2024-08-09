import { AgendaEntity } from "../model/entity/Agenda";
import { AgendaRepository } from "../repository/AgendaRepository";

export class AgendaService{

    private agendaRepository = AgendaRepository.getInstance();

    async cadastrarAgenda(agendaData: any): Promise<AgendaEntity> { //Ao cadastrar um agendamento é necessário verificar qual o tipo de serviço escolhido para determinar o valor
        const { data, hora, tipoServico, cpfCliente, idPet } = agendaData;
        
        const agenda = new AgendaEntity(undefined, data, hora, tipoServico, cpfCliente, idPet);

        const novaAgenda =  await this.agendaRepository.insertAgenda(agenda);
        console.log("Service - Insert ", novaAgenda);
        return novaAgenda;
    }

    async atualizarAgenda(agendaData: any): Promise<AgendaEntity> { //Ao atualizar agenda deve ser possível trocar o tipo de serviço escolhido durante o cadastro
        const { id, data, hora, tipoServico, cpfCliente, idPet } = agendaData;

        const agenda = new AgendaEntity(id, data, hora, tipoServico, cpfCliente, idPet);

        await this.agendaRepository.updateAgenda(agenda);
        console.log("Service - Update ", agenda);
        return agenda;
    }

    async deletarAgenda(agendaData: any): Promise<AgendaEntity> { 
        const { id, data, hora, tipoServico, cpfCliente, idPet } = agendaData;

        const agenda = new AgendaEntity(id, data, hora, tipoServico, cpfCliente, idPet);

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
}