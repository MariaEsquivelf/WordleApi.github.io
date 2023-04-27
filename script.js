let intentos = 6
const API = 'https://random-word-api.herokuapp.com/word?number=1&length=5&lang=es'

fetch(API).then(response => response.json()).then(response => {
  palabra = response[0].toUpperCase();
  console.log(palabra);

}).catch(error => console.log(error))

const BOTON = document.getElementById('guess-button')
BOTON.addEventListener('click', intentar);

function leerIntento() {
  let intento = document.getElementById('guess-input').value;
  return intento.toUpperCase();
}
function intentar() {

  const INTENTO = leerIntento()
  if (!tamanho(INTENTO)) {
    return false;
  }
  const GRID = document.getElementById("grid");
  const ROW = document.createElement('div');
  ROW.className = 'row';

  for (let i in palabra) {
    const SPAN = document.createElement('span');
    SPAN.className = 'letter';

    if (INTENTO[i] === palabra[i]) { //VERDE
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = '#02BB40';
    } else if (palabra.includes(INTENTO[i])) { //AMARILLO
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = '#FFC300';
    } else {      //GRIS
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = '#E5E5E5';
    }
    ROW.appendChild(SPAN)
  }
  GRID.appendChild(ROW)
  if (INTENTO === palabra) {
    console.log(finalizar("<h1>HAS GANADO</h1>"))
    return
  }

  intentos--
  if (intentos == 0) {
    finalizar("<h1>HAS PERDIDO</h1>")

  }
}

function tamanho(palabra) {
  if (palabra.length == 5) {
    return true
  }
  return false
}

function finalizar(mensaje) {
  const INPUT = document.getElementById("guess-input");
  INPUT.disabled = true;
  BOTON.disabled = true;
  let contenedor = document.getElementById('guesses');
  contenedor.innerHTML = mensaje;
}