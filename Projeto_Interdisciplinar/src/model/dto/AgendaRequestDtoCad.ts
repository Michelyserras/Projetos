export class AgendaRequestDtoCAD {
    data: string; //VERIFICAR HORA DEPOIS
    tipoServico: string;
    valorServico: number;
    cpfCliente: string;
    idPet: number;

    constructor(data?:string, tipoServico?:string, valorServico?:number, cpfCliente?:string, idPet?:number){
        //verificaFormatoDataDDMMYYYHHmm(data);
        this.data = data || '';
        this.tipoServico = tipoServico || '';
        this.valorServico = valorServico || 0;
        this.cpfCliente = cpfCliente || '';
        this.idPet = idPet || 0;
    }

    
}