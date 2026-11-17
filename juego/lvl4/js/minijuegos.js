
const MINIJUEGOS_NIVEL_4 = [
    // 1. SOPA DE LETRAS 1
    {
        id: "sopa_1",
        tipo: "sopa",
        titulo: "Sopa de Letras 1: Método de la Transformada Inversa",
        instrucciones: "Encuentra las 8 palabras clave sobre el método de la transformada inversa y variables continuas y discretas.",
        tiempoMinutos: 5,
        tamano: 14,
        palabras: [
            "TRANSFORMADA",
            "INVERSA",
            "INTEGRAL",
            "DENSIDAD",
            "ACUMULADA",
            "CONTINUA",
            "DISCRETA",
            "RECTANGULAR"
        ]
    },

    // 2. CRUCIGRAMA 1
    {
        id: "cruci_1",
        tipo: "crucigrama",
        titulo: "Crucigrama 1: Distribución Exponencial y Parámetros",
        instrucciones: "Completa el crucigrama escribiendo en mayúsculas los conceptos de la distribución exponencial y tiempos de falla.",
        tiempoMinutos: 5,
        filas: 11,
        columnas: 9,
        palabras: [
            {
                id: 1,
                palabra: "LOGARITMO",
                dir: "horizontal",
                fila: 3,
                col: 0,
                pista: "Función matemática aplicada al número rectangular R en X = -(1/λ)·ln(R)."
            },
            {
                id: 2,
                palabra: "TIEMPO",
                dir: "horizontal",
                fila: 8,
                col: 0,
                pista: "Magnitud física continua comúnmente modelada entre llegadas o de servicio."
            },
            {
                id: 3,
                palabra: "LAMBDA",
                dir: "horizontal",
                fila: 9,
                col: 0,
                pista: "Parámetro de tasa que representa el número promedio de eventos por unidad de tiempo."
            },
            {
                id: 4,
                palabra: "EXPONENCIAL",
                dir: "vertical",
                fila: 0,
                col: 1,
                pista: "Distribución continua sin memoria utilizada para modelar tiempos de falla y servicio."
            },
            {
                id: 5,
                palabra: "FALLA",
                dir: "vertical",
                fila: 2,
                col: 3,
                pista: "Evento o descompostura en sistemas de ingeniería modelado con tiempos exponenciales."
            },
            {
                id: 6,
                palabra: "MEDIA",
                dir: "vertical",
                fila: 3,
                col: 7,
                pista: "Esperanza matemática de la distribución exponencial equivalente a 1/λ."
            }
        ]
    },

    // 3. SOPA DE LETRAS 2
    {
        id: "sopa_2",
        tipo: "sopa",
        titulo: "Sopa de Letras 2: Distribución de Poisson",
        instrucciones: "Encuentra las 8 palabras relacionadas con la distribución de Poisson y la asignación por intervalos acumulados.",
        tiempoMinutos: 5,
        tamano: 14,
        palabras: [
            "POISSON",
            "FACTORIAL",
            "FRECUENCIA",
            "PROBABILIDAD",
            "EVENTOS",
            "INTERVALO",
            "SUMATORIA",
            "CORTE"
        ]
    },

    // 4. CRUCIGRAMA 2
    {
        id: "cruci_2",
        tipo: "crucigrama",
        titulo: "Crucigrama 2: Distribuciones Uniforme y Empírica",
        instrucciones: "Resuelve el crucigrama con los conceptos de la distribución uniforme continua y empírica por tramos.",
        tiempoMinutos: 5,
        filas: 8,
        columnas: 11,
        palabras: [
            {
                id: 1,
                palabra: "UNIFORME",
                dir: "horizontal",
                fila: 1,
                col: 0,
                pista: "Distribución continua con densidad constante en el intervalo [a, b]."
            },
            {
                id: 2,
                palabra: "TRAMOS",
                dir: "horizontal",
                fila: 4,
                col: 5,
                pista: "Partes o intervalos en los que se define una función empírica según el valor de R."
            },
            {
                id: 3,
                palabra: "RANGO",
                dir: "horizontal",
                fila: 7,
                col: 5,
                pista: "Amplitud de la distribución uniforme obtenida mediante la diferencia (b - a)."
            },
            {
                id: 4,
                palabra: "MINIMO",
                dir: "vertical",
                fila: 0,
                col: 2,
                pista: "Parámetro a en la distribución uniforme que fija el extremo inferior del intervalo."
            },
            {
                id: 5,
                palabra: "EMPIRICA",
                dir: "vertical",
                fila: 0,
                col: 6,
                pista: "Distribución construida a partir de observaciones o frecuencias acumuladas."
            },
            {
                id: 6,
                palabra: "RAIZ",
                dir: "vertical",
                fila: 3,
                col: 7,
                pista: "Operación aplicada en X = √(2R) para generar valores empíricos cuando R ≤ 0.5."
            }
        ]
    },

    // 5. SOPA DE LETRAS 3
    {
        id: "sopa_3",
        tipo: "sopa",
        titulo: "Sopa de Letras 3: Variables Aleatorias y Simulación",
        instrucciones: "Encuentra los 8 términos fundamentales del modelado probabilístico y simulación estocástica.",
        tiempoMinutos: 5,
        tamano: 14,
        palabras: [
            "ESTOCASTICO",
            "ALEATORIA",
            "PARAMETRO",
            "SIMULACION",
            "INTERVALO",
            "VARIANZA",
            "MODELO",
            "RECHAZO"
        ]
    },

    // 6. CRUCIGRAMA 3
    {
        id: "cruci_3",
        tipo: "crucigrama",
        titulo: "Crucigrama 3: Conceptos Fundamentales del Nivel 4",
        instrucciones: "Completa el crucigrama integrando los conceptos globales de simulación y variables aleatorias.",
        tiempoMinutos: 5,
        filas: 8,
        columnas: 10,
        palabras: [
            {
                id: 1,
                palabra: "VARIABLE",
                dir: "horizontal",
                fila: 1,
                col: 0,
                pista: "Característica cuantitativa que toma distintos valores según una ley de probabilidad."
            },
            {
                id: 2,
                palabra: "ALEATORIA",
                dir: "horizontal",
                fila: 4,
                col: 1,
                pista: "Tipo de variable que adopta valores con probabilidades predeterminadas."
            },
            {
                id: 3,
                palabra: "DISCRETA",
                dir: "horizontal",
                fila: 6,
                col: 1,
                pista: "Variable que toma valores aislados como en la distribución Poisson."
            },
            {
                id: 4,
                palabra: "EVENTO",
                dir: "vertical",
                fila: 0,
                col: 0,
                pista: "Resultado o suceso estocástico analizado en la simulación."
            },
            {
                id: 5,
                palabra: "INVERSA",
                dir: "vertical",
                fila: 1,
                col: 3,
                pista: "Tipo de transformada que aplica la función acumulada inversa F⁻¹(R)."
            },
            {
                id: 6,
                palabra: "MEDIA",
                dir: "vertical",
                fila: 1,
                col: 8,
                pista: "Esperanza matemática o promedio esperado de la variable."
            }
        ]
    }
];

/* ---------- VARIABLES DE ESTADO DEL MINIJUEGO ---------- */
let minijuegoActual = null;
let minijuegoReloj = null;
let minijuegoTiempoRestante = 0;

// Variables para sopa de letras
let sopaCuadricula = [];
let sopaSeleccion = [];
let sopaEncontradas = [];
let sopaDirSeleccion = null;
const sopaDirecciones = [
    { df: 0, dc: 1 },   // horizontal →
    { df: 1, dc: 0 }    // vertical ↓
];

// Variables para crucigrama
let cruciPalabrasCompletadas = [];

/* =========================================================
 *  LANZADOR PRINCIPAL
 *  Selecciona aleatoriamente uno de los 6 minijuegos
 *  o permite probar uno en particular pasando su índice (0 a 5)
 *  ========================================================= */
function IniciarMinijuegoNivel4(indiceForzado) {
    let idx = (typeof indiceForzado === "number" && indiceForzado >= 0 && indiceForzado < MINIJUEGOS_NIVEL_4.length)
        ? indiceForzado
        : Math.floor(Math.random() * MINIJUEGOS_NIVEL_4.length);

    minijuegoActual = MINIJUEGOS_NIVEL_4[idx];
    console.log(`[Minijuegos Nivel 4] Iniciando: ${minijuegoActual.titulo} (ID: ${minijuegoActual.id})`);

    const contenedor = document.querySelector(".minijuego");
    if (!contenedor) {
        console.error("No se encontró el contenedor .minijuego en el DOM.");
        return;
    }

    contenedor.innerHTML = ""; // Limpieza para renderizado dinámico

    // Encabezado
    const titulo = document.createElement("h2");
    titulo.className = "minijuego-titulo";
    titulo.textContent = minijuegoActual.titulo;
    contenedor.appendChild(titulo);

    const instruc = document.createElement("p");
    instruc.className = "minijuego-instrucciones";
    instruc.textContent = minijuegoActual.instrucciones;
    contenedor.appendChild(instruc);

    // Reloj
    const tiempo = document.createElement("p");
    tiempo.id = "sopaTiempo"; // Mantiene el ID compatible con CSS de nivel 1
    tiempo.className = "minijuego-tiempo";
    tiempo.textContent = `Tiempo restante: ${minijuegoActual.tiempoMinutos}:00`;
    contenedor.appendChild(tiempo);

    // Cuerpo según tipo
    if (minijuegoActual.tipo === "sopa") {
        ConstruirSopaDOM(contenedor, minijuegoActual);
        IniciarSopaLogica(minijuegoActual);
    } else if (minijuegoActual.tipo === "crucigrama") {
        ConstruirCrucigramaDOM(contenedor, minijuegoActual);
        IniciarCrucigramaLogica(minijuegoActual);
    }

    contenedor.style.display = "block";
    MinijuegoIniciarReloj(minijuegoActual.tiempoMinutos);
}

// Alias de compatibilidad total con problemas4.js / nivel1.js
window.MINIJUEGOS_NIVEL_4 = MINIJUEGOS_NIVEL_4;
window.IniciarMinijuegoNivel4 = IniciarMinijuegoNivel4;
window.IniciarSopa = IniciarMinijuegoNivel4;
window.ProbarMinijuego = IniciarMinijuegoNivel4; // Hook para pruebas desde consola

/* =========================================================
 *  LÓGICA Y RENDERIZADO: SOPA DE LETRAS
 *  ========================================================= */
function ConstruirSopaDOM(contenedor, datos) {
    const cuadriculaEl = document.createElement("div");
    cuadriculaEl.id = "sopaCuadricula";
    contenedor.appendChild(cuadriculaEl);

    const listaEl = document.createElement("div");
    listaEl.id = "sopaLista";
    contenedor.appendChild(listaEl);
}

function IniciarSopaLogica(datos) {
    sopaSeleccion = [];
    sopaEncontradas = [];
    sopaDirSeleccion = null;
    sopaCuadricula = SopaCuadriculaVacia(datos.tamano);

    SopaColocarPalabras(datos.palabras, sopaCuadricula, datos.tamano);
    SopaDibujarCuadricula(sopaCuadricula, datos.tamano, datos.palabras);
    SopaDibujarLista(datos.palabras);
}

function SopaCuadriculaVacia(tamano) {
    return Array(tamano).fill(null).map(() => Array(tamano).fill("_"));
}

function SopaColocarPalabras(palabras, cuadricula, tamano) {
    palabras.forEach(palabra => {
        let colocada = false;
        let intentos = 0;
        while (!colocada && intentos < 500) {
            intentos++;
            const dir = sopaDirecciones[Math.floor(Math.random() * sopaDirecciones.length)];
            const maxFila = dir.df === 1 ? tamano - palabra.length + 1 : tamano;
            const maxCol = dir.dc === 1 ? tamano - palabra.length + 1 : tamano;
            const fila = Math.floor(Math.random() * maxFila);
            const col = Math.floor(Math.random() * maxCol);

            if (SopaCabe(palabra, cuadricula, fila, col, dir)) {
                for (let i = 0; i < palabra.length; i++) {
                    cuadricula[fila + dir.df * i][col + dir.dc * i] = palabra[i];
                }
                colocada = true;
            }
        }
        if (!colocada) console.warn("No cupo la palabra en la sopa: " + palabra);
    });
}

function SopaCabe(palabra, cuadricula, fila, col, dir) {
    for (let i = 0; i < palabra.length; i++) {
        const letra = cuadricula[fila + dir.df * i][col + dir.dc * i];
        if (letra !== "_" && letra !== palabra[i]) return false;
    }
    return true;
}

function SopaDibujarCuadricula(cuadricula, tamano, palabras) {
    const contenedor = document.getElementById("sopaCuadricula");
    contenedor.innerHTML = "";
    contenedor.style.gridTemplateColumns = `repeat(${tamano}, 1fr)`;

    cuadricula.forEach((fila, f) => {
        fila.forEach((letra, c) => {
            const celda = document.createElement("div");
            celda.textContent = letra === "_" ? String.fromCharCode(65 + Math.floor(Math.random() * 26)) : letra;
            celda.dataset.index = f * tamano + c;
            celda.addEventListener("click", () => SopaSeleccionar(f, c, celda, tamano, palabras));
            contenedor.appendChild(celda);
        });
    });
}

function SopaDibujarLista(palabras) {
    const lista = document.getElementById("sopaLista");
    lista.innerHTML = "";
    palabras.forEach(palabra => {
        const el = document.createElement("div");
        el.textContent = palabra;
        el.dataset.palabra = palabra;
        lista.appendChild(el);
    });
}

function SopaSeleccionar(f, c, celda, tamano, palabras) {
    const area = document.getElementById("sopaCuadricula");
    const index = f * tamano + c;
    if (sopaSeleccion.includes(index)) return;

    if (sopaSeleccion.length > 0) {
        const ultimo = sopaSeleccion[sopaSeleccion.length - 1];
        const df = f - Math.floor(ultimo / tamano);
        const dc = c - (ultimo % tamano);
        const esVecina = sopaDirecciones.some(d => d.df === df && d.dc === dc);
        const mismaLinea = sopaDirSeleccion === null || (sopaDirSeleccion.df === df && sopaDirSeleccion.dc === dc);

        if (esVecina && mismaLinea) {
            sopaDirSeleccion = { df: df, dc: dc };
        } else {
            SopaLimpiarSeleccion(area);
        }
    }

    celda.classList.add("selected");
    sopaSeleccion.push(index);

    const texto = sopaSeleccion.map(idx => area.querySelector(`[data-index="${idx}"]`).textContent).join("");

    if (palabras.includes(texto) && !sopaEncontradas.includes(texto)) {
        sopaEncontradas.push(texto);
        sopaSeleccion.forEach(idx => area.querySelector(`[data-index="${idx}"]`).classList.add("found"));
        const itemLista = document.querySelector(`#sopaLista [data-palabra="${texto}"]`);
        if (itemLista) itemLista.classList.add("found");

        sopaSeleccion = [];
        sopaDirSeleccion = null;

        if (sopaEncontradas.length === palabras.length) {
            MinijuegoDetenerReloj();
            setTimeout(MinijuegoGanado, 600);
        }
    } else if (!palabras.some(p => p.startsWith(texto))) {
        SopaLimpiarSeleccion(area);
    }
}

function SopaLimpiarSeleccion(area) {
    sopaSeleccion.forEach(idx => {
        const el = area.querySelector(`[data-index="${idx}"]`);
        if (el) el.classList.remove("selected");
    });
    sopaSeleccion = [];
    sopaDirSeleccion = null;
}

/* =========================================================
 *  LÓGICA Y RENDERIZADO: CRUCIGRAMA
 *  ========================================================= */
function ConstruirCrucigramaDOM(contenedor, datos) {
    const layout = document.createElement("div");
    layout.className = "cruci-layout";

    // Contenedor de la cuadrícula
    const gridWrapper = document.createElement("div");
    gridWrapper.className = "cruci-grid-wrapper";

    const grid = document.createElement("div");
    grid.className = "cruci-grid";
    grid.id = "cruciGrid";
    grid.style.gridTemplateColumns = `repeat(${datos.columnas}, 34px)`;
    grid.style.gridTemplateRows = `repeat(${datos.filas}, 34px)`;
    gridWrapper.appendChild(grid);
    layout.appendChild(gridWrapper);

    // Contenedor de pistas
    const pistas = document.createElement("div");
    pistas.className = "cruci-pistas";
    pistas.id = "cruciPistas";

    const colHoriz = document.createElement("div");
    colHoriz.className = "cruci-col-pistas";
    colHoriz.innerHTML = "<h3>Horizontales</h3>";
    const listaHoriz = document.createElement("ul");
    listaHoriz.id = "pistasHorizontales";
    colHoriz.appendChild(listaHoriz);

    const colVert = document.createElement("div");
    colVert.className = "cruci-col-pistas";
    colVert.innerHTML = "<h3>Verticales</h3>";
    const listaVert = document.createElement("ul");
    listaVert.id = "pistasVerticales";
    colVert.appendChild(listaVert);

    pistas.appendChild(colHoriz);
    pistas.appendChild(colVert);
    layout.appendChild(pistas);

    contenedor.appendChild(layout);
}

function IniciarCrucigramaLogica(datos) {
    cruciPalabrasCompletadas = [];
    const grid = document.getElementById("cruciGrid");
    const listaHoriz = document.getElementById("pistasHorizontales");
    const listaVert = document.getElementById("pistasVerticales");

    // 1) Mapa de celdas activas
    const celdaInfo = {}; // clave: "r,c" -> { letra: 'A', numeros: [1], inputs: [] }
    datos.palabras.forEach(pal => {
        const df = pal.dir === "horizontal" ? 0 : 1;
        const dc = pal.dir === "horizontal" ? 1 : 0;
        for (let i = 0; i < pal.palabra.length; i++) {
            const r = pal.fila + df * i;
            const c = pal.col + dc * i;
            const key = `${r},${c}`;
            if (!celdaInfo[key]) {
                celdaInfo[key] = {
                    letra: pal.palabra[i],
                    badge: i === 0 ? pal.id : null,
                    palabras: [pal.id]
                };
            } else {
                if (i === 0 && !celdaInfo[key].badge) celdaInfo[key].badge = pal.id;
                celdaInfo[key].palabras.push(pal.id);
            }
        }
    });

    // 2) Dibujar cuadrícula
    grid.innerHTML = "";
    for (let r = 0; r < datos.filas; r++) {
        for (let c = 0; c < datos.columnas; c++) {
            const key = `${r},${c}`;
            const info = celdaInfo[key];
            const celda = document.createElement("div");

            if (info) {
                celda.className = "cruci-celda-activa";
                if (info.badge) {
                    const badge = document.createElement("span");
                    badge.className = "cruci-numero";
                    badge.textContent = info.badge;
                    celda.appendChild(badge);
                }
                const input = document.createElement("input");
                input.type = "text";
                input.maxLength = 1;
                input.className = "cruci-input";
                input.dataset.r = r;
                input.dataset.c = c;
                input.dataset.letra = info.letra;
                input.dataset.palabras = info.palabras.join(",");

                input.addEventListener("input", (e) => CruciAlEscribir(e, input, datos));
                input.addEventListener("keydown", (e) => CruciTeclado(e, input, datos));

                celda.appendChild(input);
            } else {
                celda.className = "cruci-celda-bloque";
            }
            grid.appendChild(celda);
        }
    }

    // 3) Dibujar pistas
    listaHoriz.innerHTML = "";
    listaVert.innerHTML = "";
    datos.palabras.forEach(pal => {
        const li = document.createElement("li");
        li.id = `cruci-pista-${pal.id}`;
        li.innerHTML = `<strong>${pal.id}.</strong> ${pal.pista}`;
        if (pal.dir === "horizontal") {
            listaHoriz.appendChild(li);
        } else {
            listaVert.appendChild(li);
        }
    });
}

function CruciAlEscribir(evento, input, datos) {
    const val = input.value.trim().toUpperCase();
    input.value = val;

    if (val !== "") {
        // Validación de palabras completadas
        CruciVerificarPalabras(datos);
        // Avanzar a la siguiente celda
        CruciAvanzarSiguiente(input, datos);
    }
}

function CruciTeclado(evento, input, datos) {
    const r = parseInt(input.dataset.r, 10);
    const c = parseInt(input.dataset.c, 10);

    if (evento.key === "Backspace" && input.value === "") {
        CruciRetrocederAnterior(input, datos);
    } else if (evento.key === "ArrowRight") {
        CruciFoco(r, c + 1);
    } else if (evento.key === "ArrowLeft") {
        CruciFoco(r, c - 1);
    } else if (evento.key === "ArrowDown") {
        CruciFoco(r + 1, c);
    } else if (evento.key === "ArrowUp") {
        CruciFoco(r - 1, c);
    }
}

function CruciFoco(r, c) {
    const nextInput = document.querySelector(`.cruci-input[data-r="${r}"][data-c="${c}"]`);
    if (nextInput) nextInput.focus();
}

function CruciAvanzarSiguiente(input, datos) {
    const ids = input.dataset.palabras.split(",").map(Number);
    // Elegir la primera palabra de la celda para dirección
    const pal = datos.palabras.find(p => p.id === ids[0]);
    if (!pal) return;

    const df = pal.dir === "horizontal" ? 0 : 1;
    const dc = pal.dir === "horizontal" ? 1 : 0;
    const r = parseInt(input.dataset.r, 10) + df;
    const c = parseInt(input.dataset.c, 10) + dc;

    CruciFoco(r, c);
}

function CruciRetrocederAnterior(input, datos) {
    const ids = input.dataset.palabras.split(",").map(Number);
    const pal = datos.palabras.find(p => p.id === ids[0]);
    if (!pal) return;

    const df = pal.dir === "horizontal" ? 0 : 1;
    const dc = pal.dir === "horizontal" ? 1 : 0;
    const r = parseInt(input.dataset.r, 10) - df;
    const c = parseInt(input.dataset.c, 10) - dc;

    CruciFoco(r, c);
}

function CruciVerificarPalabras(datos) {
    datos.palabras.forEach(pal => {
        if (cruciPalabrasCompletadas.includes(pal.id)) return;

        const df = pal.dir === "horizontal" ? 0 : 1;
        const dc = pal.dir === "horizontal" ? 1 : 0;
        let correcta = true;
        const inputsPalabra = [];

        for (let i = 0; i < pal.palabra.length; i++) {
            const r = pal.fila + df * i;
            const c = pal.col + dc * i;
            const inp = document.querySelector(`.cruci-input[data-r="${r}"][data-c="${c}"]`);
            inputsPalabra.push(inp);

            if (!inp || inp.value !== pal.palabra[i]) {
                correcta = false;
            }
        }

        if (correcta) {
            cruciPalabrasCompletadas.push(pal.id);
            inputsPalabra.forEach(inp => {
                inp.classList.add("cruci-palabra-ok");
            });
            const pistaEl = document.getElementById(`cruci-pista-${pal.id}`);
            if (pistaEl) pistaEl.classList.add("found");
        }
    });

    // ¿Se completó todo el crucigrama?
    if (cruciPalabrasCompletadas.length === datos.palabras.length) {
        MinijuegoDetenerReloj();
        setTimeout(MinijuegoGanado, 600);
    }
}

/* =========================================================
 *  RELOJ Y GESTIÓN DE TIEMPO (5 MINUTOS)
 *  ========================================================= */
function MinijuegoIniciarReloj(minutos) {
    MinijuegoDetenerReloj();
    minijuegoTiempoRestante = minutos * 60;
    MinijuegoPintarTiempo();

    minijuegoReloj = setInterval(() => {
        minijuegoTiempoRestante--;
        MinijuegoPintarTiempo();
        if (minijuegoTiempoRestante <= 0) {
            MinijuegoDetenerReloj();
            MinijuegoPerdido();
        }
    }, 1000);
}

function MinijuegoDetenerReloj() {
    if (minijuegoReloj) {
        clearInterval(minijuegoReloj);
        minijuegoReloj = null;
    }
}

function MinijuegoPintarTiempo() {
    const t = Math.max(0, minijuegoTiempoRestante);
    const min = Math.floor(t / 60);
    const seg = String(t % 60).padStart(2, "0");
    const elem = document.getElementById("sopaTiempo");
    if (elem) {
        elem.textContent = `Tiempo restante: ${min}:${seg}`;
    }
}
