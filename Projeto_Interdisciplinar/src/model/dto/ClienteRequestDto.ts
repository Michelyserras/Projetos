
export class ClienteRequestDto {
    cpf: string;
    nome: string;
    endereco: string;
    telefone: string;

    constructor(cpf?:string, nome?:string, endereco?:string, telefone?: string){
        this.cpf = cpf || '';
        this.nome = nome || '';
        this.endereco = endereco || '';
        this.telefone = telefone || '';
    }

}