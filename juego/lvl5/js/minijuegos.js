/* =========================================================
 *  minijuegos5.js  —  MINIJUEGOS DEL NIVEL 5: APLICACIONES DE SIMULACIÓN
 *  3 Sopas de Letras y 3 Crucigramas (alternados).
 *  ========================================================= */

const MINIJUEGOS_NIVEL_5 = [
    // 1. SOPA DE LETRAS 1 (INVENTARIOS)
    {
        id: "sopa_1_n5",
        tipo: "sopa",
        titulo: "Sopa de Letras 1: Sistemas de Inventario y Políticas (q, R)",
        instrucciones: "Encuentra las 8 palabras sobre control de inventarios estocásticos, demandas, factores estacionales y costos.",
        tiempoMinutos: 5,
        tamano: 14,
        palabras: [
            "INVENTARIO", "REORDEN", "DEMANDA", "ENTREGA", 
            "FALTANTE", "ESTACIONAL", "ORDENAR", "MANTENER"
        ]
    },

    // 2. CRUCIGRAMA 1 (COLAS Y VARIABLES DE SIMULACIÓN)
    {
        id: "cruci_1_n5",
        tipo: "crucigrama",
        titulo: "Crucigrama 1: Teoría de Colas y Variables de Simulación",
        instrucciones: "Completa el crucigrama identificando las entidades, variables exógenas y endógenas en la sección de caja.",
        tiempoMinutos: 5,
        filas: 10,
        columnas: 9,
        palabras: [
            { id: 1, palabra: "EXOGENA", dir: "horizontal", fila: 1, col: 0, pista: "Variable externa al sistema que influye en su comportamiento." },
            { id: 2, palabra: "CLIENTE", dir: "horizontal", fila: 6, col: 1, pista: "Entidad que arriba al sistema demandando atención en la caja." },
            { id: 3, palabra: "LLEGADA", dir: "horizontal", fila: 8, col: 0, pista: "Evento que marca la entrada de una entidad al sistema." },
            { id: 4, palabra: "ESPERA", dir: "vertical", fila: 1, col: 0, pista: "Tiempo que permanece un cliente en la fila antes de ser atendido." },
            { id: 5, palabra: "CANAL", dir: "vertical", fila: 2, col: 2, pista: "Vía de servicio por la que se atiende a los usuarios." },
            { id: 6, palabra: "ENDOGENA", dir: "vertical", fila: 1, col: 4, pista: "Variable interna del sistema que describe su estado o resultados." }
        ]
    },

    // 3. SOPA DE LETRAS 2 (COLAS Y FLUJO DE ATENCIÓN)
    {
        id: "sopa_2_n5",
        tipo: "sopa",
        titulo: "Sopa de Letras 2: Simulación de Servicio y Caja",
        instrucciones: "Localiza los 8 términos relacionados con los tiempos de servicio, inactividad del cajero y métricas de desempeño.",
        tiempoMinutos: 5,
        tamano: 14,
        palabras: [
            "SERVICIO", "INACTIVO", "DESOCUPADO", "REGISTRADORA", 
            "SISTEMA", "PROMEDIO", "ENTIDAD", "ACTIVIDAD"
        ]
    },

    // 4. CRUCIGRAMA 2 (JUEGO DE VOLADOS Y APUESTAS)
    {
        id: "cruci_2_n5",
        tipo: "crucigrama",
        titulo: "Crucigrama 2: Simulación de Volados y Apuestas",
        instrucciones: "Resuelve el crucigrama con las reglas de la simulación de volados: apuestas, saldo disponible, metas y quiebras.",
        tiempoMinutos: 5,
        filas: 8,
        columnas: 12,
        palabras: [
            { id: 1, palabra: "APUESTA", dir: "horizontal", fila: 1, col: 0, pista: "Cantidad de dinero arriesgada en cada volado que se duplica tras una pérdida." },
            { id: 2, palabra: "CORRIDA", dir: "horizontal", fila: 4, col: 5, pista: "Secuencia de volados simulados que finaliza al alcanzar la meta o llegar a la quiebra." },
            { id: 3, palabra: "GANANCIA", dir: "horizontal", fila: 6, col: 1, pista: "Saldo positivo obtenido cuando el número aleatorio es menor o igual a 0.5." },
            { id: 4, palabra: "SALDO", dir: "vertical", fila: 0, col: 6, pista: "Dinero disponible antes o después de cada lanzamiento que limita la apuesta máxima." },
            { id: 5, palabra: "QUIEBRA", dir: "vertical", fila: 0, col: 2, pista: "Estado terminal de la corrida cuando la cantidad disponible llega a cero ($0)." },
            { id: 6, palabra: "META", dir: "vertical", fila: 1, col: 11, pista: "Monto objetivo de capital fijado que determina la victoria al ser alcanzado." }
        ]
    },

    // 5. SOPA DE LETRAS 3 (VOLADOS Y PROBABILIDAD DE METAS)
    {
        id: "sopa_3_n5",
        tipo: "sopa",
        titulo: "Sopa de Letras 3: Juego de Volados y Rendimiento",
        instrucciones: "Encuentra las 8 palabras clave sobre los factores determinantes en la simulación estocástica de volados.",
        tiempoMinutos: 5,
        tamano: 14,
        palabras: [
            "VOLADOS", "DUPLICAR", "ALEATORIO", "PERDIDA", 
            "DISPONIBLE", "PROBABILIDAD", "CAPITAL", "TERMINACION"
        ]
    },

    // 6. CRUCIGRAMA 3 (OBJETIVOS Y COSTOS DE SIMULACIÓN)
    {
        id: "cruci_3_n5",
        tipo: "crucigrama",
        titulo: "Crucigrama 3: Objetivos y Costos en Simulación de Inventarios",
        instrucciones: "Completa el crucigrama sobre los objetivos formales de la simulación y los costos de optimización económica.",
        tiempoMinutos: 5,
        filas: 13,
        columnas: 9,
        palabras: [
            { id: 1, palabra: "ANALISIS", dir: "horizontal", fila: 1, col: 1, pista: "Uno de los objetivos primordiales de la simulación para estudiar sistemas." },
            { id: 2, palabra: "COSTO", dir: "horizontal", fila: 3, col: 0, pista: "Erogación económica asociada a ordenar, llevar inventario o sufrir faltantes." },
            { id: 3, palabra: "OPTIMA", dir: "horizontal", fila: 6, col: 1, pista: "Característica de la cantidad a ordenar (q) que minimiza los costos totales." },
            { id: 4, palabra: "FALTANTE", dir: "vertical", fila: 0, col: 3, pista: "Cantidad de demanda no satisfecha por insuficiencia de existencias." },
            { id: 5, palabra: "DISENO", dir: "vertical", fila: 0, col: 5, pista: "Uso de la simulación para configurar y dimensionar nuevos sistemas operativos." },
            { id: 6, palabra: "POLITICA", dir: "vertical", fila: 5, col: 1, pista: "Regla de decisión de inventarios basada en los parámetros (q, R)." }
        ]
    }
];

/* ---------- VARIABLES DE ESTADO ---------- */
let minijuegoActualN5 = null;
let minijuegoRelojN5 = null;
let minijuegoTiempoRestanteN5 = 0;
let minijuegoTerminadoN5 = false; // Bandera para evitar doble ejecución

// Variables para sopa
let sopaCuadriculaN5 = [];
let sopaSeleccionN5 = [];
let sopaEncontradasN5 = [];
let sopaDirSeleccionN5 = null;
const sopaDireccionesN5 = [{ df: 0, dc: 1 }, { df: 1, dc: 0 }];

// Variables para crucigrama
let cruciPalabrasCompletadasN5 = [];

/* =========================================================
 *  LANZADOR PRINCIPAL
 * ========================================================= */
function IniciarMinijuegoNivel5(indiceForzado) {
    // Reiniciar estados de partida anterior
    MinijuegoDetenerRelojN5();
    minijuegoTerminadoN5 = false;

    let idx = (typeof indiceForzado === "number" && indiceForzado >= 0 && indiceForzado < MINIJUEGOS_NIVEL_5.length)
        ? indiceForzado
        : Math.floor(Math.random() * MINIJUEGOS_NIVEL_5.length);

    minijuegoActualN5 = MINIJUEGOS_NIVEL_5[idx];
    
    const contenedor = document.querySelector(".minijuego") || document.getElementById("minijuego-container");
    if (!contenedor) {
        console.error("No se encontró el contenedor del minijuego en el DOM.");
        return;
    }

    contenedor.innerHTML = ""; 

    const titulo = document.createElement("h2");
    titulo.className = "minijuego-titulo";
    titulo.textContent = minijuegoActualN5.titulo;
    contenedor.appendChild(titulo);

    const instruc = document.createElement("p");
    instruc.className = "minijuego-instrucciones";
    instruc.textContent = minijuegoActualN5.instrucciones;
    contenedor.appendChild(instruc);

    const tiempo = document.createElement("p");
    tiempo.id = "sopaTiempo"; 
    tiempo.className = "minijuego-tiempo";
    tiempo.textContent = `Tiempo restante: ${minijuegoActualN5.tiempoMinutos}:00`;
    contenedor.appendChild(tiempo);

    if (minijuegoActualN5.tipo === "sopa") {
        ConstruirSopaDOMN5(contenedor);
        IniciarSopaLogicaN5(minijuegoActualN5);
    } else if (minijuegoActualN5.tipo === "crucigrama") {
        ConstruirCrucigramaDOMN5(contenedor, minijuegoActualN5);
        IniciarCrucigramaLogicaN5(minijuegoActualN5);
    }

    contenedor.style.display = "block";
    MinijuegoIniciarRelojN5(minijuegoActualN5.tiempoMinutos);
}

// Alias para compatibilidad
window.IniciarMinijuegoNivel5 = IniciarMinijuegoNivel5;
window.IniciarSopa = IniciarMinijuegoNivel5; 

/* =========================================================
 *  LÓGICA: SOPA DE LETRAS
 * ========================================================= */
function ConstruirSopaDOMN5(contenedor) {
    const cuadriculaEl = document.createElement("div");
    cuadriculaEl.id = "sopaCuadricula";
    contenedor.appendChild(cuadriculaEl);

    const listaEl = document.createElement("div");
    listaEl.id = "sopaLista";
    contenedor.appendChild(listaEl);
}

function IniciarSopaLogicaN5(datos) {
    sopaSeleccionN5 = [];
    sopaEncontradasN5 = [];
    sopaDirSeleccionN5 = null;
    sopaCuadriculaN5 = Array(datos.tamano).fill(null).map(() => Array(datos.tamano).fill("_"));

    // Colocar palabras
    datos.palabras.forEach(palabra => {
        let colocada = false;
        let intentos = 0;
        while (!colocada && intentos < 500) {
            intentos++;
            const dir = sopaDireccionesN5[Math.floor(Math.random() * sopaDireccionesN5.length)];
            const maxFila = dir.df === 1 ? datos.tamano - palabra.length + 1 : datos.tamano;
            const maxCol = dir.dc === 1 ? datos.tamano - palabra.length + 1 : datos.tamano;
            const fila = Math.floor(Math.random() * maxFila);
            const col = Math.floor(Math.random() * maxCol);

            let cabe = true;
            for (let i = 0; i < palabra.length; i++) {
                const letra = sopaCuadriculaN5[fila + dir.df * i][col + dir.dc * i];
                if (letra !== "_" && letra !== palabra[i]) { cabe = false; break; }
            }
            if (cabe) {
                for (let i = 0; i < palabra.length; i++) {
                    sopaCuadriculaN5[fila + dir.df * i][col + dir.dc * i] = palabra[i];
                }
                colocada = true;
            }
        }
    });

    // Dibujar
    const contenedor = document.getElementById("sopaCuadricula");
    contenedor.innerHTML = "";
    contenedor.style.gridTemplateColumns = `repeat(${datos.tamano}, 1fr)`;

    sopaCuadriculaN5.forEach((fila, f) => {
        fila.forEach((letra, c) => {
            const celda = document.createElement("div");
            celda.textContent = letra === "_" ? String.fromCharCode(65 + Math.floor(Math.random() * 26)) : letra;
            celda.dataset.index = f * datos.tamano + c;
            celda.addEventListener("click", () => SopaSeleccionarN5(f, c, celda, datos.tamano, datos.palabras));
            contenedor.appendChild(celda);
        });
    });

    // Dibujar lista
    const lista = document.getElementById("sopaLista");
    lista.innerHTML = "";
    datos.palabras.forEach(palabra => {
        const el = document.createElement("div");
        el.textContent = palabra;
        el.dataset.palabra = palabra;
        lista.appendChild(el);
    });
}

function SopaSeleccionarN5(f, c, celda, tamano, palabras) {
    if (minijuegoTerminadoN5) return;
    const area = document.getElementById("sopaCuadricula");
    const index = f * tamano + c;
    if (sopaSeleccionN5.includes(index)) return;

    if (sopaSeleccionN5.length > 0) {
        const ultimo = sopaSeleccionN5[sopaSeleccionN5.length - 1];
        const df = f - Math.floor(ultimo / tamano);
        const dc = c - (ultimo % tamano);
        const esVecina = sopaDireccionesN5.some(d => d.df === df && d.dc === dc);
        const mismaLinea = sopaDirSeleccionN5 === null || (sopaDirSeleccionN5.df === df && sopaDirSeleccionN5.dc === dc);

        if (esVecina && mismaLinea) {
            sopaDirSeleccionN5 = { df: df, dc: dc };
        } else {
            SopaLimpiarSeleccionN5(area);
        }
    }

    celda.classList.add("selected");
    sopaSeleccionN5.push(index);

    const texto = sopaSeleccionN5.map(idx => area.querySelector(`[data-index="${idx}"]`).textContent).join("");

    if (palabras.includes(texto) && !sopaEncontradasN5.includes(texto)) {
        sopaEncontradasN5.push(texto);
        sopaSeleccionN5.forEach(idx => {
            const el = area.querySelector(`[data-index="${idx}"]`);
            el.classList.remove("selected");
            el.classList.add("found");
        });
        const itemLista = document.querySelector(`#sopaLista [data-palabra="${texto}"]`);
        if (itemLista) itemLista.classList.add("found");

        sopaSeleccionN5 = [];
        sopaDirSeleccionN5 = null;

        if (sopaEncontradasN5.length === palabras.length) {
            MinijuegoDetenerRelojN5();
            if (!minijuegoTerminadoN5) {
                minijuegoTerminadoN5 = true;
                setTimeout(MinijuegoGanado, 600);
            }
        }
    } else if (!palabras.some(p => p.startsWith(texto))) {
        SopaLimpiarSeleccionN5(area);
    }
}

function SopaLimpiarSeleccionN5(area) {
    sopaSeleccionN5.forEach(idx => {
        const el = area.querySelector(`[data-index="${idx}"]`);
        if (el) el.classList.remove("selected");
    });
    sopaSeleccionN5 = [];
    sopaDirSeleccionN5 = null;
}

/* =========================================================
 *  LÓGICA: CRUCIGRAMA
 * ========================================================= */
function ConstruirCrucigramaDOMN5(contenedor, datos) {
    const layout = document.createElement("div");
    layout.className = "cruci-layout";

    const gridWrapper = document.createElement("div");
    gridWrapper.className = "cruci-grid-wrapper";

    const grid = document.createElement("div");
    grid.className = "cruci-grid";
    grid.id = "cruciGridN5";
    grid.style.gridTemplateColumns = `repeat(${datos.columnas}, 34px)`;
    grid.style.gridTemplateRows = `repeat(${datos.filas}, 34px)`;
    gridWrapper.appendChild(grid);
    layout.appendChild(gridWrapper);

    const pistas = document.createElement("div");
    pistas.className = "cruci-pistas";
    pistas.id = "cruciPistasN5";

    const colHoriz = document.createElement("div");
    colHoriz.className = "cruci-col-pistas";
    colHoriz.innerHTML = "<h3>Horizontales</h3>";
    const listaHoriz = document.createElement("ul");
    listaHoriz.id = "pistasHorizontalesN5";
    colHoriz.appendChild(listaHoriz);

    const colVert = document.createElement("div");
    colVert.className = "cruci-col-pistas";
    colVert.innerHTML = "<h3>Verticales</h3>";
    const listaVert = document.createElement("ul");
    listaVert.id = "pistasVerticalesN5";
    colVert.appendChild(listaVert);

    pistas.appendChild(colHoriz);
    pistas.appendChild(colVert);
    layout.appendChild(pistas);

    contenedor.appendChild(layout);
}

function IniciarCrucigramaLogicaN5(datos) {
    cruciPalabrasCompletadasN5 = [];
    const grid = document.getElementById("cruciGridN5");
    const listaHoriz = document.getElementById("pistasHorizontalesN5");
    const listaVert = document.getElementById("pistasVerticalesN5");

    const celdaInfo = {};
    datos.palabras.forEach(pal => {
        const df = pal.dir === "horizontal" ? 0 : 1;
        const dc = pal.dir === "horizontal" ? 1 : 0;
        for (let i = 0; i < pal.palabra.length; i++) {
            const r = pal.fila + df * i;
            const c = pal.col + dc * i;
            const key = `${r},${c}`;
            if (!celdaInfo[key]) {
                celdaInfo[key] = { letra: pal.palabra[i], badge: i === 0 ? pal.id : null, palabras: [pal.id] };
            } else {
                if (i === 0 && !celdaInfo[key].badge) celdaInfo[key].badge = pal.id;
                celdaInfo[key].palabras.push(pal.id);
            }
        }
    });

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
                input.dataset.palabras = info.palabras.join(",");

                input.addEventListener("input", (e) => CruciAlEscribirN5(e, input, datos));
                input.addEventListener("keydown", (e) => CruciTecladoN5(e, input, datos));

                celda.appendChild(input);
            } else {
                celda.className = "cruci-celda-bloque";
            }
            grid.appendChild(celda);
        }
    }

    listaHoriz.innerHTML = "";
    listaVert.innerHTML = "";
    datos.palabras.forEach(pal => {
        const li = document.createElement("li");
        li.id = `cruci-pista-n5-${pal.id}`;
        li.innerHTML = `<strong>${pal.id}.</strong> ${pal.pista}`;
        if (pal.dir === "horizontal") listaHoriz.appendChild(li);
        else listaVert.appendChild(li);
    });
}

function CruciAlEscribirN5(evento, input, datos) {
    if (minijuegoTerminadoN5) return;
    const val = input.value.trim().toUpperCase();
    input.value = val;

    if (val !== "") {
        CruciVerificarPalabrasN5(datos);
        CruciAvanzarSiguienteN5(input, datos);
    }
}

function CruciTecladoN5(evento, input, datos) {
    if (evento.key === "Backspace" && input.value === "") {
        CruciRetrocederAnteriorN5(input, datos);
    }
}

function CruciAvanzarSiguienteN5(input, datos) {
    const ids = input.dataset.palabras.split(",").map(Number);
    const pal = datos.palabras.find(p => p.id === ids[0]);
    if (!pal) return;
    const df = pal.dir === "horizontal" ? 0 : 1;
    const dc = pal.dir === "horizontal" ? 1 : 0;
    const r = parseInt(input.dataset.r, 10) + df;
    const c = parseInt(input.dataset.c, 10) + dc;
    const nextInput = document.querySelector(`.cruci-input[data-r="${r}"][data-c="${c}"]`);
    if (nextInput) nextInput.focus();
}

function CruciRetrocederAnteriorN5(input, datos) {
    const ids = input.dataset.palabras.split(",").map(Number);
    const pal = datos.palabras.find(p => p.id === ids[0]);
    if (!pal) return;
    const df = pal.dir === "horizontal" ? 0 : 1;
    const dc = pal.dir === "horizontal" ? 1 : 0;
    const r = parseInt(input.dataset.r, 10) - df;
    const c = parseInt(input.dataset.c, 10) - dc;
    const prevInput = document.querySelector(`.cruci-input[data-r="${r}"][data-c="${c}"]`);
    if (prevInput) prevInput.focus();
}

function CruciVerificarPalabrasN5(datos) {
    datos.palabras.forEach(pal => {
        if (cruciPalabrasCompletadasN5.includes(pal.id)) return;

        const df = pal.dir === "horizontal" ? 0 : 1;
        const dc = pal.dir === "horizontal" ? 1 : 0;
        let correcta = true;
        const inputsPalabra = [];

        for (let i = 0; i < pal.palabra.length; i++) {
            const r = pal.fila + df * i;
            const c = pal.col + dc * i;
            const inp = document.querySelector(`.cruci-input[data-r="${r}"][data-c="${c}"]`);
            inputsPalabra.push(inp);

            if (!inp || inp.value !== pal.palabra[i]) correcta = false;
        }

        if (correcta) {
            cruciPalabrasCompletadasN5.push(pal.id);
            inputsPalabra.forEach(inp => inp.classList.add("cruci-palabra-ok"));
            const pistaEl = document.getElementById(`cruci-pista-n5-${pal.id}`);
            if (pistaEl) pistaEl.classList.add("found");
        }
    });

    if (cruciPalabrasCompletadasN5.length === datos.palabras.length) {
        MinijuegoDetenerRelojN5();
        if (!minijuegoTerminadoN5) {
            minijuegoTerminadoN5 = true;
            setTimeout(MinijuegoGanado, 600);
        }
    }
}

/* =========================================================
 *  RELOJ Y GESTIÓN DE TIEMPO
 * ========================================================= */
function MinijuegoIniciarRelojN5(minutos) {
    MinijuegoDetenerRelojN5();
    minijuegoTiempoRestanteN5 = minutos * 60;
    MinijuegoPintarTiempoN5();

    minijuegoRelojN5 = setInterval(() => {
        minijuegoTiempoRestanteN5--;
        MinijuegoPintarTiempoN5();
        if (minijuegoTiempoRestanteN5 <= 0) {
            MinijuegoDetenerRelojN5();
            if (!minijuegoTerminadoN5) {
                minijuegoTerminadoN5 = true;
                MinijuegoPerdido();
            }
        }
    }, 1000);
}

function MinijuegoDetenerRelojN5() {
    if (minijuegoRelojN5) {
        clearInterval(minijuegoRelojN5);
        minijuegoRelojN5 = null;
    }
}

function MinijuegoPintarTiempoN5() {
    const t = Math.max(0, minijuegoTiempoRestanteN5);
    const min = Math.floor(t / 60);
    const seg = String(t % 60).padStart(2, "0");
    const elem = document.getElementById("sopaTiempo");
    if (elem) elem.textContent = `Tiempo restante: ${min}:${seg}`;
}
