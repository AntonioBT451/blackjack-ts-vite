
export interface JuegoState {
    baraja: string[],
    jugador: JugadorState,
    computadora: JugadorState,
    juegoTerminado: boolean,
}

export interface JugadorState {
    puntos: number,
    cartas: string[],
}