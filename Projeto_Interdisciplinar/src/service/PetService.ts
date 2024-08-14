import { PetEntity } from "../model/entity/Pet";
import { PetRepository } from "../repository/PetRepository";
import { ClienteRepository } from "../repository/ClienteRepository";

export class PetService{

    private petRepository = PetRepository.getInstance();
    private clienteRepository = ClienteRepository.getInstance();

    async cadastrarPet(petData: any): Promise<PetEntity> {
        const { cpfCliente, nome, idade, peso, especie, historicoPet } = petData;
        const cpfClienteEncontrado = await this.clienteRepository.filterCliente(cpfCliente);

        if(cpfClienteEncontrado === null){
            throw new Error('CPF do dono do pet não cadastrado.');
        }

        const pet = new PetEntity(undefined, cpfCliente, nome, idade, peso, especie, historicoPet);

        const novoPet =  await this.petRepository.insertPet(pet);
        console.log("Service - Insert ", novoPet);
        return novoPet;
    }

    async atualizarPet(petData: any): Promise<PetEntity> {
        const { id, cpfCliente, nome, idade, peso, especie, historicoPet } = petData;
        const petEncontrado = await this.filtrarPet(id);
        const cpfClienteEncontrado = await this.clienteRepository.filterCliente(cpfCliente);

        if(petEncontrado === null){
            throw new Error('Pet não encontrado.');
        }
        else{
            if(cpfClienteEncontrado === null){
                throw new Error('CPF do dono do pet não cadastrado.');
            }
            
            const pet = new PetEntity(id, cpfCliente, nome, idade, peso, especie, historicoPet);

            await this.petRepository.updatePet(pet);
            console.log("Service - Update ", pet);
            return pet;
        }
    }

    async deletarPet(petData: any): Promise<PetEntity> {
        const { id, cpfCliente, nome, idade, peso, especie, historicoPet } = petData;
        const petEncontrado = await this.filtrarPet(id);

        if(petEncontrado === null){
            throw new Error('Pet não encontrado.');
        }

        const pet = new PetEntity(id, cpfCliente, nome, idade, peso, especie, historicoPet);

        await this.petRepository.deletePet(pet);
        console.log("Service - Delete ", pet);
        return pet;
    }

    async filtrarPet(petData: any): Promise<PetEntity | null> {
        const pet =  await this.petRepository.filterPet(petData);
        console.log("Service - Filtrar", pet);
        return pet;
    }

    async listarTodosPets(): Promise<PetEntity[] | null> { //FUNÇÃO JÁ LISTA TODOS OS PETS EXISTENTES
        const pet =  await this.petRepository.filterAllPet();
        console.log("Service - Filtrar Todos", pet);
        return pet;
    }

    //CRIAR FUNÇÃO PARA LISTAR PET POR CPF CLIENTE
    async listarPetsPorCpf(cpfCliente: any): Promise<PetEntity[]>{
        const pets = await this.listarPetsPorCpf(cpfCliente);
        console.log("Service - Filtrar por CPF", pets);
        return pets;
    }
}