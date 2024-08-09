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
        //VALIDAR O VALOR, GARATINDO QUE SEJA UM VALOR POSITIVO(MAIOR QUE 0)
        if(typeof tipoServico !== 'string' || typeof valor !== 'number' || valor > 0 || typeof descricao !== 'string'){
            error += ("Informações incompletas ou incorretas.");
        }

        if(error != ''){
            throw new Error(error);
        }
    }
}