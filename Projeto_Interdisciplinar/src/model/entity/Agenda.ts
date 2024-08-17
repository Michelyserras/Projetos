import { stringParaDataTempo, verificaFormatoDataDDMMYYYHHmm } from "../../util/DataUtil";

export class AgendaEntity{
    id: number;
    data: string;
    tipoServico: string; 
    valorServico: number;
    cpfCliente: number; //FOREIGN KEY
    idPet: number; //FOREIGN KEY

//ADICIONAR STATUS SOBRE COMO ESTÁ O AGENDAMENTO? CONCLUÍDO, EM ANDAMENTO OU FINALIZADO?
//CONFIRMAR SE ESSA ENTIDADE ESTÁ CERTA, A IDEIA É ARMAZENAR DADOS DO PET, CLIENTE E DO SERVIÇO REALIZADO NA DATA E HORA MARCADA

    constructor(id?:number, data?:string, tipoServico?:string, valorServico?:number, cpfCliente?:number, idPet?:number){
        this.validatesInformation(data, tipoServico, valorServico)
        this.id = id || 0;
        this.data = data || '';
        this.tipoServico = tipoServico || '';
        this.valorServico = valorServico || 0;
        this.cpfCliente = cpfCliente || 0;
        this.idPet = idPet || 0;
    }

    private validatesInformation(data:any, tipoServico:any, valorServico:any){
        let error = '';

        if(typeof data !== 'string' || typeof tipoServico !== 'string' || typeof valorServico !== 'number'){
            error += ("Informaçõe incompletas ou incorretas.");
        }

        if(!verificaFormatoDataDDMMYYYHHmm(data)){
            error += ("A data deve possuir o formato: dd/MM/yyyy HH:mm");
        }

        if(error != ''){
            throw new Error(error);
        }
    }
}