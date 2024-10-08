import { stringParaDataTempo, verificaFormatoDataDDMMYYYHHmm } from "../../util/DataUtil";
export class AgendaRequestDto {
    id: number;
    data: string; //VERIFICAR HORA DEPOIS
    tipoServico: string;
    valorServico: number;
    cpfCliente: string;
    idPet: number;

    constructor(id?:number, data?:string, tipoServico?:string, valorServico?:number, cpfCliente?:string, idPet?:number){
        //verificaFormatoDataDDMMYYYHHmm(data);
        this.id = id || 0;
        this.data = data || '';
        this.tipoServico = tipoServico || '';
        this.valorServico = valorServico || 0;
        this.cpfCliente = cpfCliente || '';
        this.idPet = idPet || 0;
    }

    
}