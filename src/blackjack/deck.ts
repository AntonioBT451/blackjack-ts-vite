import _ from 'underscore';

/**
 * 2C = Two of clubs
 * 2D = Two of diamons
 * 2h = Two of hearts
 * 2C = Two of spades
 */

let deck: string[] = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

export const crearDeck = () => {
    // Limpiar desk
    deck = [];

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

    deck = _.shuffle(deck);

    // 52 cartas: (9 numericas + 4 especiales) x 4 palos 
    return deck;
};
