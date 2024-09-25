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

    while (rondasRestantes > 0 && dineroRestante >= precios["Buchanna"]) {
        bebidasCompradas["Buchanna"]++;
        dineroRestante -= precios["Buchanna"];
        rondasRestantes--;
    }

    while (rondasRestantes > 0 && dineroRestante >= precios["Jhonny Walker"]) {
        bebidasCompradas["Jhonny Walker"]++;
        dineroRestante -= precios["Jhonny Walker"];
        rondasRestantes--;
    }

    while (rondasRestantes > 0) {
        if (dineroRestante >= precios["Presidente"] && rondasRestantes > 0) {
            bebidasCompradas["Presidente"]++;
            dineroRestante -= precios["Presidente"];
        } else if (dineroRestante >= precios["One"] && rondasRestantes > 0) {
            bebidasCompradas["One"]++;
            dineroRestante -= precios["One"];
        } else if (dineroRestante >= precios["Modelo"] && rondasRestantes > 0) {
            bebidasCompradas["Modelo"]++;
            dineroRestante -= precios["Modelo"];
        } else {
            break;
        }
        rondasRestantes--;
    }

    while (rondasRestantes > 0) {
        if (dineroRestante >= precios["One"] && rondasRestantes > 0) {
            bebidasCompradas["One"]++;
            dineroRestante -= precios["One"];
            rondasRestantes--;
        } else if (dineroRestante >= precios["Presidente"] && rondasRestantes > 0) {
            bebidasCompradas["Presidente"]++;
            dineroRestante -= precios["Presidente"];
            rondasRestantes--;
        } else if (dineroRestante >= precios["Modelo"] && rondasRestantes > 0) {
            bebidasCompradas["Modelo"]++;
            dineroRestante -= precios["Modelo"];
            rondasRestantes--;
        } else {
            break;
        }
    }

    return { bebidasCompradas, dineroRestante, rondasRestantes };
}

const resultado = distribuirBebidas();
console.log("Distribución de bebidas:", resultado.bebidasCompradas);
console.log("Dinero restante:", resultado.dineroRestante);
console.log("Rondas restantes (debería ser 0):", resultado.rondasRestantes);
