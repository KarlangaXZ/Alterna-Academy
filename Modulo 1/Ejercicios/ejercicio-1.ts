let dinero = 0;
let meta = 5000;

let horasTrabajadas = 20; 
let horasExtras = 30; 

let contadorHorasTrabajadas = 0;
let contadorHorasExtras = 0;

let dineroPorHorasNormales = 0;
let dineroPorHorasExtras = 0;

let horasSemanales = 40; 

for (let horasActuales = 0; dinero < meta; horasActuales++) {
    if (horasActuales < horasSemanales) {
        contadorHorasTrabajadas += 1;
        dineroPorHorasNormales += horasTrabajadas;
        dinero += horasTrabajadas; 
    } else {
        contadorHorasExtras += 1;
        dineroPorHorasExtras += horasExtras;
        dinero += horasExtras; 
    }
}

console.log(`Horas trabajadas normales: ${contadorHorasTrabajadas}`);
console.log(`Horas extras trabajadas: ${contadorHorasExtras}`);
console.log(`Dinero ganado por horas normales: ${dineroPorHorasNormales}`);
console.log(`Dinero ganado por horas extras: ${dineroPorHorasExtras}`);
console.log(`Dinero total ganado: ${dinero}`);