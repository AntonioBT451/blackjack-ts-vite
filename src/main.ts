import { crearDeck, pedirCarta, valorCarta } from "./blackjack/deck";
import { actualizarPuntos, mostrarCarta, mostrarMensaje } from "./blackjack/render";
import type { JuegoState } from "./blackjack/types";

let juegoState: JuegoState = {
    baraja: crearDeck(),
    jugador: {
        puntos: 0,
        cartas: [],
    },
    computadora: {
        puntos: 0,
        cartas: []
    },
    juegoTerminado: false
}

// Referencias a elementos DOM
const btnPedir = document.querySelector('#btnPedir')! as HTMLButtonElement;
const btnDetener = document.querySelector('#btnDetener')! as HTMLButtonElement;

// Funciones
const deshabilitarBotones = () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
}

// Funciones jugador
const handlePedirCarta = () => {
    if (juegoState.juegoTerminado) return;

    const { carta, nuevaBaraja } = pedirCarta(juegoState.baraja);

    juegoState.baraja = nuevaBaraja;
    juegoState.jugador.puntos = juegoState.jugador.puntos + valorCarta(carta);
    juegoState.jugador.cartas.push(carta);

    actualizarPuntos('#ptosJugador', juegoState.jugador.puntos);
    mostrarCarta(carta, "#cartas-jugador");

    if (juegoState.jugador.puntos >= 21) {
        juegoState.juegoTerminado = true;

        deshabilitarBotones();
        turnoComputadora(juegoState.jugador.puntos);
        mostrarGanador();
    }
};

const handleDetener = () => {
    if (juegoState.juegoTerminado) return;

    juegoState.juegoTerminado = true;

    deshabilitarBotones();
    turnoComputadora(juegoState.jugador.puntos);
    mostrarGanador();
};


// Funciones computadora
const turnoComputadora = (puntosMinimos: number) => {

    do {
        const { carta, nuevaBaraja } = pedirCarta(juegoState.baraja);

        juegoState.baraja = nuevaBaraja;
        juegoState.computadora.puntos += valorCarta(carta);
        juegoState.computadora.cartas.push(carta);

        actualizarPuntos('#ptosComputadora', juegoState.computadora.puntos);
        mostrarCarta(carta, "#cartas-computadora");
    } while ((juegoState.computadora.puntos < puntosMinimos) && puntosMinimos <= 21);
};

// Funciones
const mostrarGanador = () => {
    const puntosJugador = juegoState.jugador.puntos;
    const puntosComputadora = juegoState.computadora.puntos;

    if (puntosJugador === 21 && puntosComputadora !== 21) {
        mostrarMensaje('¡Blackjack! ¡Felicidades, ganaste!', 'success');
        return;
    }

    if (puntosJugador > 21) {
        mostrarMensaje('Lo siento, perdiste.', 'warning');
        return;
    }

    if (puntosComputadora > 21) {
        mostrarMensaje('¡Ganaste! La computadora se pasó de 21.', 'warning');
        return;
    }

    if (puntosJugador > puntosComputadora) {
        mostrarMensaje('¡Felicidades, ganaste!', 'warning');
    } else if (puntosJugador < puntosComputadora) {
        mostrarMensaje('La computadora gana. ¡Suerte la próxima!', 'warning');
    } else {
        mostrarMensaje('Empate!', 'warning');
    }
}


// Event listeners
btnPedir?.addEventListener('click', handlePedirCarta);
btnDetener?.addEventListener('click', handleDetener);
