// Ejercicio  #1: Palabras palíndromas 

// Se requiere identificar si la palabras capturada es palíndroma o no,  dicha palabra debe 
// ser mostrada vía consola o pantalla tanto en su forma original y en la forma final, en 
// adicción, debes suministrar la cantidad de caracteres que compone la palabra suministrada.

function palabraPalindroma(palabra: string): boolean {
    const procesadaPalabra = palabra.replace(/\s/g, '').toLowerCase();

    const invertirPalabra = procesadaPalabra.split('').reverse().join('');

    return procesadaPalabra === invertirPalabra;
}

function mostrarResultado() {
    const palabraOriginal = prompt("Introduce una palabra:");

    if (palabraOriginal) {
        console.log(`Palabra original: ${palabraOriginal}`);

        console.log(`Cantidad de caracteres: ${palabraOriginal.length}`);

        const esPalindromo = palabraPalindroma(palabraOriginal);
        
        if (esPalindromo) {
            console.log("La palabra es palíndroma.");
        } else {
            console.log("La palabra no es palíndroma.");
        }

        const palabraInvertida = palabraOriginal.split('').reverse().join('');
        console.log(`Palabra invertida: ${palabraInvertida}`);
    }
}

mostrarResultado();
