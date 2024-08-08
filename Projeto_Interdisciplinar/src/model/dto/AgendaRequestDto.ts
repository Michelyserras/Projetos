import { stringParaData } from "../../util/DataUtil";
export class AgendaRequestDto {
    id: number;
    data: Date;
    hora: number; //VERIFICAR DEPOIS O FORMATO DA HORA
    idServico: number;
    cpfCliente: number;
    idPet: number;

    constructor(id?:number, data?:string, hora?:number, idServico?:number, cpfCliente?:number, idPet?:number){
        this.id = id || 0;
        this.data = stringParaData(data || '');
        this.hora = hora || 0;
        this.idServico = idServico || 0;
        this.cpfCliente = cpfCliente || 0;
        this.idPet = idPet || 0;
    }

}