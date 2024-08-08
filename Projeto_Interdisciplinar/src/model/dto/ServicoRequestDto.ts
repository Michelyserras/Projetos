export class ServicoRequestDto{
    id: number;
    tipoServico: string;
    valor: number;
    descricao: string;

    constructor(id?:number, tipoServico?:string, valor?:number, descricao?:string){
        this.id = id || 0;
        this.tipoServico = tipoServico || '';
        this.valor = valor || 0;
        this.descricao = descricao || '';
    }

}