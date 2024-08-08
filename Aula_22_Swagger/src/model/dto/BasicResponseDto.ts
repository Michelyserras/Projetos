// forma de criar o sistema, usada para trafegar dados entre as camadas da api
export class BasicResponseDto{
    message: string;
    object:  any;

    constructor(message: string, object:  any){
        this.message =message;
        this.object = object;
    }

}