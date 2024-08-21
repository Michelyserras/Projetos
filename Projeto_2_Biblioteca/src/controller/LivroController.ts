import { Delete, Request, Response } from "tsoa";
import { Route, Body, Res, Tags, TsoaResponse, Post, Get, Put, Query } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { LivroEntity } from "../model/entity/LivroEntity";
import { LivroRequestDto } from "../model/dto/LivroRequestDto";
import { LivroService } from "../service/LivroService";

@Route("livro")
@Tags("Livro")
export class LivroController{
    livroService = new LivroService();

    @Post('Cadastrar Livro')
    async cadastrarLivro(
        @Body() dto:LivroRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
            try {
                const novoLivro =  await this.livroService.cadastrarLivro(dto);
               return sucess(201, new BasicResponseDto("Livro cadastrado com sucesso!", novoLivro));
            } catch (error: any) {
                return fail(400, new BasicResponseDto(error.message, undefined));
            }
    };

    @Put('Atualizar Livro')
    async atualizarLivro(
        @Body() livroBody:LivroEntity,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
            try {
                const livroAtlz = await this.livroService.atualizarLivro(livroBody);
                return sucess(200, new BasicResponseDto("Os dados do livro foram atualizados com sucesso!", livroAtlz));
            } catch (error: any) {
                return fail(400, new BasicResponseDto(error.message, undefined));
            }
        };
    
    @Delete('Deletar Livro')
    async deleteLivro(
        @Query() param:number, 
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const livro = await this.livroService.deletarLivro(param);
            return sucess(200, new BasicResponseDto("Livro excluido com suceso!", livro));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
      
    @Get('filtrar Livro')
    async filtrarLivro(
        @Query() param:number,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const livro = await this.livroService.filtrarLivro(param);
            if(livro === null){
                return notFound(404, new BasicResponseDto("Livro não encontrado.", undefined));
            }
            return sucess(200, new BasicResponseDto("Livro encontrado com suceso!", livro));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };  
    
    @Get('Listar Todos os Livros')
    async listarTodosLivros(
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const livros = await this.livroService.listarTodosLivros();
            if(livros === null){
                return notFound(404, new BasicResponseDto("Não há livros cadastrados.", undefined));
            }
            return sucess(200, new BasicResponseDto("Livros encontrados com suceso!", livros));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
}