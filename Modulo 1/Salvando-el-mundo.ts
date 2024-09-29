class Propulsor {
  private estado: boolean;
  private potencia: number;

  constructor(estado: boolean, potencia: number) {
    this.estado = estado;
    this.potencia = potencia;
  }

  public estaEnBuenEstado(): boolean {
    return this.estado;
  }

  public obtenerPotencia(): number {
    return this.potencia;
  }
}

class Nave {
  private hidroPropulsor: number;
  private propulsorIzquierdo: Propulsor;
  private propulsorDerecho: Propulsor;

  constructor(
    hidroPropulsor: number,
    propulsorIzquierdo: Propulsor,
    propulsorDerecho: Propulsor
  ) {
    this.hidroPropulsor = hidroPropulsor;
    this.propulsorIzquierdo = propulsorIzquierdo;
    this.propulsorDerecho = propulsorDerecho;
  }

  public puedeDespegar(): boolean {
    if (
      this.propulsorIzquierdo.estaEnBuenEstado() &&
      this.propulsorDerecho.estaEnBuenEstado()
    ) {
      return this.hidroPropulsor >= 5000 * 0.75;
    } else if (this.propulsorIzquierdo.estaEnBuenEstado()) {
      return (
        Math.pow(this.hidroPropulsor, 2) / 3 >=
        0.9 * this.propulsorIzquierdo.obtenerPotencia()
      );
    } else if (this.propulsorDerecho.estaEnBuenEstado()) {
      return Math.pow(this.hidroPropulsor, 4) / 2 >= 0.9 * this.hidroPropulsor;
    } else {
      return false;
    }
  }
}

class TheKiller {
  private coordenadas: { x: number; y: number };

  constructor(x: number, y: number) {
    this.coordenadas = { x, y };
  }

  // Metodo Calculo distancia
  public calcularDistancia(x1: number, y1: number): number {
    const x2 = this.coordenadas.x;
    const y2 = this.coordenadas.y;
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }

  public moverPosicion(): void {
    // Simulación de movimiento aleatorio de "The Killer"
    this.coordenadas.x += Math.floor(Math.random() * 50) - 25;
    this.coordenadas.y += Math.floor(Math.random() * 50) - 25;
  }

  public atacar() {
    console.log(
      "¡The Killer ha aparecido y te ha eliminado! La humanidad ha sido destruida."
    );
  }

  public getCoordenadas(): { x: number; y: number } {
    return this.coordenadas;
  }
}

class Juego {
  private nave: Nave;
  private theKiller: TheKiller;
  private codigoGenerado: number[] = [];
  private tiempoLimite: number = 160;
  private coordenadasNave: { x: number; y: number };
  private capaInvisibilidadActiva: boolean = false;
  private sobreviviste: boolean = false;

  constructor(
    nave: Nave,
    theKiller: TheKiller,
    coordenadasNave: { x: number; y: number }
  ) {
    this.nave = nave;
    this.theKiller = theKiller;
    this.coordenadasNave = coordenadasNave;
  }

  private generarCodigoIniciacion(): number[] {
    let codigo: number[] = [];
    while (codigo.length < 4) {
      let num: number = Math.floor(Math.random() * 50) + 1;
      codigo.push(num);
    }
    this.codigoGenerado = codigo;
    alert(`Código de iniciación generado: ${this.codigoGenerado.join(", ")}`);
    return this.codigoGenerado;
  }

  private ingresarCoordenadas(): { x: number; y: number } {
    let x = parseInt(
      prompt("Introduce la coordenada X (entre 500 y 1000):") || "0",
      10
    );
    let y = parseInt(
      prompt("Introduce la coordenada Y (entre 500 y 1000):") || "0",
      10
    );

    if (x < 500 || x > 1000 || y < 500 || y > 1000) {
      console.log(
        "Coordenadas fuera del rango permitido. Se generarán aleatoriamente."
      );
      x = Math.floor(Math.random() * 501) + 500;
      y = Math.floor(Math.random() * 501) + 500;
    }

    return { x, y };
  }

  private verificarPropulsores(): void {
    const potenciaIzquierda = parseInt(
      prompt("Introduce la potencia del propulsor izquierdo:") || "0",
      10
    );
    const potenciaDerecha = parseInt(
      prompt("Introduce la potencia del propulsor derecho:") || "0",
      10
    );

    const propulsorIzquierdo = new Propulsor(
      potenciaIzquierda > 70,
      potenciaIzquierda
    );
    const propulsorDerecho = new Propulsor(
      potenciaDerecha > 70,
      potenciaDerecha
    );

    this.nave = new Nave(5000, propulsorIzquierdo, propulsorDerecho);

    if (
      propulsorIzquierdo.estaEnBuenEstado() &&
      propulsorDerecho.estaEnBuenEstado()
    ) {
      console.log("Los propulsores están en buen estado.");
      this.generarCodigoIniciacion(); // Genera el código si ambos propulsores están bien
    } else {
      console.log(
        "Uno o ambos propulsores no están en buen estado. No puedes despegar."
      );
    }
  }

  private iniciarCuentaRegresiva() {
    console.log("¡Tienes 160 segundos para despegar!");
    let segundosRestantes = this.tiempoLimite;

    const cuentaRegresiva = setInterval(() => {
      if (segundosRestantes > 0) {
        this.theKiller.moverPosicion();
        let distancia = this.theKiller.calcularDistancia(
          this.coordenadasNave.x,
          this.coordenadasNave.y
        );

        console.log(`Tiempo restante: ${segundosRestantes} segundos.`);
        console.log(
          `The Killer está a una distancia de ${distancia.toFixed(2)} metros.`
        );

        if (distancia < 300) {
          console.log("¡Cuidado! The Killer está cerca.");

          const cambiarCoordenadas = confirm(
            "¿Quieres cambiar tus coordenadas para alejarte de The Killer?"
          );
          if (cambiarCoordenadas) {
            this.coordenadasNave = this.ingresarCoordenadas();
          }

          const activarCapa = confirm(
            "¿Quieres activar la capa de invisibilidad?"
          );
          if (activarCapa) {
            this.capaInvisibilidadActiva = true;
            console.log(
              "La capa de invisibilidad está activada. Los ataques de The Killer son desactivados temporalmente."
            );
          } else {
            console.log("Decidiste no activar la capa de invisibilidad.");
          }
        } else {
          console.log("The Killer está lejos, por ahora...");
        }

        segundosRestantes -= 5;
      } else {
        clearInterval(cuentaRegresiva);
        if (!this.capaInvisibilidadActiva) {
          this.theKiller.atacar();
        } else {
          this.sobreviviste = true;
          console.log(
            "La capa de invisibilidad ha protegido al soldado de los ataques de The Killer."
          );
        }

        if (this.sobreviviste) {
          console.log(
            "¡Felicidades! Saliste a salvo de la nave. ¡La humanidad fue salvada!"
          );
        }
      }
    }, 5000);
  }

  public verificarCodigoIngresado(codigoIngresado: number[]): void {
    if (
      JSON.stringify(codigoIngresado) === JSON.stringify(this.codigoGenerado)
    ) {
      console.log("¡Código correcto! Procediendo al despegue...");
      this.iniciarCuentaRegresiva();
    } else {
      this.theKiller.atacar();
    }
  }

  public pedirCodigo(): void {
    let codigoIngresado: number[] = [];
    for (let i = 0; i < 4; i++) {
      let numero = parseInt(
        prompt(`Introduce el número ${i + 1} del código:`) || "0",
        10
      );
      codigoIngresado.push(numero);
    }
    this.verificarCodigoIngresado(codigoIngresado);
  }

  public iniciarJuego(): void {
    this.coordenadasNave = this.ingresarCoordenadas();
    const killerX = Math.floor(Math.random() * 501) + 500;
    const killerY = Math.floor(Math.random() * 501) + 500;
    this.theKiller = new TheKiller(killerX, killerY);

    this.verificarPropulsores();
    let distancia: number = this.theKiller.calcularDistancia(
      this.coordenadasNave.x,
      this.coordenadasNave.y
    );
    console.log(
      `Distancia inicial a The Killer: ${distancia.toFixed(2)} metros.`
    );

    this.pedirCodigo();
  }
}

let propulsorIzquierdo = new Propulsor(true, 10000);
let propulsorDerecho = new Propulsor(true, 10000);

let nave = new Nave(5000, propulsorIzquierdo, propulsorDerecho);

let coordenadasNave = { x: 0, y: 0 };

let juego = new Juego(nave, new TheKiller(0, 0), coordenadasNave);

console.log("¡Bienvenido soldado!");
juego.iniciarJuego();
