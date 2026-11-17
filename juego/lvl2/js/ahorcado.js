// [palabra, pista]  → sin acentos ni espacios
const ahorcadoBanco = [
    ["SERIES", "Prueba que forma parejas con números consecutivos"],
    ["POKER", "Prueba que clasifica los dígitos como manos de cartas"],
    ["DISTANCIAS", "Prueba que mide los huecos entre apariciones de un valor"],
    ["OBSERVADA", "Frecuencia que se cuenta directamente en los datos (FO)"],
    ["ESPERADA", "Frecuencia que se calcula con la probabilidad (FE)"],
    ["INTERVALO", "Rango en el que se agrupan los números"],
    ["HIPOTESIS", "Afirmación que se acepta o se rechaza al final de la prueba"],
    ["QUINTILLA", "Categoría de póker con los cinco dígitos iguales"],
    ["TERCIA", "Categoría de póker con tres dígitos iguales"]
];
const ahorcadoCuantas = 3;        // cuántas palabras hay que adivinar
const ahorcadoIntentosMax = 8;    // errores permitidos en TOTAL
const ahorcadoMinutos = 5;
const ahorcadoLetras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

let ahorcadoPalabras = [];        // las que tocan esta vez
let ahorcadoIndice = 0;           // cuál va
let ahorcadoUsadas = [];          // letras que ya probó en la palabra actual
let ahorcadoIntentos = 0;         // intentos que le quedan
let ahorcadoReloj = null;
let ahorcadoTiempo = 0;
let ahorcadoActivo = false;       // para que el teclado solo funcione mientras se juega

/* ---------- Inicio (lo llama tu juego) ---------- */
function IniciarAhorcado() {
    document.getElementById("ahorcado").style.display = "block";
    document.getElementById("revuelta").style.display = "none";

    // elegir palabras al azar (copia revuelta del banco)
    ahorcadoPalabras = ahorcadoBanco.slice().sort(() => Math.random() - 0.5).slice(0, ahorcadoCuantas);
    ahorcadoIndice = 0;
    ahorcadoIntentos = ahorcadoIntentosMax;
    ahorcadoActivo = true;
    AhorcadoNuevaPalabra();
    AhorcadoIniciarReloj();
}

function AhorcadoNuevaPalabra() {
    ahorcadoUsadas = [];
    document.getElementById("ahorcadoMensaje").textContent = "";
    AhorcadoDibujarTeclado();
    AhorcadoPintar();
}

/* ---------- Dibujar ---------- */
function AhorcadoPintar() {
    const [palabra, pista] = ahorcadoPalabras[ahorcadoIndice];

    // cada letra: si ya la adivinó se ve, si no, un guion bajo
    const oculta = palabra.split("").map(l => ahorcadoUsadas.includes(l) ? l : "_").join(" ");
    document.getElementById("ahorcadoPalabra").textContent = oculta;
    document.getElementById("ahorcadoPista").textContent = "Pista: " + pista;
    document.getElementById("ahorcadoProgreso").textContent =
        "Palabra " + (ahorcadoIndice + 1) + " de " + ahorcadoCuantas;

    // intentos: calabazas encendidas y apagadas
    document.getElementById("ahorcadoIntentos").textContent =
        "Intentos: " + "🪄".repeat(ahorcadoIntentos) + "X".repeat(ahorcadoIntentosMax - ahorcadoIntentos);
}

function AhorcadoDibujarTeclado() {
    const teclado = document.getElementById("ahorcadoTeclado");
    teclado.innerHTML = "";
    ahorcadoLetras.split("").forEach(letra => {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.textContent = letra;
        boton.className = "btn-enviar";
        boton.dataset.letra = letra;
        boton.addEventListener("click", () => AhorcadoProbar(letra));
        teclado.appendChild(boton);
    });
}

/* ---------- Jugar ---------- */
function AhorcadoProbar(letra) {
    if (!ahorcadoActivo || ahorcadoUsadas.includes(letra)) return;   // guarda: ya la usó
    ahorcadoUsadas.push(letra);

    const palabra = ahorcadoPalabras[ahorcadoIndice][0];
    const boton = document.querySelector('#ahorcadoTeclado [data-letra="' + letra + '"]');
    boton.disabled = true;

    if (palabra.includes(letra)) {
        boton.classList.add("acierto");
    } else {
        boton.classList.add("fallo");
        ahorcadoIntentos--;
    }
    AhorcadoPintar();

    // ¿completó la palabra? (todas sus letras están en "usadas")
    const completa = palabra.split("").every(l => ahorcadoUsadas.includes(l));
    if (completa) {
        ahorcadoActivo = false;
        document.getElementById("ahorcadoMensaje").textContent = "¡Bien! Era " + palabra;
        setTimeout(AhorcadoSiguiente, 900);
    } else if (ahorcadoIntentos <= 0) {
        AhorcadoTerminar(false);
    }
}

function AhorcadoSiguiente() {
    ahorcadoIntentos = ahorcadoIntentosMax;
    ahorcadoIndice++;
    if (ahorcadoIndice >= ahorcadoCuantas) {
        AhorcadoTerminar(true);
    } else {
        ahorcadoActivo = true;
        AhorcadoNuevaPalabra();
    }
}

function AhorcadoTerminar(gano) {
    ahorcadoActivo = false;
    AhorcadoDetenerReloj();   // ← usa la función, igual que SopaDetenerReloj
    if (gano) MinijuegoGanado();
    else MinijuegoPerdido();
}

// Teclado físico: también se puede jugar escribiendo
document.addEventListener("keydown", ev => {
    if (!ahorcadoActivo) return;
    const letra = ev.key.toUpperCase();
    if (ahorcadoLetras.includes(letra) && letra.length === 1) AhorcadoProbar(letra);
});

/* ---------- Reloj de 5 minutos ---------- */
function AhorcadoIniciarReloj() {
    clearInterval(ahorcadoReloj);
    ahorcadoTiempo = ahorcadoMinutos * 60;
    AhorcadoPintarTiempo();
    ahorcadoReloj = setInterval(() => {
        ahorcadoTiempo--;
        AhorcadoPintarTiempo();
        if (ahorcadoTiempo <= 0) AhorcadoTerminar(false);
    }, 1000);
}

/* ---------- Reloj de 5 minutos (mismo patrón que la sopa) ---------- */
function AhorcadoIniciarReloj() {
    AhorcadoDetenerReloj();
    ahorcadoTiempo = ahorcadoMinutos * 60;
    AhorcadoPintarTiempo();
    ahorcadoReloj = setInterval(() => {
        ahorcadoTiempo--;
        AhorcadoPintarTiempo();
        if (ahorcadoTiempo <= 0) {
            AhorcadoDetenerReloj();
            AhorcadoTerminar(false);
        }
    }, 1000);
}

function AhorcadoDetenerReloj() {
    clearInterval(ahorcadoReloj);
    ahorcadoReloj = null;
}

function AhorcadoPintarTiempo() {
    const t = Math.max(0, ahorcadoTiempo);
    const min = Math.floor(t / 60);
    const seg = String(t % 60).padStart(2, '0');
    document.getElementById("minijuegoTiempo").textContent = 'Tiempo restante: ' + min + ':' + seg;
}
