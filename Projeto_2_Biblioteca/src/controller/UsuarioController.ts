import { Delete, Request, Response } from "tsoa";
import { Route, Body, Res, Tags, TsoaResponse, Post, Get, Put, Query } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { UsuarioEntity } from "../model/entity/UsuarioEntity";
import { UsuarioRequestDto } from "../model/dto/UsuarioRequestDto";
import { UsuarioService } from "../service/UsuarioService";

@Route("usuario")
@Tags("Usuario")
export class UsuarioController{
    usuarioService = new UsuarioService();

    @Post('Cadastrar Usuario')
    async cadastrarUsuario(
        @Body() dto:UsuarioRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
            try {
                const novoUsuario =  await this.usuarioService.cadastrarUsuario(dto);
               return sucess(201, new BasicResponseDto("Usuário cadastrado com sucesso!", novoUsuario));
            } catch (error: any) {
                return fail(400, new BasicResponseDto(error.message, undefined));
            }
    };

    @Put('Atualizar Usuario')
    async atualizarUsuario(
        @Body() usuarioBody:UsuarioEntity,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
            try {
                const usuarioAtlz = await this.usuarioService.atualizarUsuario(usuarioBody);
                return sucess(200, new BasicResponseDto("Os dados do usuário foram atualizados com sucesso!", usuarioAtlz));
            } catch (error: any) {
                return fail(400, new BasicResponseDto(error.message, undefined));
            }
        };
    
    @Delete('Deletar Usuario')
    async deleteUsuario(
        @Query() param:number, 
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const usuario = await this.usuarioService.deletarUsuario(param);
            return sucess(200, new BasicResponseDto("Usuário excluido com suceso!", usuario));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
      
    @Get('filtrar Usuario')
    async filtrarUsuario(
        @Query() param:number,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const usuario = await this.usuarioService.filtrarUsuario(param);
            if(usuario === null){
                return notFound(404, new BasicResponseDto("Usuário não encontrado.", undefined));
            }
            return sucess(200, new BasicResponseDto("Usuário encontrado com suceso!", usuario));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };  
    
    @Get('Listar Todos os Usuarios')
    async listarTodosUsuarios(
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const usuarios = await this.usuarioService.listarTodosUsuarios();
            if(usuarios === null){
                return notFound(404, new BasicResponseDto("Não há usuários cadastrados.", undefined));
            }
            return sucess(200, new BasicResponseDto("Usuários encontrados com suceso!", usuarios));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
}