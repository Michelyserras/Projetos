import { Delete, Request, Response } from "tsoa";
import { Route, Body, Res, Tags, TsoaResponse, Post, Get, Put, Query } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";
import { EmprestimoRequestDto } from "../model/dto/EmprestimoRequestDto";
import { EmprestimoService } from "../service/EmprestimoService";

@Route("emprestimo")
@Tags("Emprestimo")
export class EmprestimoController{
    emprestimoService = new EmprestimoService();

    @Post('Realizar Emprestimo')
    async realizarEmprestimo(
        @Body() dto:EmprestimoRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
            try {
                const novoEmprestimo =  await this.emprestimoService.realizarEmprestimo(dto);
               return sucess(201, new BasicResponseDto("Emprestimo realizado com sucesso!", novoEmprestimo));
            } catch (error: any) {
                return fail(400, new BasicResponseDto(error.message, undefined));
            }
    };

    @Put('Atualizar Emprestimo')
    async atualizarEmprestimo(
        @Body() emprestimoBody:EmprestimoEntity,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
            try {
                const emprestimoAtlz = await this.emprestimoService.atualizarEmprestimo(emprestimoBody);
                return sucess(200, new BasicResponseDto("Os dados do emprestimo foram atualizados com sucesso!", emprestimoAtlz));
            } catch (error: any) {
                return fail(400, new BasicResponseDto(error.message, undefined));
            }
        };

    
    @Delete('Deletar Emprestimo')
    async deleteEmprestimo(
        @Body() emprestimoBody:EmprestimoEntity, 
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const emprestimo = await this.emprestimoService.deletarEmprestimo(emprestimoBody);
            return sucess(200, new BasicResponseDto("Emprestimo excluido com suceso!", emprestimo));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
      
    @Get('filtrar Emprestimo')
    async filtrarEmprestimo(
        @Query() param:number,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const emprestimo = await this.emprestimoService.filtrarEmprestimo(param);
            if(emprestimo === null){
                return notFound(404, new BasicResponseDto("Emprestimo não encontrado.", undefined));
            }
            return sucess(200, new BasicResponseDto("Emprestimo encontrado com suceso!", emprestimo));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };  
    
    @Get('Listar Todos os Emprestimos')
    async listarTodosEmprestimos(
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const emprestimos = await this.emprestimoService.listarTodosEmprestimos();
            if(emprestimos === null){
                return notFound(404, new BasicResponseDto("Não há emprestimos registrados.", undefined));
            }
            return sucess(200, new BasicResponseDto("Emprestimos encontrados com suceso!", emprestimos));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
}