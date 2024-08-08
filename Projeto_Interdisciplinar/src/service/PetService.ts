import { PetEntity } from "../model/entity/Pet";
import { PetRepository } from "../repository/PetRepository";

export class PetService{

    private petRepository = PetRepository.getInstance();

    async cadastrarPet(petData: any): Promise<PetEntity> {
        const { cpfCliente, nome, idade, peso, especie, historicoPet } = petData;
        
        const pet = new PetEntity(undefined, cpfCliente, nome, idade, peso, especie, historicoPet);

        const novoPet =  await this.petRepository.insertPet(pet);
        console.log("Service - Insert ", novoPet);
        return novoPet;
    }

    async atualizarPet(petData: any): Promise<PetEntity> {
        const { id, cpfCliente, nome, idade, peso, especie, historicoPet } = petData;

        const pet = new PetEntity(id, cpfCliente, nome, idade, peso, especie, historicoPet);

        await this.petRepository.updatePet(pet);
        console.log("Service - Update ", pet);
        return pet;
    }

    async deletarPet(petData: any): Promise<PetEntity> {
        const { id, cpfCliente, nome, idade, peso, especie, historicoPet } = petData;

        const pet = new PetEntity(id, cpfCliente, nome, idade, peso, especie, historicoPet);

        await this.petRepository.deletePet(pet);
        console.log("Service - Delete ", pet);
        return pet;
    }

    async filtrarPet(petData: any): Promise<PetEntity> {
        const pet =  await this.petRepository.filterPet(petData.id);
        console.log("Service - Filtrar", pet);
        return pet;
    }

    async listarTodosPets(): Promise<PetEntity[]> {
        const pet =  await this.petRepository.filterAllPet();
        console.log("Service - Filtrar Todos", pet);
        return pet;
    }
}