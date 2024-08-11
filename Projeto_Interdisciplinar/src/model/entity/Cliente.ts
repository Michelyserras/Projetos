export class ClienteEntity{
    cpf: string;
    nome: string;
    endereco: string;
    telefone: string;
//ADICIONAR FORMA DE VERIFICAR FORMATO CORRETO DO CPF E DO TELEFONE??
//ADICIONAR LISTA DE PETS QUE SÃO DO CLIENTE?
    constructor(cpf?:string, nome?:string, endereco?:string, telefone?: string){
        this.validatesInformation(cpf, nome, endereco, telefone);
        this.cpf = cpf || '';
        this.nome = nome || '';
        this.endereco = endereco || '';
        this.telefone = telefone || '';
    }

    private validatesInformation(cpf:any, nome:any, endereco:any, telefone:any){
        let error ='';
        if (typeof cpf !== 'string' || typeof nome !== 'string' || typeof endereco !== 'string' || typeof telefone !== 'string') {
            error += ("Informações incompletas ou incorretas. ");
        }

        if(error != ''){
            throw new Error(error);
        }
    }
}