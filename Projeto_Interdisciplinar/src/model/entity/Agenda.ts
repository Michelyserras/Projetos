import { stringParaData, verificaFormatoData } from "../../util/DataUtil";

export class AgendaEntity{
    id: number;
    data: Date;
    hora: number; //VERIFICAR DEPOIS O FORMATO DA HORA
    idServico: number;
    cpfCliente: number;
    idPet: number;
//CONFIRMAR SE ESSA ENTIDADE ESTÁ CERTA, A IDEIA É ARMAZENAR DADOS DO PET, CLIENTE E DO SERVIÇO REALIZADO NA DATA E HORA MARCADA
//ID PET FICA NA AGENDA OU LIGADA A SERVIÇO?
    constructor(id?:number, data?:string, hora?:number, idServico?:number, cpfCliente?:number, idPet?:number){
        this.validatesInformation(data, hora)
        this.id = id || 0;
        this.data = stringParaData(data || '');
        this.hora = hora || 0;
        this.idServico = idServico || 0;
        this.cpfCliente = cpfCliente || 0;
        this.idPet = idPet || 0;
    }

    private validatesInformation(data:any, hora:any){
        let error = '';

        if(typeof data !== 'string' || typeof hora !== 'number'){
            error += ("Informaçõe incompletas ou incorretas.");
        }

        if(error != ''){
            throw new Error(error);
        }
    }
}