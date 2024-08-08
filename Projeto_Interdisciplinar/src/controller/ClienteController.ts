import { Request, Response } from "express";
import { ClienteService } from "../service/ClienteService";
import { Controller, Route, Body, Res, Tags, TsoaResponse, Post, Get, Put, delete} from "tsoa";
import { ProductRequestDto } from "../model/dto/ProductRequestDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
// aaaaaaaaaaa
@Route("product")
@Tags("Product")
export class ProductController{ 
    clienteService = new ClienteService();
    
    @Post()
    async cadastrarCliente(
        @Body() dto:ProductRequestDto,
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
        @Body() dto:ProductRequestDto,
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
        @Body() dto:ProductRequestDto,
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
        
    

    async filtrarProduto (req: Request, res: Response){
            try {
                const produto = await this.productService.filtrarProduto(req.query.id);
                res.status(200).json(
                    {
                        mensagem:"Produto encontrado com sucesso!",
                        produto:produto
                    }
                );
            } catch (error: any) {
                res.status(400).json({ message: error.message});
            }
        };
        
    

    async listarTodosProduto (req: Request, res: Response){
            try {
                const produtos = await this.productService.listarTodosProdutos();
                res.status(200).json(
                    {
                        mensagem:"Produtos listados com sucesso!",
                        produtos:produtos
                    }
                    );
            } catch (error: any) {
                res.status(400).json({ message: error.message});
            }
        };
}
