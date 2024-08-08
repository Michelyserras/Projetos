import { ServicoEntity } from "../model/entity/Servico";
import { ServicoRepository } from "../repository/ServicoRepository";

export class ServicoService{

    private servicoRepository = ServicoRepository.getInstance();

    async cadastrarServico(servicoData: any): Promise<ServicoEntity> {
        const { tipoServico, valor, descricao } = servicoData;
        
        const servico = new ServicoEntity(undefined, tipoServico, valor, descricao);

        const novoServico =  await this.servicoRepository.insertServico(servico);
        console.log("Service - Insert ", novoServico);
        return novoServico;
    }

    async atualizarServico(servicoData: any): Promise<ServicoEntity> {
        const { id, tipoServico, valor, descricao } = servicoData;

        const servico = new ServicoEntity(id, tipoServico, valor, descricao);

        await this.servicoRepository.updateServico(servico);
        console.log("Service - Update ", servico);
        return servico;
    }

    async deletarservico(servicoData: any): Promise<ServicoEntity> {
        const { id, tipoServico, valor, descricao } = servicoData;

        const servico = new ServicoEntity(id, tipoServico, valor, descricao);

        await this.servicoRepository.deleteServico(servico);
        console.log("Service - Delete ", servico);
        return servico;
    }

    async filtrarservico(servicoData: any): Promise<ServicoEntity> {
        const servico =  await this.servicoRepository.filterServico(servicoData.id);
        console.log("Service - Filtrar", servico);
        return servico;
    }

    async listarTodosservicos(): Promise<ServicoEntity[]> {
        const servico =  await this.servicoRepository.filterAllServico();
        console.log("Service - Filtrar Todos", servico);
        return servico;
    }
}