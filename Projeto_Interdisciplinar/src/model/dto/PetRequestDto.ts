export class PetRequestDto{
    cpfCliente: string;
    nome: string;
    idade: number;
    peso: number; //ALTERAR NO DIAGRAMA DE CLASSES, colocar o peso e tirar a raça do pet
    especie: string;
    historicoPet: string;

    constructor( cpfCliente?:string, nome?:string, idade?:number, peso?:number, especie?:string, historicoPet?:string){
        this.cpfCliente = cpfCliente || '';
        this.nome = nome || '';
        this.idade = idade || 0;
        this.peso = peso || 0;
        this.especie = especie || '';
        this.historicoPet = historicoPet || '';
    }
}