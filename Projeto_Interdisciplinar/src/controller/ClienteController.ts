import { Request, Response } from "express";
import { ClienteService } from "../service/ClienteService";
import { Controller, Route, Body, Res, Tags, TsoaResponse, Post, Get, Put, Delete, Query} from "tsoa";
import { ClienteRequestDto } from "../model/dto/ClienteRequestDto copy";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
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
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
            try {
                const clienteAtlz = await this.clienteService.atualizarCliente(dto);
                return sucess(200, new BasicResponseDto("Os dados do Cliente foram atualizado com sucesso!", clienteAtlz));
            } catch (error: any) {
                return fail(400, new BasicResponseDto(error.message, undefined));
            }
        };
        
    
    @Delete()
    async deleteCliente(
        @Body() dto:ClienteRequestDto,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const cliente = await this.clienteService.deletarCliente(dto);
            return sucess(200, new BasicResponseDto("Cliente excluido com suceso!", cliente));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
        
    
    @Get()
    async filtrarCliente(
        @Query() dto:ClienteRequestDto,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const cliente = await this.clienteService.filtrarCliente(dto.cpf);
            return sucess(200, new BasicResponseDto("Cliente encontrado com suceso!", cliente));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
        
    
    @Get()
    async ListarTodosClientes(
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const cliente = await this.clienteService.listarTodosClientes();
            return sucess(200, new BasicResponseDto("ClienteS encontrados com suceso!", cliente));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
}
