// for and for-each

let numeros = [10, 20, 30, 40, 50];

// Usando for
for (let i = 0; i < numeros.length; i++) {
    console.log(`Con for: Número ${numeros[i]}`);
}

// Usando forEach
numeros.forEach((numero) => {
    console.log(`Con forEach: Número ${numero}`);
});

