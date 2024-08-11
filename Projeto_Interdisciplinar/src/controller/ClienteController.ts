import { Request, Response } from "express";
import { ClienteService } from "../service/ClienteService";
import { Controller, Route, Body, Res, Tags, TsoaResponse, Post, Get, Put, Delete, Query} from "tsoa";
import { ClienteRequestDto } from "../model/dto/ClienteRequestDto copy";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { ClienteEntity } from "../model/entity/Cliente";
// aaaaaaaaaaa
@Route("cliente")
@Tags("Cliente")
export class ClienteController{ 
    clienteService = new ClienteService();
    
    @Post()
    async cadastrarCliente(
        @Body() dto:ClienteRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
            try {
                const novocliente =  await this.clienteService.cadastrarCliente(dto);
               return sucess(201, new BasicResponseDto("Cliente cadastrado com sucesso!", novocliente));
            } catch (error: any) {
                return fail(400, new BasicResponseDto(error.message, undefined));
            }
    };
        
    
    @Put()
    async atualizarCliente(
        @Body() dto:ClienteRequestDto,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
            try {
                const clienteAtlz = await this.clienteService.atualizarCliente(dto);
                if(clienteAtlz === null){
                    console.error("Cliente não encontrado.");
                    return notFound(404, new BasicResponseDto("Cliente não encontrado", undefined));
                }
                return sucess(200, new BasicResponseDto("Os dados do Cliente foram atualizado com sucesso!", clienteAtlz));
            } catch (error: any) {
                return fail(400, new BasicResponseDto(error.message, undefined));
            }
        };
        
    
    @Delete()
    async deleteCliente(
        @Query() param:string,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const cliente = await this.clienteService.deletarCliente(param);
            if(cliente === null){
                console.error("Cliente não encontrado.");
                return notFound(404, new BasicResponseDto("Cliente não encontrado", undefined));
            }
            return sucess(200, new BasicResponseDto("Cliente excluido com suceso!", cliente));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
        
     //foi necessário nomear uma rota dentro dos dois metodos http get, para o tsoa entender que os dois executam diferentes funções
      
    @Get('filtrarCliente')
    async filtrarCliente(
        @Query() param:string,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const cliente = await this.clienteService.filtrarCliente(param);
            if(cliente === null){
                console.error("Cliente não encontrado.");
                return notFound(404, new BasicResponseDto("Cliente não encontrado", undefined));
            }
            return sucess(200, new BasicResponseDto("Cliente encontrado com suceso!", cliente));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
        
    
    @Get('ListarTodosClientes')
    async ListarTodosClientes(
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const clientes = await this.clienteService.listarTodosClientes();
            if(clientes === null){
                console.error("Cliente não encontrado.");
                return notFound(404, new BasicResponseDto("Não há clientes cadastrados", undefined));
            }
            return sucess(200, new BasicResponseDto("Clientes encontrados com suceso!", clientes));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
}
