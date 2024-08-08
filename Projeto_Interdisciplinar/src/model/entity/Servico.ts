export class ServicoEntity{
    id: number;
    tipoServico: string;
    valor: number;
    descricao: string;

    constructor(id?:number, tipoServico?:string, valor?:number, descricao?:string){
        this.validatesInformation(tipoServico, valor, descricao);
        this.id = id || 0;
        this.tipoServico = tipoServico || '';
        this.valor = valor || 0;
        this.descricao = descricao || '';
    }

    private validatesInformation(tipoServico:any, valor:any, descricao:any){
        let error = '';

        if(typeof tipoServico !== 'string' || typeof valor !== 'number' || typeof descricao !== 'string'){
            error += ("Informações incompletas ou incorretas.");
        }

        if(error != ''){
            throw new Error(error);
        }
    }
}