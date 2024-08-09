import { Request, Response } from "express";
import { Controller, Route, Body, Res, Tags, TsoaResponse, Post, Get, Put, Delete, Query} from "tsoa";
import { AgendaRequestDto } from "../model/dto/AgendaRequestDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { AgendaService } from "../service/AgendaService";
// aaaaaaaaaaa
@Route("agenda")
@Tags("Agenda")
export class AgendaController{ 
    agendaService = new AgendaService();
    
    @Post()
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
        
    
    @Put()
    async atualizarAgenda(
        @Body() dto:AgendaRequestDto,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
            try {
                const agendaAtlz = await this.agendaService.atualizarAgenda(dto);
                return sucess(200, new BasicResponseDto("Os dados do Agenda foram atualizado com sucesso!", agendaAtlz));
            } catch (error: any) {
                return fail(400, new BasicResponseDto(error.message, undefined));
            }
        };
        
    
    @Delete()
    async deleteAgenda(
        @Body() dto:AgendaRequestDto,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const agenda = await this.agendaService.deletarAgenda(dto);
            return sucess(200, new BasicResponseDto("Agenda excluido com suceso!", agenda));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
        
    
    @Get()
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
        
    
    @Get()
    async ListarTodosAgendas(
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const agenda = await this.agendaService.listarTodasAgendas();
            return sucess(200, new BasicResponseDto("AgendaS encontrados com suceso!", agenda));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
}
