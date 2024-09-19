// 5. Introducir un numero entero de mínimo un digito (1) y máximo 3 (999) y dividir en unidad,
//  decena y centenas, imprimir cuantas unidades tiene, cuantas decenas y cuantas centenas

let numero: number = parseInt(
  prompt("Introduce un número entre 1 y 999:") || "0"
);

if (numero < 1 || numero > 999) {
  console.log("El numero debe estar entre 1 y 999");
} else {
  let centena = Math.round(numero / 100);
  let decena = Math.round((numero % 100) / 10);
  let unidad = numero % 10;

  console.log(`El numero ingresado es:`);
  console.log(`${centena} centenas`);
  console.log(`${decena} decenas`);
  console.log(`${unidad} unidades`);
}
