/* =========================================================
   MINI-JUEGO 1: SOPA DE LETRAS (nivel 1)
   Contrato con el juego:
   - El juego llama a IniciarSopa() para empezar.
   - La sopa llama a MinijuegoGanado() o MinijuegoPerdido() al terminar.
   ========================================================= */

// const sopaPalabras = ["MIXTO", "MULTIPLICATIVO", "CONGRUENCIAL", "MODULO", "DECIMAL", "BINARIO", "PERIODO", "RECTANGULAR"];
const sopaTamano = 14;          // = largo de la palabra más larga (MULTIPLICATIVO)
const sopaMinutos = 5;
const palabras = [
    ["MIXTO", "MULTIPLICATIVO", "CONGRUENCIAL", "MODULO", "DECIMAL", "BINARIO", "PERIODO", "RECTANGULAR"],
    ["generador", "semilla", "modulo", "multiplicador", "incremento", "periodo", "secuencia", "congruencial"],
    ["pseudoaleatorio", "determinista", "recurrencia", "formula", "rango", "ciclo", "estado", "iteracion"],
    ["mixto", "multiplicativo", "aditivo", "lineal", "modular", "aritmetica", "residuo", "cociente"],
    ["aleatorio", "uniforme", "distribucion", "simulacion", "muestreo", "entropia", "predictible", "reproducible"],
    ["parametro", "constante", "variable", "inicializacion", "desbordamiento", "truncamiento", "redondeo", "precision"],
    ["computadora", "algoritmo", "software", "programa", "funcion", "codigo", "ejecucion", "proceso"],
    ["estadistica", "frecuencia", "correlacion", "independencia", "sesgo", "media", "varianza", "prueba"],
    ["criptografia", "seguridad", "clave", "hash", "ruido", "azar", "caos", "impredecible"],
    ["matematica", "algebra", "numero", "entero", "modulo", "ecuacion", "sucesion", "convergencia"]
];

let sopaCuadricula;
let sopaSeleccion = [];
let sopaEncontradas = [];
let sopaReloj = null;
let sopaTiempoRestante = 0;
let sopaDirSeleccion = null;
let arrayRandom = [];

/* ---------- Inicio (lo llama tu juego) ---------- */
function IniciarSopa() {
    // Título variable y panel visible
    document.getElementById("minijuegoTitulo").textContent =
        "Sopa de letras: generación de números rectangulares";
    document.querySelectorAll(".mj-panel").forEach(p => p.classList.remove("activo"));
    document.getElementById("mjSopa").classList.add("activo");

    sopaSeleccion = [];
    sopaEncontradas = [];
    sopaDirSeleccion = null;
    sopaCuadricula = SopaCuadriculaVacia(sopaTamano);
    arrayRandom = palabras[Math.floor(Math.random() * palabras.length)];
    SopaColocarPalabras(arrayRandom, sopaCuadricula);
    SopaDibujarCuadricula(sopaCuadricula);
    SopaDibujarLista(arrayRandom);
    SopaIniciarReloj();
}

function SopaCuadriculaVacia(tamano) {
    return Array(tamano).fill(null).map(() => Array(tamano).fill('_'));
}

const sopaDirecciones = [
    { df: 0, dc: 1 },   // horizontal →
    { df: 1, dc: 0 }    // vertical ↓
];

function SopaColocarPalabras(palabras, cuadricula) {
    palabras.forEach(palabra => {
        let colocada = false;
        let intentos = 0;
        while (!colocada && intentos < 500) {
            intentos++;
            const dir = sopaDirecciones[Math.floor(Math.random() * sopaDirecciones.length)];
            const maxFila = dir.df === 1 ? sopaTamano - palabra.length + 1 : sopaTamano;
            const maxCol = dir.dc === 1 ? sopaTamano - palabra.length + 1 : sopaTamano;
            const fila = Math.floor(Math.random() * maxFila);
            const col = Math.floor(Math.random() * maxCol);
            if (SopaCabe(palabra, cuadricula, fila, col, dir)) {
                for (let i = 0; i < palabra.length; i++) {
                    cuadricula[fila + dir.df * i][col + dir.dc * i] = palabra[i];
                }
                colocada = true;
            }
        }
        if (!colocada) console.warn("No cupo la palabra: " + palabra);
    });
}

function SopaCabe(palabra, cuadricula, fila, col, dir) {
    for (let i = 0; i < palabra.length; i++) {
        const letra = cuadricula[fila + dir.df * i][col + dir.dc * i];
        if (letra !== '_' && letra !== palabra[i]) return false;
    }
    return true;
}

function SopaDibujarCuadricula(cuadricula) {
    const contenedor = document.getElementById('sopaCuadricula');
    contenedor.innerHTML = '';
    contenedor.style.gridTemplateColumns = 'repeat(' + sopaTamano + ', 1fr)';
    cuadricula.forEach((fila, f) => {
        fila.forEach((letra, c) => {
            const celda = document.createElement('div');
            celda.textContent = letra === '_' ? String.fromCharCode(65 + Math.floor(Math.random() * 26)) : letra;
            celda.dataset.index = f * sopaTamano + c;
            celda.addEventListener('click', () => SopaSeleccionar(f, c, celda));
            contenedor.appendChild(celda);
        });
    });
}

function SopaDibujarLista(palabras) {
    const lista = document.getElementById('sopaLista');
    lista.innerHTML = '';
    palabras.forEach(palabra => {
        const el = document.createElement('div');
        el.textContent = palabra;
        el.dataset.palabra = palabra;
        lista.appendChild(el);
    });
}

function SopaSeleccionar(f, c, celda) {
    const area = document.getElementById('sopaCuadricula');
    const index = f * sopaTamano + c;
    if (sopaSeleccion.includes(index)) return;

    if (sopaSeleccion.length > 0) {
        const ultimo = sopaSeleccion[sopaSeleccion.length - 1];
        const df = f - Math.floor(ultimo / sopaTamano);
        const dc = c - (ultimo % sopaTamano);
        const esVecina = sopaDirecciones.some(d => d.df === df && d.dc === dc);
        const mismaLinea = sopaDirSeleccion === null || (sopaDirSeleccion.df === df && sopaDirSeleccion.dc === dc);

        if (esVecina && mismaLinea) {
            sopaDirSeleccion = { df: df, dc: dc };
        } else {
            SopaLimpiarSeleccion(area);
        }
    }

    celda.classList.add('selected');
    sopaSeleccion.push(index);

    const texto = sopaSeleccion.map(idx => area.querySelector(`[data-index="${idx}"]`).textContent).join('');

    if (arrayRandom.includes(texto) && !sopaEncontradas.includes(texto)) {
        sopaEncontradas.push(texto);
        sopaSeleccion.forEach(idx => area.querySelector(`[data-index="${idx}"]`).classList.add('found'));
        document.querySelector(`#sopaLista [data-palabra="${texto}"]`).classList.add('found');
        sopaSeleccion = [];
        sopaDirSeleccion = null;

        if (sopaEncontradas.length === arrayRandom.length) {
            SopaDetenerReloj();
            setTimeout(MinijuegoGanado, 600);
        }
    } else if (!arrayRandom.some(p => p.startsWith(texto))) {
        SopaLimpiarSeleccion(area);
    }
}

function SopaLimpiarSeleccion(area) {
    sopaSeleccion.forEach(idx => area.querySelector(`[data-index="${idx}"]`).classList.remove('selected'));
    sopaSeleccion = [];
    sopaDirSeleccion = null;
}

function SopaIniciarReloj() {
    SopaDetenerReloj();
    sopaTiempoRestante = sopaMinutos * 60;
    SopaPintarTiempo();
    sopaReloj = setInterval(() => {
        sopaTiempoRestante--;
        SopaPintarTiempo();
        if (sopaTiempoRestante <= 0) {
            SopaDetenerReloj();
            MinijuegoPerdido();
        }
    }, 1000);
}

function SopaDetenerReloj() {
    clearInterval(sopaReloj);
    sopaReloj = null;
}

function SopaPintarTiempo() {
    const t = Math.max(0, sopaTiempoRestante);
    const min = Math.floor(t / 60);
    const seg = String(t % 60).padStart(2, '0');
    document.getElementById('minijuegoTiempo').textContent = 'Tiempo restante: ' + min + ':' + seg;
}
