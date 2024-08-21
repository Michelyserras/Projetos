export class PetRequestDto{
    cpfCliente: string;
    nome: string;
    idade: number;
    especie: string;
    historicoPet: string;

    constructor( cpfCliente?:string, nome?:string, idade?:number, especie?:string, historicoPet?:string){
        this.cpfCliente = cpfCliente || '';
        this.nome = nome || '';
        this.idade = idade || 0;
        this.especie = especie || '';
        this.historicoPet = historicoPet || '';
    }
}