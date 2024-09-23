//LOS   BEBEDORES.COM
//solo van a beber 10 rondas.
//Cuantas cervezas se van a tomar? clasificala por marca

let monedero: number = 10000;
let presidente: number = 100;
let modelo: number = 200;
let heineken: number = 250;
let corona: number = 150;
let one: number = 90;


function borrachera() {
    let bebidas = [modelo, heineken, presidente ]
    let totalBebidas: number = 0;
    let totalModelo = 0;
    let totalHeineken = 0;
    let totalPresidente = 0;
    let ronda = 0;

   for (let i = 0; monedero > 0; i++) {

       

        let seleccion = bebidas[i % 3]; 
        

        if (monedero >= seleccion) {
            monedero -= seleccion;
            totalBebidas++;

            if(seleccion === modelo) totalModelo++
            if(seleccion === heineken) totalHeineken++
            if(seleccion === presidente) totalPresidente++
            
        }
    }
    console.log(`Total de cervezas tomadas: ${totalBebidas}`);
    console.log(`Dinero restante: ${monedero}`);
    console.log(`total marca Modelo: ${totalModelo}`);
    console.log(`total marca Heineken: ${totalHeineken}`);
    console.log(`total marca presidente: ${totalPresidente}`);
}
borrachera();
