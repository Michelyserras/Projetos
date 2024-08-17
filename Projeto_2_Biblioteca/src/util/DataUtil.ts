export function verificaFormatoData(dataString: string): boolean {
    let dateIsCorrect = false;
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (regex.test(dataString)) {
        dateIsCorrect = true;
    }
    return dateIsCorrect;
}

export function stringParaData(dataString: string): Date {
    
    const partes = dataString.split('-');
    const ano = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1;
    const dia = parseInt(partes[2], 10);

    let data = new Date(ano, mes, dia);

    if ( data.getFullYear() !== ano || data.getMonth() !== mes || data.getDate() !== dia){
        throw new Error("Data inválida");
    }
    return data;
}

export function calculaDiferencaDiasEntreDatas(menorData: Date, maiorData: Date): number {
    let dias = maiorData.getFullYear() - menorData.getFullYear();
    const diferencaMeses = maiorData.getMonth() - menorData.getMonth();

    if (diferencaMeses < 0 || (diferencaMeses === 0 && maiorData.getDate() < menorData.getDate())) {
        dias--;
    }
    return dias;
}

export function dataParaFormatoSQL(data: Date): string {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return`${ano}-${mes}-${dia}`;
}