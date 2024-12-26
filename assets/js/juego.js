

(() => {
    'use strict'


    let deck         = [];
    const tipos      = ['C','D','H','S'];
    const especiales = ['A','J','Q','K'];

    let puntosJugador = 0,
        puntosComputadora = 0;

    // Referencias del HTML
    const btnPedir   = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo   = document.querySelector('#btnNuevo');

    const divCartasJugador     = document.querySelector('#jugador-cartas');
    const divCartasComputadora = document.querySelector('#computadora-cartas');

    const puntosHTML = document.querySelectorAll('small');

    // Esta función crea un nuevo deck
    const crearDeck = () => {
        // i comienza en 2, mientras i sea menor o igual a 10, i se incrementa en 1
        for( let i = 2; i <= 10; i++ ) {
            for( let tipo of tipos ) { // tipo recorre el array tipos
                deck.push( i + tipo); // se agrega al array deck el valor de i y el valor de tipo
            }
        }

        for( let tipo of tipos ) {
            for( let esp of especiales ) {
                deck.push( esp + tipo);
            }
        }
        // console.log( deck );
        deck = _.shuffle( deck );
        return deck;
    }

    crearDeck();


    // Esta función me permite tomar una carta
    const pedirCarta = () => {

        if ( deck.length === 0 ) {
            throw 'No hay cartas en el deck'; // throw es para lanzar un error
        }
        const carta = deck.pop(); // este .pop remueve y devuelve el arreglo nuevo
        return carta;
    }

    // pedirCarta();
    const valorCarta = ( carta ) => {

        const valor = carta.substring(0, carta.length - 1); // substring es para cortar un string
        return ( isNaN( valor ) ) ?  // isNaN es para saber si es un numero
                ( valor === 'A' ) ? 11 : 10
                : valor * 1;
    }

    // turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {

        do {
            const carta = pedirCarta();

            puntosComputadora = puntosComputadora + valorCarta( carta );
            puntosHTML[1].innerText = puntosComputadora; //[1] es la segunda posicion del arreglo
            
            // <img class="carta" src="assets/cartas/2C.png">
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
            imgCarta.classList.add('carta');
            divCartasComputadora.append( imgCarta );

            if( puntosMinimos > 21 ) {
                break;
            }

        } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) );

        setTimeout(() => {
            if( puntosComputadora === puntosMinimos ) {
                alert('Nadie gana :(');
            } else if ( puntosMinimos > 21 ) {
                alert('Computadora gana')
            } else if( puntosComputadora > 21 ) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana')
            }
        }, 100 );
    }



    // Eventos
    btnPedir.addEventListener('click', () => { // addEventListener es para escuchar un evento
                                                // en este caso cada click
        const carta = pedirCarta();
        
        puntosJugador = puntosJugador + valorCarta( carta );
        puntosHTML[0].innerText = puntosJugador; //[0] es la primera posicion del arreglo
        
        // <img class="carta" src="assets/cartas/2C.png">
        const imgCarta = document.createElement('img'); // se añade una carta
        imgCarta.src = `assets/cartas/${ carta }.png`; // se añade la imagen de la carta
        imgCarta.classList.add('carta'); // se añade la clase carta
        divCartasJugador.append( imgCarta ); // se añade la carta al HTML

        if ( puntosJugador > 21 ) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );

        } else if ( puntosJugador === 21 ) {
            console.warn('21, genial!');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        }

    });


    btnDetener.addEventListener('click', () => {
        btnPedir.disabled   = true;
        btnDetener.disabled = true;

        turnoComputadora( puntosJugador );
    });

    btnNuevo.addEventListener('click', () => {

        console.clear();
        deck = [];
        deck = crearDeck();

        puntosJugador     = 0;
        puntosComputadora = 0;
        
        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled   = false;
        btnDetener.disabled = false;

    });


})();








