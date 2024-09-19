// 4. Una juguetería tiene mucho éxito en dos de sus productos: payasos y muñecas. 
// Suele hacer venta por correo y la empresa de logística les cobra por peso de cada 
// paquete así que deben calcular el peso de los payasos y muñecas que saldrán en cada 
// paquete a demanda. Cada payaso pesa 112 g y cada muñeca 75 g. Escribir un programa que 
// lea el número de payasos y muñecas vendidos en el último pedido y calcule el peso total 
// del paquete que será enviado


let cantidadPayasos: number = parseInt(prompt('Que cantidad PAYASOS de jueguetes desea?') || '0')
let cantidadMunecas: number = parseInt(prompt('Que cantidad BARBIE de jueguetes desea?') || '0')

let pesoPayasos: number = 112;
let pesoMunecas: number = 75;

let pesoTotalPayasos: number = pesoPayasos * cantidadPayasos;
let pesoTotalMunecas: number = pesoMunecas * cantidadMunecas;

let pesoPaquete: number = pesoTotalPayasos + pesoTotalMunecas;

console.log(`la cantidad de PAYASOS de juguetes es ${cantidadPayasos} y de 
BARBIE de juguetes es: ${cantidadMunecas} 
\nEl peso de los PAYASOS de juguetes es: ${pesoTotalPayasos}g\n
\nEl peso de los BARBIE de juguetes es: ${pesoTotalMunecas}g\n
El paquete enviado tiene un peso total de: ${pesoPaquete}g`)