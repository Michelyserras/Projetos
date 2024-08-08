export class PetRequestDto{
    id: number;
    cpfCliente: string;
    nome: string;
    idade: number;
    peso: number; //ALTERAR NO DIAGRAMA DE CLASSES, colocar o peso e tirar a raça do pet
    especie: string;
    historicoPet: string;

    constructor(id?:number, cpfCliente?:string, nome?:string, idade?:number, peso?:number, especie?:string, historicoPet?:string){
        this.id = id || 0;
        this.cpfCliente = cpfCliente || '';
        this.nome = nome || '';
        this.idade = idade || 0;
        this.peso = peso || 0;
        this.especie = especie || '';
        this.historicoPet = historicoPet || '';
    }
}