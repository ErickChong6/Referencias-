// [palabra, pista]  → sin acentos ni espacios
const revueltaBanco = [
    ["FRECUENCIA", "Número de veces que aparece algo"],
    ["ALEATORIO", "Que no sigue ningún patrón"],
    ["PAREJAS", "En la prueba de series, los números se agrupan en…"],
    ["CATEGORIA", "En póker: TD, 1P, 2P, T…"],
    ["CHICUADRADA", "Estadístico que compara FO contra FE"],
    ["RECHAZAR", "Lo que se hace si χ² calculada es mayor que la de tablas"],
    ["PROBABILIDAD", "Se multiplica por n para obtener FE"],
    ["MUESTRA", "Conjunto de números que se analiza"]
];
const revueltaCuantas = 4;       // cuántas palabras hay que resolver
const revueltaMinutos = 5;

let revueltaPalabras = [];       // las que faltan por resolver
let revueltaResueltas = 0;
let revueltaReloj = null;
let revueltaTiempo = 0;
let revueltaActivo = false;

/* ---------- Inicio (lo llama tu juego) ---------- */
function IniciarRevuelta() {
    document.getElementById("revuelta").style.display = "block";
    document.getElementById("ahorcado").style.display = "none";

    revueltaPalabras = revueltaBanco.slice().sort(() => Math.random() - 0.5).slice(0, revueltaCuantas);
    revueltaResueltas = 0;
    revueltaActivo = true;
    RevueltaMostrar();
    RevueltaIniciarReloj();
}

// Desordena las letras; si por casualidad queda igual, lo intenta otra vez
function RevueltaDesordenar(palabra) {
    let revuelta = palabra;
    while (revuelta === palabra) {
        revuelta = palabra.split("").sort(() => Math.random() - 0.5).join("");
    }
    return revuelta;
}

function RevueltaMostrar() {
    const [palabra, pista] = revueltaPalabras[0];          // siempre se trabaja con la primera
    document.getElementById("revueltaLetras").textContent = RevueltaDesordenar(palabra).split("").join(" ");
    document.getElementById("revueltaPista").textContent = "Pista: " + pista;
    document.getElementById("revueltaProgreso").textContent =
        "Resueltas: " + revueltaResueltas + " de " + revueltaCuantas;
    const input = document.getElementById("revueltaInput");
    input.value = "";
    input.focus();
}

/* ---------- Jugar ---------- */
function RevueltaComprobar() {
    if (!revueltaActivo) return;
    const input = document.getElementById("revueltaInput");
    const mensaje = document.getElementById("revueltaMensaje");
    const escrita = input.value.trim().toUpperCase();
    const correcta = revueltaPalabras[0][0];

    if (escrita === "") return;

    if (escrita === correcta) {
        revueltaResueltas++;
        revueltaPalabras.shift();                          // quita la primera de la lista
        mensaje.textContent = "¡Correcto!";
        if (revueltaPalabras.length === 0) {
            RevueltaTerminar(true);
        } else {
            RevueltaMostrar();
        }
    } else {
        mensaje.textContent = "Esa no es. Inténtalo otra vez.";
        input.select();
    }
}

function RevueltaSaltar() {
    if (!revueltaActivo) return;
    revueltaPalabras.push(revueltaPalabras.shift());       // la manda al final de la fila
    document.getElementById("revueltaMensaje").textContent = "";
    RevueltaMostrar();
}

function RevueltaTerminar(gano) {
    revueltaActivo = false;
    clearInterval(revueltaReloj);
    if (gano) MinijuegoGanado();       // ← avisa a tu juego
    else MinijuegoPerdido();
}

// Enter comprueba
document.addEventListener("keydown", ev => {
    if (revueltaActivo && ev.key === "Enter" && document.activeElement.id === "revueltaInput") {
        RevueltaComprobar();
    }
});

/* ---------- Reloj de 5 minutos ---------- */
function RevueltaIniciarReloj() {
    clearInterval(revueltaReloj);
    revueltaTiempo = revueltaMinutos * 60;
    RevueltaPintarTiempo();
    revueltaReloj = setInterval(() => {
        revueltaTiempo--;
        RevueltaPintarTiempo();
        if (revueltaTiempo <= 0) RevueltaTerminar(false);
    }, 1000);
}

function RevueltaPintarTiempo() {
    const t = Math.max(0, revueltaTiempo);
    document.getElementById("miniTiempo").textContent =
        "Tiempo restante: " + Math.floor(t / 60) + ":" + String(t % 60).padStart(2, "0");
}