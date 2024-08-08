export class ServicoRequestDto{
    tipoServico: string;
    valor: number;
    descricao: string;

    constructor( tipoServico?:string, valor?:number, descricao?:string){
        this.tipoServico = tipoServico || '';
        this.valor = valor || 0;
        this.descricao = descricao || '';
    }

}