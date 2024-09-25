// Ejercicio #2:  Un día de tragos

// Se requiere identificar la cantidad de bebida tomada y su marca correspondientes teniendo 
//en cuenta lo siguiente:

// Solo dispones de RD$ 20,000 y debes agotar dicho dinero en 15 rondas.

// NO PUEDE QUEDAR DINERO DISPONIBLE PARA COMPRAR NINGUN TIPO DE BEBIDA.
// PUEDE SOBRAR DINERO.

// Son 5 marcas de bebidas:

// Jhonny Walker
// Presidente
// One
// Modelo
// Buchanna

// Los costos de cada trago por marcas son los siguientes:
// Jhonny Walker = 1,100
// Presidente = 200
// One = 150
// Modelo = 175
// Buchanna = 2,500



const precios = {
    "Jhonny Walker": 1100,
    "Presidente": 200,
    "One": 150,
    "Modelo": 175,
    "Buchanna": 2500
};

const totalDinero = 20000;
const rondas = 15;

function distribuirBebidas() {
    let dineroRestante = totalDinero;
    let rondasRestantes = rondas;
    let bebidasCompradas = {
        "Jhonny Walker": 0,
        "Presidente": 0,
        "One": 0,
        "Modelo": 0,
        "Buchanna": 0
    };

    const nombresBebidas = Object.keys(precios);

    while (rondasRestantes > 0 && dineroRestante > 0) {
        for (let bebida of nombresBebidas) {
            const precio = precios[bebida];

            if (dineroRestante >= precio && rondasRestantes > 0) {
                bebidasCompradas[bebida]++;
                dineroRestante -= precio;
                rondasRestantes--;
            }

            if (rondasRestantes === 0) {
                break;
            }
        }
    }

    return { bebidasCompradas, dineroRestante, rondasRestantes };
}

const resultado = distribuirBebidas();
console.log("Distribución de bebidas:", resultado.bebidasCompradas);
console.log("Dinero restante:", resultado.dineroRestante);
console.log("Rondas restantes (debería ser 0):", resultado.rondasRestantes);
