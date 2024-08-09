import { Request, Response } from "express";
import { Controller, Route, Body, Res, Tags, TsoaResponse, Post, Get, Put, Delete, Query} from "tsoa";
import { ServicoRequestDto } from "../model/dto/ServicoRequestDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { ServicoService } from "../service/ServicoService";
// aaaaaaaaaaa
@Route("Servico")
@Tags("Servico")
export class ServicoController{ 
    servicoService = new ServicoService();
    
    @Post()
    async cadastrarServico(
        @Body() dto:ServicoRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
            try {
                const novoServico =  await this.servicoService.cadastrarServico(dto);
               return sucess(201, new BasicResponseDto("Servico cadastrado com sucesso!", novoServico));
            } catch (error: any) {
                return fail(400, new BasicResponseDto(error.message, undefined));
            }
    };
        
    
    @Put()
    async atualizarServico(
        @Body() dto:ServicoRequestDto,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
            try {
                const ServicoAtlz = await this.servicoService.atualizarServico(dto);
                return sucess(200, new BasicResponseDto("Os dados do Servico foram atualizado com sucesso!", ServicoAtlz));
            } catch (error: any) {
                return fail(400, new BasicResponseDto(error.message, undefined));
            }
        };
        
    
    @Delete()
    async deleteServico(
        @Body() dto:ServicoRequestDto,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const Servico = await this.servicoService.deletarservico(dto);
            return sucess(200, new BasicResponseDto("Servico excluido com suceso!", Servico));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
        
  //foi necessário nomear uma rota dentro dos dois metodos http get, para o tsoa entender que os dois executam diferentes funções
    
    @Get('filtrarServico')
    async filtrarServico(
        @Query() param: number, 
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const Servico = await this.servicoService.filtrarservico(param);
            return sucess(200, new BasicResponseDto("Servico encontrado com suceso!", Servico));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
        
    
    @Get('listarTodosServicos')
    async ListarTodosServicos(
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const Servicos = await this.servicoService.listarTodosservicos();
            return sucess(200, new BasicResponseDto("ServicoS encontrados com suceso!", Servicos));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
}