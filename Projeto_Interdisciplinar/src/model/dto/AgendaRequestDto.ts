import { stringParaData } from "../../util/DataUtil";
export class AgendaRequestDto {
    data: Date; //VERIFICAR DEPOIS O FORMATO DA HORA
    tipoServico: string;
    valorServico: number;
    cpfCliente: string;
    idPet: number;

    constructor(data?:string, tipoServico?:string, valorServico?:number, cpfCliente?:string, idPet?:number){
        this.data = stringParaData(data || '');
        this.tipoServico = tipoServico || '';
        this.valorServico = valorServico || 0;
        this.cpfCliente = cpfCliente || '';
        this.idPet = idPet || 0;
    }

}