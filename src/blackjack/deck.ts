import _ from 'underscore';

/**
 * 2C = Two of clubs
 * 2D = Two of diamons
 * 2h = Two of hearts
 * 2C = Two of spades
 */

const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

// Función para crear una nueva baraja
export const crearDeck = () => {
    // Limpiar desk
    const deck: string[] = [];

    // Cartas numericas (2-10)
    for (let i = 2; i <= 10; i++) {
        for (const tipo of tipos) {
            deck.push(i + tipo);
        };
    };

    // Cartas especiales (A, J, Q, K)
    for (const tipo of tipos) {
        for (const esp of especiales) {
            deck.push(esp + tipo);
        };
    };

    const shuffleDeck = _.shuffle(deck);

    // 52 cartas: (9 numericas + 4 especiales) x 4 palos 
    return shuffleDeck;
};

// Función para tomar una carta
export const pedirCarta = (deck: string[]): { carta: string, nuevaBaraja: string[] } => {
    if (deck.length === 0) {
        throw new Error('No hay cartas en la baraja');
    };

    const carta = deck.pop() ?? '';

    return {
        carta: carta,
        nuevaBaraja: deck
    };
};

// Función para calcular el valor de una carta
export const valorCarta = (carta: string): number => {
    const valorString = carta.substring(0, carta.length - 1);

    if (isNaN(Number(valorString))) {
        return valorString === 'A' ? 11 : 10;
    } else {
        return Number(valorString);
    }
};

