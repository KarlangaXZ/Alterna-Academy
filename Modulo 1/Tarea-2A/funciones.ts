// Se requiere una función que nos permita realizar las 4 operaciones aritméticas, es decir, 
// nos permita SUMAR, RESTAR, MULTIPLICAR y DIVIDIR. La función debe recibir 3 argumentos,  
// dos de ellos deben ser los valores (A y B) y el tercero el tipo de operación o nombre. 
// Si el argumento del tipo de operación no es valido que muestre un detalle de error, 
// de lo contrario el resultado de la operación

let num1 =  parseFloat(prompt('Seleccione el primer numero') || '0');
let num2 =  parseFloat(prompt('Seleccione el segundo numero') || '0');
let operacion: any = prompt('Elige el tipo de operacion\n1-SUMA\n2-RESTA\n3-MULTIPLICACION\n4-DIVISION');

function opeacionRealizada(a:number, b:number, operacion:string){
    let result: number;

switch (operacion){
    case '1':
        result = a + b;
        break;
    case '2':
        result = a - b;
        break;
    case '3':
        result = a * b;
        break;
    case '4':
    if(b === 0) {
        return 'Error. no se puede dividir entre 0'
    }
        result = a / b;
        break;

    default:
            return "Error: Operación no válida. Debe ser '1-sumar', '2-restar', '3-multiplicar' o '4-dividir'.";

}
    return`El resultado de ${operacion} ${a} y ${b} es: ${result}`;

}

console.log(opeacionRealizada(num1,num2,operacion))