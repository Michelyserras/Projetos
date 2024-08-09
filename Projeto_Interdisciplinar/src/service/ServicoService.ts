import { ServicoEntity } from "../model/entity/Servico";
import { ServicoRepository } from "../repository/ServicoRepository";

export class ServicoService{

    private servicoRepository = ServicoRepository.getInstance();

    async cadastrarServico(servicoData: any): Promise<ServicoEntity> { //No cadastro teremos tipos de serviços prontos como banho e tosa, consultas veterinárias e aplicações de vacinas
        const { tipoServico, valor, descricao } = servicoData;
        const servicoEncontrado = await this.servicoRepository.verificaTipoServico(tipoServico);

        if(servicoEncontrado){
            throw new Error('Tipo de serviço já cadastrado.');
        }

        const servico = new ServicoEntity(undefined, tipoServico, valor, descricao);

        const novoServico =  await this.servicoRepository.insertServico(servico);
        console.log("Service - Insert ", novoServico);
        return novoServico;
    }

    async atualizarServico(servicoData: any): Promise<ServicoEntity> {
        const { id, tipoServico, valor, descricao } = servicoData;
        const servicoEncontrado = await this.filtrarServico(id);

        if(!servicoEncontrado){
            throw new Error('Tipo de serviço não encontrado.');
        }

        const servico = new ServicoEntity(id, tipoServico, valor, descricao);

        await this.servicoRepository.updateServico(servico);
        console.log("Service - Update ", servico);
        return servico;
    }

    async deletarServico(servicoData: any): Promise<ServicoEntity> {
        const { id, tipoServico, valor, descricao } = servicoData;
        const servicoEncontrado = await this.filtrarServico(id);

        if(!servicoEncontrado){
            throw new Error('Tipo de serviço não encontrado.');
        }

        const servico = new ServicoEntity(id, tipoServico, valor, descricao);

        await this.servicoRepository.deleteServico(servico);
        console.log("Service - Delete ", servico);
        return servico;
    }

    async filtrarServico(servicoData: any): Promise<ServicoEntity> {
        const servico =  await this.servicoRepository.filterServico(servicoData.id);
        console.log("Service - Filtrar", servico);
        return servico;
    }

    async listarTodosServicos(): Promise<ServicoEntity[]> {
        const servico =  await this.servicoRepository.filterAllServico();
        console.log("Service - Filtrar Todos", servico);
        return servico;
    }
}