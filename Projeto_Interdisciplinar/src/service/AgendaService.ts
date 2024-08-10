import { AgendaEntity } from "../model/entity/Agenda";
import { AgendaRepository } from "../repository/AgendaRepository";
import { PetRepository } from "../repository/PetRepository";
import { ClienteRepository } from "../repository/ClienteRepository";
import { stringParaData } from "../util/DataUtil";

export class AgendaService{

    private agendaRepository = AgendaRepository.getInstance();
    private petRepository = PetRepository.getInstance();
    private clienteRepository = ClienteRepository.getInstance();

    async cadastrarAgenda(agendaData: any): Promise<AgendaEntity> { //Ao cadastrar um agendamento é necessário verificar qual o tipo de serviço escolhido para buscarmos na tabela Serviço se existe e descobrir o valor
        const { data,  tipoServico, valorServico, cpfCliente, idPet } = agendaData;

        const dataDate = stringParaData(data);

        const agendaEncontrada = await this.verificaAgenda(dataDate);//USAR AQUI A NOVA FUNÇÃO PARA VERIFICAR SE O AGENDAMENTO JÁ EXISTE NA DATA E HORA
        const petEncontrado = await this.petRepository.filterPet(idPet);
        const cpfClienteEncontrado = await this.clienteRepository.filterCliente(cpfCliente);

        if(agendaEncontrada && agendaEncontrada.data === data){ //PRECISA FAZER UMA FUNÇÃO PARA PODERMOS VERIFICAR SE JÁ HÁ O AGENDAMENTO NA DATA E HORA ESCOLHIDA
            throw new Error('Já há um agendamento nesta data.');
        } 
        else if(petEncontrado === null){
            throw new Error('Pet não encontrado.');
        }
        else if(cpfClienteEncontrado === null){
            throw new Error('Cliente não encontrado.');
        }
        else{
            const agenda = new AgendaEntity(undefined, data, tipoServico, valorServico, cpfCliente, idPet);
    
            const novaAgenda =  await this.agendaRepository.insertAgenda(agenda);
            console.log("Service - Insert ", novaAgenda);
            return novaAgenda;
        }
    }
    //FAZER A FUNÇÃO DE CADASTRAR APRESENTAR OS DADOS DO PET QUE SERÁ ATENDIDO, DADOS DO CLIENTE DONO DO PET E DADOS DO SERVIÇO ESCOLHIDO

    async atualizarAgenda(agendaData: any): Promise<AgendaEntity> { //Ao atualizar agenda deve ser possível trocar o tipo de serviço escolhido durante o cadastro
        const { id, data, tipoServico, valorServico, cpfCliente, idPet } = agendaData;
        const agendaEncontrada = await this.agendaRepository.filterAgenda(id);

        const dataDate = stringParaData(data);
        const dataEmUso = await this.agendaRepository.verificaAgenda(dataDate);

        const petEncontrado = await this.petRepository.filterPet(idPet);
        const cpfClienteEncontrado = await this.clienteRepository.filterCliente(cpfCliente);//USAR AQUI A NOVA FUNÇÃO PARA VERIFICAR SE O AGENDAMENTO JÁ EXISTE NA DATA E HORA

        if(agendaEncontrada === null){ //PRECISA FAZER UMA FUNÇÃO PARA PODERMOS VERIFICAR SE JÁ HÁ O AGENDAMENTO NA DATA E HORA ESCOLHIDA
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
        console.log("Service - Filtrar Todos", agenda);
        return agenda;
    }

    async verificaAgenda(data: Date): Promise<AgendaEntity | undefined> {
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
        const faturamento = await this.agendaRepository.geraFaturamentoPorCliente(cpfCliente);
        console.log("Service - Gera faturamento por cliente", faturamento);
        return faturamento;
    }

    async geraFaturamentoPorPet(idPet: any) :Promise<Number>{
        const faturamento = await this.geraFaturamentoPorPet(idPet);
        console.log("Service - Gera faturamento por pet", faturamento);
        return faturamento;
    }
    //GERAR FATURAMENTO SERIA SOMAR O VALOR DE TODOS OS SERVIÇOS
    //CRIAR FUNÇÃO GERAR FATURA TOTAL DA AGENDA
    //CRIAR FUNÇÃO GERAR FATURA POR CPF CLIENTE
    //CRIAR FUNÇÃO GERAR FATURA POR PET ID
}