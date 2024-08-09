import { stringParaData } from "../../util/DataUtil";
export class AgendaRequestDto {
    data: Date;
    hora: number; //VERIFICAR DEPOIS O FORMATO DA HORA
    tipoServico: string;
    valorServico: number;
    cpfCliente: number;
    idPet: number;

    constructor(data?:string, hora?:number, tipoServico?:string, valorServico?:number, cpfCliente?:number, idPet?:number){
        this.data = stringParaData(data || '');
        this.hora = hora || 0;
        this.tipoServico = tipoServico || '';
        this.valorServico = valorServico || 0;
        this.cpfCliente = cpfCliente || 0;
        this.idPet = idPet || 0;
    }

}