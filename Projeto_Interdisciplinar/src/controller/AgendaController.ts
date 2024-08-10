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
               return sucess(201, new BasicResponseDto("Agenda cadastrado com sucesso!", novoagenda));
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
                return sucess(200, new BasicResponseDto("Os dados do Agenda foram atualizado com sucesso!", agendaAtlz));
            } catch (error: any) {
                return fail(400, new BasicResponseDto(error.message, undefined));
            }
        };
        
    
    @Delete('Deletar agenda')
    async deleteAgenda(
        @Body() agendaBody:AgendaEntity, //ALTERAR PARA PARAMETRO EM TODAS AS FUNÇÕES DEPOIS, PARA RECEBER APENAS O ID
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const agenda = await this.agendaService.deletarAgenda(agendaBody);
            return sucess(200, new BasicResponseDto("Agenda excluido com suceso!", agenda));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
        
   //foi necessário nomear uma rota dentro dos dois metodos http get, para o tsoa entender que os dois executam diferentes funções
      
    @Get('filtrarAgenda')
    async filtrarAgenda(
        @Query() param:number,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const agenda = await this.agendaService.filtrarAgenda(param);
            return sucess(200, new BasicResponseDto("Agenda encontrado com suceso!", agenda));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
        
    
    @Get('ListarTodasAgendas')
    async ListarTodasAgendas(
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const agendas = await this.agendaService.listarTodasAgendas();
            return sucess(200, new BasicResponseDto("AgendaS encontrados com suceso!", agendas));
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
            return sucess(200, new BasicResponseDto("Faturamento total da agenda com sucesso!", faturamento));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }
}
