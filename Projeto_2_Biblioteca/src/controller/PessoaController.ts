import { Delete, Request, Response } from "tsoa";
import { Route, Body, Res, Tags, TsoaResponse, Post, Get, Put, Query } from "tsoa";
import { PessoaService } from "../service/PessoaService";
import { PessoaRequestDto } from "../model/dto/PessoaRequestDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { PessoaEntity } from "../model/entity/PessoaEntity";

@Route("pessoa")
@Tags("Pessoa")
export class PessoaController{
    pessoaService = new PessoaService();

    @Post('Cadastrar Pessoa')
    async cadastrarPessoa(
        @Body() dto:PessoaRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
            try {
                const novaPessoa =  await this.pessoaService.cadastrarPessoa(dto);
               return sucess(201, new BasicResponseDto("Pessoa cadastrada com sucesso!", novaPessoa));
            } catch (error: any) {
                return fail(400, new BasicResponseDto(error.message, undefined));
            }
    };

    @Put('Atualizar Pessoa')
    async atualizarPessoa(
        @Body() pessoaBody:PessoaEntity,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
            try {
                const pessoaAtlz = await this.pessoaService.atualizarPessoa(pessoaBody);
                return sucess(200, new BasicResponseDto("Os dados da pessoa foram atualizados com sucesso!", pessoaAtlz));
            } catch (error: any) {
                return fail(400, new BasicResponseDto(error.message, undefined));
            }
        };
    
    @Delete('Deletar Pessoa')
    async deletePessoa(
        @Body() pessoaBody:PessoaEntity, 
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const pessoa = await this.pessoaService.deletarPessoa(pessoaBody);
            return sucess(200, new BasicResponseDto("Pessoa excluida com suceso!", pessoa));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
      
    @Get('filtrar Pessoa')
    async filtrarPessoa(
        @Query() param:number,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const pessoa = await this.pessoaService.filtrarPessoa(param);
            if(pessoa === null){
                return notFound(404, new BasicResponseDto("Pessoa não encontrada.", undefined));
            }
            return sucess(200, new BasicResponseDto("Pessoa encontrada com suceso!", pessoa));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };  
    
    @Get('Listar Todas as Pessoas')
    async listarTodasPessoas(
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const pessoas = await this.pessoaService.listarTodasPessoas();
            if(pessoas === null){
                return notFound(404, new BasicResponseDto("Não há pessoas cadastradas.", undefined));
            }
            return sucess(200, new BasicResponseDto("Pessoas encontrados com suceso!", pessoas));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
}