import { Delete, Request, Response } from "tsoa";
import { Route, Body, Res, Tags, TsoaResponse, Post, Get, Put, Query } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { CategoriaEntity } from "../model/entity/CategoriaEntity";
import { CategoriaService } from "../service/CategoriaService";
import { CategoriaRequestDto } from "../model/dto/CategoriaRequestDto";

@Route("categoria")
@Tags("Categoria")
export class CategoriaController{
    categoriaService = new CategoriaService();

    @Post('Cadastrar Categoria')
    async cadastrarCategoria(
        @Body() dto:CategoriaRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
            try {
                const novaCategoria =  await this.categoriaService.cadastrarCategoria(dto);
               return sucess(201, new BasicResponseDto("Categoria cadastrada com sucesso!", novaCategoria));
            } catch (error: any) {
                return fail(400, new BasicResponseDto(error.message, undefined));
            }
    };

    @Put('Atualizar Categoria')
    async atualizarCategoria(
        @Body() categoriaBody:CategoriaEntity,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
            try {
                const categoriaAtlz = await this.categoriaService.atualizarCategoria(categoriaBody);
                return sucess(200, new BasicResponseDto("Os dados da categoria foram atualizados com sucesso!", categoriaAtlz));
            } catch (error: any) {
                return fail(400, new BasicResponseDto(error.message, undefined));
            }
        };
    
    @Delete('Deletar Categoria')
    async deleteCategoria(
        @Query() param:number, 
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const categoria = await this.categoriaService.deletarCategoria(param);
            return sucess(200, new BasicResponseDto("Categoria excluida com suceso!", categoria));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
      
    @Get('filtrar Categoria')
    async filtrarCategoria(
        @Query() param:number,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const categoria = await this.categoriaService.filtrarCategoria(param);
            if(categoria === null){
                return notFound(404, new BasicResponseDto("Categoria não encontrada.", undefined));
            }
            return sucess(200, new BasicResponseDto("Categoria encontrada com suceso!", categoria));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };  
    
    @Get('Listar Todas as Categorias')
    async listarTodasCategorias(
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const categorias = await this.categoriaService.listarTodasCategorias();
            if(categorias === null){
                return notFound(404, new BasicResponseDto("Não há categorias cadastradas.", undefined));
            }
            return sucess(200, new BasicResponseDto("Categorias encontrados com suceso!", categorias));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
}