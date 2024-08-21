import { Request, Response } from "express";
import { Controller, Route, Body, Res, Tags, TsoaResponse, Post, Get, Put, Delete, Query} from "tsoa";
import { AgendaRequestDto } from "../model/dto/AgendaRequestDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { AgendaService } from "../service/AgendaService";
import { AgendaEntity } from "../model/entity/Agenda";
// aaaaaaaaaaa
@Route("agenda")
@Tags("Agenda")
export class AgendaController{ 
    agendaService = new AgendaService();
    
    @Post('Cadastrar agenda')
    async cadastrarAgenda(
        @Body() dto:AgendaRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
            try {
                const novoagenda =  await this.agendaService.cadastrarAgenda(dto);
               return sucess(201, new BasicResponseDto("Agenda cadastrada com sucesso!", novoagenda));
            } catch (error: any) {
                return fail(400, new BasicResponseDto(error.message, undefined));
            }
    };
        
    
    @Put('Atualizar agenda')
    async atualizarAgenda(
        @Body() agenda:AgendaEntity,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
            try {
                const agendaAtlz = await this.agendaService.atualizarAgenda(agenda);
                return sucess(200, new BasicResponseDto("Os dados da agenda foram atualizados com sucesso!", agendaAtlz));
            } catch (error: any) {
                return fail(400, new BasicResponseDto(error.message, undefined));
            }
        };
        
    
    @Delete('Deletar agenda')
    async deleteAgenda(
        @Query() param:number, 
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const agenda = await this.agendaService.deletarAgenda(param);
            return sucess(200, new BasicResponseDto("Agenda excluida com suceso!", agenda));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
        
   //foi necessário nomear uma rota dentro dos dois metodos http get, para o tsoa entender que os dois executam diferentes funções
      
    @Get('filtrarAgenda')
    async filtrarAgenda(
        @Query() param:number,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const agenda = await this.agendaService.filtrarAgenda(param);
            if(agenda === null){
                return notFound(404, new BasicResponseDto("Agendamento não encontrado.", undefined));
            }
            return sucess(200, new BasicResponseDto("Agenda encontrada com suceso!", agenda));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
        
    
    @Get('ListarTodasAgendas')
    async ListarTodasAgendas(
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const agendas = await this.agendaService.listarTodasAgendas();
            if(agendas === null){
                return notFound(404, new BasicResponseDto("A agenda está vazia.", undefined));
            }
            return sucess(200, new BasicResponseDto("Agendas encontrados com suceso!", agendas));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };

    @Get('geraFaturamento')
    async geraFaturamento(
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const faturamento = await this.agendaService.geraFaturamento();
            return sucess(200, new BasicResponseDto("Faturamento total da agenda:", faturamento));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get('geraFaturamentoPorCliente')
    async geraFaturamentoPorCliente(
        @Query() param: string,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const faturamento = await this.agendaService.geraFaturamentoPorCliente(param);
            return sucess(200, new BasicResponseDto("Valor total da agenda do cliente:", faturamento));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));        
        }
    }

    @Get('geraFaturamentoPorPet')
    async geraFaturamentoPorPet(
        @Query() param: number,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const faturamento = await this.agendaService.geraFaturamentoPorPet(param);
            return sucess(200, new BasicResponseDto("Valor total da agenda do pet:", faturamento));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get('PesquisarAgendaPorCpf')
    async pesquisarAgendaPorCpf(
        @Query() Cpf: string,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const agendamentos = await this.agendaService.listarTodasAgendasPorCpf(Cpf);
            if(agendamentos === null){
                return notFound(404, new BasicResponseDto(`Não há agendamentos vinculados ao cpf:${Cpf}`, undefined));
            }
            return sucess(200, new BasicResponseDto(`Agendamentos do cliente: ${Cpf} encontrados com suceso!`, agendamentos));
        }catch (error: any){
            return fail(400, new BasicResponseDto(error.message, undefined));      
         }
    }

}
