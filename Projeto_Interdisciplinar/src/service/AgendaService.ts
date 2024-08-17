import { AgendaEntity } from "../model/entity/Agenda";
import { AgendaRepository } from "../repository/AgendaRepository";
import { PetRepository } from "../repository/PetRepository";
import { ClienteRepository } from "../repository/ClienteRepository";
import { adjusteTimeZone, stringParaData } from "../util/DataUtil";
import { AgendaRequestDto } from "../model/dto/AgendaRequestDto";


export class AgendaService{

    private agendaRepository = AgendaRepository.getInstance();
    private petRepository = PetRepository.getInstance();
    private clienteRepository = ClienteRepository.getInstance();

    async cadastrarAgenda(agendaData: any): Promise<AgendaEntity> { 
        const { data, tipoServico, valorServico, cpfCliente, idPet } = agendaData;

        let agenda = new AgendaEntity(undefined, data, tipoServico, valorServico, cpfCliente, idPet);

        const agendaEncontrada = await this.verificaAgenda(agenda.data);
        const petEncontrado = await this.petRepository.filterPet(idPet);
        const cpfClienteEncontrado = await this.clienteRepository.filterCliente(cpfCliente);

        if(agendaEncontrada){ 
            throw new Error('Já há um agendamento nesta data.');
        } 
        else if(petEncontrado === null){
            throw new Error('Pet não encontrado.');
        }
        else if(cpfClienteEncontrado === null){
            throw new Error('Cliente não encontrado.');
        }
        
        else{
            const novaAgenda =  await this.agendaRepository.insertAgenda(agenda);
            console.log("Service - Insert ", novaAgenda);
            return novaAgenda;
        }
    }

    async atualizarAgenda(agendaData: any): Promise<AgendaEntity> { 
        const { id, data, tipoServico, valorServico, cpfCliente, idPet } = agendaData;
        const agendaEncontrada = await this.agendaRepository.filterAgenda(id);

        const dataDate = stringParaData(data);
        const dataEmUso = await this.agendaRepository.verificaAgenda(dataDate.toString());

        const petEncontrado = await this.petRepository.filterPet(idPet);
        const cpfClienteEncontrado = await this.clienteRepository.filterCliente(cpfCliente);

        if(agendaEncontrada === null){ 
            throw new Error('Agendamento não encontrado.');
        }
        else if(dataEmUso && dataEmUso.data === data){
            throw new Error('Já há um agendamento nesta data.');
        }
        else if(petEncontrado === null){
            throw new Error('Pet não encontrado.');
        }
        else if(cpfClienteEncontrado === null){
            throw new Error('Cliente não encontrado.');
        }
        else{
            const agenda = new AgendaEntity(id, data, tipoServico, valorServico, cpfCliente, idPet);
    
            await this.agendaRepository.updateAgenda(agenda);
            console.log("Service - Update ", agenda);
            return agenda;
        }
    }

    async deletarAgenda(agendaData: any): Promise<AgendaEntity> { 
        const { id, data, tipoServico, valorServico, cpfCliente, idPet } = agendaData;
        const agendaEncontrada = await this.filtrarAgenda(agendaData);

        if(agendaEncontrada === null){
            throw new Error('Agendamento não encontrado.');
        }

        const agenda = new AgendaEntity(id, data, tipoServico, valorServico, cpfCliente, idPet);

        await this.agendaRepository.deleteAgenda(agenda);
        console.log("Service - Delete ", agenda);
        return agenda;
    }

    async filtrarAgenda(agendaData: any): Promise<AgendaEntity | null> {
        const agenda =  await this.agendaRepository.filterAgenda(agendaData);
        console.log("Service - Filtrar", agenda);
        return agenda;
    }

    async listarTodasAgendas(): Promise<AgendaEntity[] | null> {
        const agenda =  await this.agendaRepository.filterAllAgenda();
        if(agenda === null){
            console.log("Não há agendamentos marcados.");
            return null;
        }
        else{
            console.log("Service - Filtrar Todos", agenda);
            return agenda;
        }
    }

    async verificaAgenda(data: string): Promise<AgendaEntity | undefined> {
        const agendaExiste = await this.agendaRepository.verificaAgenda(data);
        console.log("Service - Verifica agenda", agendaExiste);
        return agendaExiste;
    }

    async geraFaturamento() :Promise<Number>{
        const faturamento = await this.agendaRepository.geraFaturamento();
        console.log("Service - Gerar faturamento total", faturamento);
        return faturamento;
    }

    async geraFaturamentoPorCliente(cpfCliente: any) :Promise<Number>{
        const clienteEncontrado = await this.clienteRepository.filterCliente(cpfCliente);

        if(clienteEncontrado === null){
            console.log("Cliente não existe.");
            throw new Error("Este cliente não está cadastrado.");
        }

        const faturamento = await this.agendaRepository.geraFaturamentoPorCliente(cpfCliente);
        console.log("Service - Gera faturamento por cliente", faturamento);
        return faturamento;
    }

    async geraFaturamentoPorPet(idPet: any) :Promise<Number>{
        const petEncontrado = await this.petRepository.filterPet(idPet);

        if(petEncontrado === null){
            console.log("Pet não existe.");
            throw new Error("Este pet não está cadastrado.");
        }

        const faturamento = await this.agendaRepository.geraFaturamentoPorPet(idPet);
        console.log("Service - Gera faturamento por pet", faturamento);
        return faturamento;
    }
    //GERAR FATURAMENTO SERIA SOMAR O VALOR DE TODOS OS SERVIÇOS
    //CRIAR FUNÇÃO GERAR FATURA TOTAL DA AGENDA
    //CRIAR FUNÇÃO GERAR FATURA POR CPF CLIENTE
    //CRIAR FUNÇÃO GERAR FATURA POR PET ID

    async listarTodasAgendasPorCpf(cpfCliente: any): Promise<AgendaEntity[] | null> {
        const agenda =  await this.agendaRepository.pesquisarAgendaPorCPF(cpfCliente);
        if(agenda === null){
            console.log(`Não há agendamentos vinculados ao cliente: ${cpfCliente}`);
            return null;
        }
        else{
            console.log("Service - Filtrar Todos Por CPF", agenda);
            return agenda;
        }
    }
}