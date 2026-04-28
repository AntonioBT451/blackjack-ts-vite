import { crearDeck, pedirCarta, valorCarta } from "./blackjack/deck";
import { actualizarPuntos, mostrarCarta, mostrarMensaje } from "./blackjack/render";
import type { JuegoState } from "./blackjack/types";

const juegoState: JuegoState = {
    baraja: [],
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

juegoState.baraja = crearDeck();
console.log(juegoState.baraja);

// Funciones
const handlePedirCarta = () => {
    const { carta, nuevaBaraja } = pedirCarta(juegoState.baraja);

    juegoState.baraja = nuevaBaraja;
    juegoState.jugador.puntos = juegoState.jugador.puntos + valorCarta(carta);

    actualizarPuntos('#ptosJugador', juegoState.jugador.puntos);
    mostrarCarta(carta);

    if (juegoState.jugador.puntos > 21) {
        mostrarMensaje('Lo siento, perdiste.', 'warning');
        btnPedir.disabled = true;
    } else if (juegoState.jugador.puntos === 21) {
        mostrarMensaje('¡21, ganaste!', 'success');
        btnPedir.disabled = true;
    }
};


// Event listeners
btnPedir?.addEventListener('click', handlePedirCarta);
