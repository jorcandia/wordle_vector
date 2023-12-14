// Lista de palabras posibles
const palabras = ["APPLE", "BANAN", "GRAPE", "LEMON", "MANGO"];

// Seleccionar una palabra al azar
let palabra = palabras[Math.floor(Math.random() * palabras.length)];

let intentos = 6;
let intentosRestantes = intentos;

const input = document.getElementById("adivinar-input");
const boton = document.getElementById("adivinar-button");
const mensaje = document.getElementById("mensaje");
const intentoSobrante = document.getElementById("intentos-restantes");
const numeroIntento = document.getElementById("mensaje-intentos");

document.addEventListener("DOMContentLoaded", inicializarJuego);

function inicializarJuego() {
    mostrarIntentosRestantes();
    boton.addEventListener("click", manejarIntento);
}

function manejarIntento() {
    const intento = leerIntento();

    if (intento === palabra) {
        mostrarResultado("Ganaste", intento, true);
    } else {
        if (validarIntento(intento)) {
            intentos--;

            if (intentos === 0) {
                mostrarResultado("Perdiste. La palabra correcta era: " + palabra, intento);
                deshabilitarJuego();
            } else {
                mostrarIntentosRestantes();
                mostrarPalabraAnterior(intento);
            }
        } else {
            mostrarResultado("Intento inválido. Debes ingresar una palabra de 5 caracteres.");
        }
    }
}

function deshabilitarJuego() {
    input.disabled = true;
    boton.removeEventListener("click", manejarIntento);
}

function leerIntento() {
    const userInput = input.value.toUpperCase();
    return userInput.slice(0, 5);
}

function validarIntento(intento) {
    return intento.length === 5 && intento.trim() !== "";
}

function mostrarResultado(mensajeTexto, palabraIngresada, esGanador) {
    mensaje.textContent = mensajeTexto;
    mensaje.style.color = esGanador ? "green" : "red";

    const palabraAnteriorElement = document.createElement("div");
    palabraAnteriorElement.classList.add("mensaje-anterior");

    for (let i = 0; i < palabraIngresada.length; i++) {
        const letraElement = document.createElement("span");
        letraElement.textContent = palabraIngresada[i];

        if (esGanador) {
            letraElement.classList.add("mensaje-verde");
        } else {
            const letraCorrecta = palabra[i] === palabraIngresada[i];
            const letraEnPalabra = palabra.includes(palabraIngresada[i]);

            if (letraCorrecta) {
                letraElement.classList.add("mensaje-verde");
            } else if (letraEnPalabra) {
                letraElement.classList.add("mensaje-amarillo");
            } else {
                letraElement.classList.add("mensaje-gris");
            }
        }

        palabraAnteriorElement.appendChild(letraElement);
    }

    numeroIntento.appendChild(palabraAnteriorElement);
}

function mostrarIntentosRestantes() {
    intentoSobrante.textContent = "Intentos sobrantes: " + intentos;
}

function mostrarPalabraAnterior(palabraIngresada) {
    mostrarResultado("Intento incorrecto", palabraIngresada);
}
