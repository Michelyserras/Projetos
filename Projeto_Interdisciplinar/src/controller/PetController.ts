import { Request, Response } from "express";
import { Controller, Route, Body, Res, Tags, TsoaResponse, Post, Get, Put, Delete, Query} from "tsoa";
import { PetRequestDto } from "../model/dto/PetRequestDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { PetService } from "../service/PetService";
// aaaaaaaaaaa
@Route("Pet")
@Tags("Pet")
export class PetController{ 
    petService = new PetService();
    
    @Post()
    async cadastrarPet(
        @Body() dto:PetRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
            try {
                const novoPet =  await this.petService.cadastrarPet(dto);
               return sucess(201, new BasicResponseDto("Pet cadastrado com sucesso!", novoPet));
            } catch (error: any) {
                return fail(400, new BasicResponseDto(error.message, undefined));
            }
    };
        
    
    @Put()
    async atualizarPet(
        @Body() dto:PetRequestDto,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
            try {
                const PetAtlz = await this.petService.atualizarPet(dto);
                return sucess(200, new BasicResponseDto("Os dados do Pet foram atualizado com sucesso!", PetAtlz));
            } catch (error: any) {
                return fail(400, new BasicResponseDto(error.message, undefined));
            }
        };
        
    
    @Delete()
    async deletePet(
        @Body() dto:PetRequestDto,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const Pet = await this.petService.deletarPet(dto);
            return sucess(200, new BasicResponseDto("Pet excluido com suceso!", Pet));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
        
    
    @Get()
    async filtrarProduto(
        @Query() param:number,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const Pet = await this.petService.filtrarPet(param);
            return sucess(200, new BasicResponseDto("Pet encontrado com suceso!", Pet));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
        
    
    @Get()
    async ListarTodosPets(
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const Pet = await this.petService.listarTodosPets();
            return sucess(200, new BasicResponseDto("PetS encontrados com suceso!", Pet));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
}