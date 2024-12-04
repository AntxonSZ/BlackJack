
/**
 * 2C = two of clubs
 * 2D = two of diamonds
 * 2H = two of hearts
 * 2S = two of spades
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

const crearDeck = () => {

    // i comienza en 2, mientras i sea menor o igual a 10, i se incrementa en 1
    for (let i =2; i <= 10; i++) { 
        for (let tipo of tipos) {  // tipo recorre el array tipos
        deck.push(i + tipo); // se agrega al array deck el valor de i y el valor de tipo
        }
    }

    for ( let tipo of tipos ) {
        for (let esp of especiales) {
            deck.push( esp + tipo );
        }
    }

    
    console.log( deck );
    deck = _.shuffle( deck );
    console.log( deck );
    
    
    
    
};

crearDeck();