import { Request, Response } from "express";
import { Controller, Route, Body, Res, Tags, TsoaResponse, Post, Get, Put, Delete, Query} from "tsoa";
import { PetRequestDto } from "../model/dto/PetRequestDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { PetService } from "../service/PetService";
import { PetEntity } from "../model/entity/Pet";
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
        @Body() pet: PetEntity,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
            try {
                const PetAtlz = await this.petService.atualizarPet(pet); 
                if(PetAtlz === null){
                    console.error("Pet não encontrado.");
                    return notFound(404, new BasicResponseDto("Pet não encontrado", undefined));
                }
                return sucess(200, new BasicResponseDto("Os dados do Pet foram atualizado com sucesso!", PetAtlz));
            } catch (error: any) {
                return fail(400, new BasicResponseDto(error.message, undefined));
            }
        };
        
    
    @Delete()
    async deletePet(
        @Body() pet:PetEntity, //ALTERAR PARA PARAMETRO EM TODAS AS FUNÇÕES DEPOIS, PARA RECEBER APENAS O ID
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const Pet = await this.petService.deletarPet(pet);
            if(Pet === null){
                console.error("Pet não encontrado.");
                return notFound(404, new BasicResponseDto("Pet não encontrado", undefined));
            }
            return sucess(200, new BasicResponseDto("Pet excluido com suceso!", Pet));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
        
    //foi necessário nomear uma rota dentro dos dois metodos http get, para o tsoa entender que os dois executam diferentes funções
    
    @Get('filtrarPet') 
    async filtrarPet(
        @Query() param:number,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const Pet = await this.petService.filtrarPet(param);
            if(Pet === null){
                console.error("Pet não encontrado.");
                return notFound(404, new BasicResponseDto("Pet não encontrado", undefined));
            }
            return sucess(200, new BasicResponseDto("Pet encontrado com suceso!", Pet));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
        
    
    @Get('listarTodosPets')
    async ListarTodosPets(
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() fail:TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ):Promise<void>{
        try {
            const Pets = await this.petService.listarTodosPets();
            if(Pets === null){
                console.error("Não há pets cadastrados.");
                return notFound(404, new BasicResponseDto("Não há pets cadastrados", undefined));
            }
            return sucess(200, new BasicResponseDto("PetS encontrados com suceso!", Pets));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };
}