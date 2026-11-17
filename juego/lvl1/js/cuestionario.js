const c3_Preguntas = [
     {
        pregunta: "¿Qué pasa si a - 1 es divisible por todos los factores primos de m?",
        opciones: [
            "Se cumple una condición para período completo",
            "El generador se vuelve multiplicativo",
            "El módulo m deja de funcionar",
            "La semilla X0 se vuelve cero"
        ],
        correcta: 0
    },

    {
        pregunta: "¿Qué ocurre cuando la secuencia del generador se repite?",
        opciones: [
            "Se alcanzó el período del generador",
            "El generador cambia de fórmula",
            "El módulo m se duplica",
            "La semilla se reinicia sola"
        ],
        correcta: 0
    },

    {
        pregunta: "Un generador multiplicativo se caracteriza por...",
        opciones: [
            "Tener a = 1",
            "No tener módulo",
            "Tener X0 = 0",
            "Tener c = 0",
        ],
        correcta: 3
    },

    {
        pregunta: "¿Qué condición debe cumplir un generador congruencial mixto para tener período completo?",
        opciones: [
            "a y m deben ser iguales",
            "m y c primos entre sí, a ≡ 1 mod p",
            "c debe ser 0 y a par",
            "X0 debe ser impar"
        ],
        correcta: 1
    },

    {
        pregunta: "¿Qué genera un generador congruencial mixto?",
        opciones: [
            "Números verdaderamente aleatorios",
            "Números primos",
            "Números pseudoaleatorios",
            "Números enteros negativos"
        ],
        correcta: 2
    },

    {
        pregunta: "¿Qué hace el operador módulo m en el generador?",
        opciones: [
            "Multiplica el resultado por m",
            "Suma m al resultado",
            "Elimina los decimales",
            "Limita el resultado al rango 0 a m-1",
        ],
        correcta: 3
    },

    {
        pregunta: "¿Para qué sirve la semilla X0 en un generador?",
        opciones: [
            "Fija el período máximo",
            "Define el punto de partida de la secuencia",
            "Determina el valor de m",
            "Evita usar el módulo"
        ],
        correcta: 1
    },

    {
        pregunta: "¿Qué diferencia a un generador multiplicativo del mixto?",
        opciones: [
            "El multiplicativo usa a = 1",
            "El multiplicativo no usa semilla",
            "El multiplicativo usa c = 0",
            "El multiplicativo no tiene período"
        ],
        correcta: 2
    },

    {
        pregunta: "¿Qué significa que un generador tenga período completo?",
        opciones: [
            "Genera solo números pares",
            "Nunca repite valores",
            "Genera infinitos valores distintos",
            "Recorre todos los valores posibles antes de repetirse",
        ],
        correcta: 3
    },

    {
        pregunta: "¿Por qué se dice que estos números son pseudoaleatorios?",
        opciones: [
            "Porque se generan con una fórmula determinista",
            "Porque usan hardware aleatorio",
            "Porque son impredecibles del todo",
            "Porque cambian en cada ejecución"
        ],
        correcta: 0
    }

];

let c3_PreguntasSeleccionadas = [];  // Las 3 preguntas elegidas al azar

const c3_MAX_INTENTOS = 2;
const c3_MINUTOS = 2;

let c3_indice = 0;
let c3_intentos = 0;
let c3_bloqueado = false;
let c3_reloj = null;
let c3_tiempoRestante = 0;

function IniciarCuestionario3() {
    document.getElementById("minijuegoTitulo").textContent = "Cuestionario";
    document.querySelectorAll(".mj-panel").forEach(p => p.classList.remove("activo"));
    document.getElementById("mjCuestionario3").classList.add("activo");
    c3_PreguntasSeleccionadas = c3_SeleccionarAleatorias(c3_Preguntas, 3);
    c3_indice = 0;
    c3_intentos = 0;
    c3_bloqueado = false;
    c3_MostrarPregunta();
    c3_IniciarReloj();
}

// Función auxiliar: mezcla el array y toma los primeros N
function c3_SeleccionarAleatorias(arr, n) {
    const copia = arr.slice();  // no modificar el original
    // Fisher-Yates shuffle
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia.slice(0, n);
}

function c3_Panel() {
    return document.getElementById("mjCuestionario3");
}

function c3_MostrarPregunta() {
    const panel = c3_Panel();
      const p = c3_PreguntasSeleccionadas[c3_indice];
    panel.querySelector(".mj-pregunta").textContent =
        "Pregunta: " + p.pregunta;
    panel.querySelector(".mj-mensaje").textContent = "";
    c3_intentos = 0;
    c3_bloqueado = false;
    panel.querySelector(".mj-num-pregunta").textContent =
        "Pregunta " + (c3_indice + 1) + "/" + c3_PreguntasSeleccionadas.length;
    const cont = panel.querySelector(".mj-opciones");
    cont.innerHTML = "";
    p.opciones.forEach((texto, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "mj-opcion btn-enviar";
        b.textContent = texto;
        b.addEventListener("click", () => c3_Responder(i, b));
        cont.appendChild(b);
    });

    c3_PintarIntentos();
}

function c3_PintarIntentos() {
    c3_Panel().querySelector(".mj-intentos").textContent =
        "Intentos usados en esta pregunta: " + c3_intentos + " / " + c3_MAX_INTENTOS;
}

function c3_Responder(i, boton) {
    if (c3_bloqueado) return;
    const panel = c3_Panel();
    const p = c3_PreguntasSeleccionadas[c3_indice];
    const mensaje = panel.querySelector(".mj-mensaje");

    if (i === p.correcta) {
        c3_bloqueado = true;
        boton.classList.add("ok");
        mensaje.textContent = "¡Correcto!";
        panel.querySelectorAll(".mj-opcion").forEach(b => b.disabled = true);
        setTimeout(() => {
            c3_indice++;
            if (c3_indice >= c3_PreguntasSeleccionadas.length) {   // ← CAMBIO
                c3_DetenerReloj();
                MinijuegoGanado();
            } else {
                c3_MostrarPregunta();
            }
        }, 700);
    } else {
        c3_intentos++;
        boton.classList.add("mal");
        boton.disabled = true;
        c3_PintarIntentos();

        if (c3_intentos >= c3_MAX_INTENTOS) {
            c3_bloqueado = true;
            mensaje.textContent = "Agotaste los intentos. ¡Has perdido!";
            panel.querySelectorAll(".mj-opcion").forEach(b => b.disabled = true);
            c3_DetenerReloj();
            setTimeout(() => MinijuegoPerdido(), 900);
        } else {
            mensaje.textContent = "Incorrecto. Te quedan " +
                (c3_MAX_INTENTOS - c3_intentos) + " intento(s).";
        }
    }
}

function c3_IniciarReloj() {
    c3_DetenerReloj();
    c3_tiempoRestante = c3_MINUTOS * 60;
    c3_PintarTiempo();
    c3_reloj = setInterval(() => {
        c3_tiempoRestante--;
        c3_PintarTiempo();
        if (c3_tiempoRestante <= 0) {
            c3_DetenerReloj();
            c3_bloqueado = true;
            c3_Panel().querySelectorAll(".mj-opcion").forEach(b => b.disabled = true);
            c3_Panel().querySelector(".mj-mensaje").textContent =
                "¡Se acabó el tiempo! Has perdido.";
            setTimeout(() => MinijuegoPerdido(), 900);
        }
    }, 1000);
}

function c3_DetenerReloj() {
    clearInterval(c3_reloj);
    c3_reloj = null;
}

function c3_PintarTiempo() {
    const t = Math.max(0, c3_tiempoRestante);
    const min = Math.floor(t / 60);
    const seg = String(t % 60).padStart(2, '0');
    document.getElementById('minijuegoTiempo').textContent =
        'Tiempo restante: ' + min + ':' + seg;
}
