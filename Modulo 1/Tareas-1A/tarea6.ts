/* 6.Escribir un programa que pregunte al usuario por el número de horas trabajadas y el coste por hora. 
Después debe mostrar por pantalla la paga que le corresponde. si la cantidad es mayor a 200 debe pagar 
las que van de 201 en adelante con un 20% adicional al precio por hora*/

let horasTrabajadas2: number = parseInt(prompt("ingrese las Horas trabajadas")|| "0")
let costoHoras: number = parseInt(prompt("ingrese el Costo de las horas")|| "0")

let adicional: number = 20 / 100;

if(horasTrabajadas2>200){
    
   let total: number = (horasTrabajadas2*costoHoras) + ((horasTrabajadas2 - 200) * (costoHoras*adicional))

   console.log(`Las horas trabajadas son: ${horasTrabajadas2}`);
    console.log(`El costo de horas ingresados: ${costoHoras}`);
    console.log(`Las horas trabajadas son: ${total}`);

}else{
    let total: number =  horasTrabajadas2*costoHoras

    console.log(`Las horas trabajadas son: ${horasTrabajadas2}`);
    console.log(`El costo de horas ingresados: ${costoHoras}`);
    console.log(`Las horas trabajadas son: ${total}`);
    }


