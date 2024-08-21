export class PetEntity{
    id: number;
    cpfCliente: string; //FOREIGN KEY
    nome: string;
    idade: number;
    especie: string;
    historicoPet: string;

    constructor(id?:number, cpfCliente?:string, nome?:string, idade?:number, especie?:string, historicoPet?:string){
        this.validatesInformation(cpfCliente, nome, idade, especie, historicoPet);
        this.id = id || 0;
        this.cpfCliente = cpfCliente || '';
        this.nome = nome || '';
        this.idade = idade || 0;
        this.especie = especie || '';
        this.historicoPet = historicoPet || '';
    }

    private validatesInformation(cpfCliente:any, nome:any, idade:any, especie:any, historicoPet:any){
        let error = '';

        if(typeof cpfCliente !== 'string' || typeof nome !== 'string' || typeof idade !== 'number' || typeof especie !== 'string' || typeof historicoPet !== 'string'){
            error += ("Informações incompletas ou incorretas.");
        }

        if(error != ''){
            throw new Error(error);
        }
    }
}