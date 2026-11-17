
var minutosProblema = 45;
var minutosPenalizacion = 5;
var tiempoRestante = 0;      // en segundos
var reloj = null;            // aquí se guarda el setInterval para poder detenerlo
var textoTiempo;

/* ---------- Vidas y revivir ---------- */
var mediasVidas = 6;         // 3 corazones = 6 medias vidas
var revivirUsado = false;    // interruptor: solo se puede revivir una vez por nivel

var bancoNivel4 = [
    {
        id: "p0n4", tipo: "exponencial",
        enunciado: "Se encuentra que el tiempo para atender una llamada de queja en una empresa de internet sigue una distribución exponencial con una media de 8 minutos. Si 10 clientes llamaron para presentar una queja, calcula los tiempos de atención de cada uno y responde las preguntas.",
        numeros: [0.03991, 0.94813, 0.90561, 0.01119, 0.15191, 0.45197, 0.87481, 0.010274, 0.32643, 0.21704],
        campos: [
            { campo: "t1", etiqueta: "T1" },
            { campo: "t2", etiqueta: "T2" },
            { campo: "t3", etiqueta: "T3" },
            { campo: "t4", etiqueta: "T4" },
            { campo: "t5", etiqueta: "T5" },
            { campo: "t6", etiqueta: "T6" },
            { campo: "t7", etiqueta: "T7" },
            { campo: "t8", etiqueta: "T8" },
            { campo: "t9", etiqueta: "T9" },
            { campo: "t10", etiqueta: "T10" },
            { campo: "pregunta1", etiqueta: "¿Cuál fue el menor tiempo de servicio?" },
            { campo: "pregunta2", etiqueta: "¿Cuál fue el mayor tiempo de servicio?" },
            { campo: "pregunta3", etiqueta: "¿Cuál fue el tiempo promedio de servicio?" }
        ],
        respuestas: {
            t1: "0.402641045", t2: "0.006657956916", t3: "0.012393316", t4: "0.561591844", t5: "0.235558379",
            t6: "0.099267434", t7: "0.016718569", t8: "0.572267355", t9: "0.139942468", t10: "0.19095920",
            pregunta1: "0.006657956916", pregunta2: "0.572267355", pregunta3: "0.223799756"
        }
    },

    {
        id: "p1n4", tipo: "exponencial",
        enunciado: "Los tiempos de servicio de los clientes de un cajero automático siguen una distribución exponencial con λ = 4. Con los números rectangulares dados, obtén el tiempo de servicio de cada cliente.",
        numeros: [0.25, 0.60, 0.85],
        campos: [
            { campo: "t1", etiqueta: "T1" },
            { campo: "t2", etiqueta: "T2" },
            { campo: "t3", etiqueta: "T3" },
            { campo: "pregunta1", etiqueta: "¿Cuál fue el menor tiempo de servicio?" },
            { campo: "pregunta2", etiqueta: "¿Cuál fue el mayor tiempo de servicio?" },
            { campo: "pregunta3", etiqueta: "¿Cuál fue el tiempo promedio de servicio?" }
        ],
        respuestas: {
            t1: "0.346574", t2: "0.127706", t3: "0.04063", pregunta1: "0.04063", pregunta2: "0.346574", pregunta3: "0.171637"
        },
    },

    {
        id: "p2n4", tipo: "exponencial",
        enunciado: "Los tiempos de llegada de pedidos siguen una distribución exponencial con λ = 8. Con los números rectangulares dados, obtén el tiempo de llegada de cada pedido.",
        numeros: [0.18, 0.40, 0.62, 0.77, 0.93], tolerancia: 0.001,
        campos: [
            { campo: "t1", etiqueta: "T1" },
            { campo: "t2", etiqueta: "T2" },
            { campo: "t3", etiqueta: "T3" },
            { campo: "t4", etiqueta: "T4" },
            { campo: "t5", etiqueta: "T5" },
            { campo: "pregunta2", etiqueta: "¿Cuál fue el tiempo total de llegada?" },
            { campo: "pregunta3", etiqueta: "¿Cuál fue el tiempo promedio?" }
        ],
        respuestas: {
            t1: "0.21435", t2: "0.114536", t3: "0.059754", t4: "0.032671", t5: "0.009071", pregunta2: "0.430382", pregunta3: "0.086076"
        },
    },

    {
        id: "p3n4", tipo: "uniforme",
        enunciado: "En un sistema de inventario se ha determinado que el tiempo de entrega de los pedidos sigue una distribución uniforme entre 3 y 7 días. Se desea simular el tiempo de entrega de 10 pedidos diferentes. Utilizando los siguientes números aleatorios uniformes, responde las preguntas:",
        numeros: [0.03788, 0.87539, 0.16818, 0.48460, 0.12202, 0.56736, 0.09955, 0.85783, 0.90899, 0.24122],
        campos: [
            { campo: "t1", etiqueta: "T1" },
            { campo: "t2", etiqueta: "T2" },
            { campo: "t3", etiqueta: "T3" },
            { campo: "t4", etiqueta: "T4" },
            { campo: "t5", etiqueta: "T5" },
            { campo: "t6", etiqueta: "T6" },
            { campo: "t7", etiqueta: "T7" },
            { campo: "t8", etiqueta: "T8" },
            { campo: "t9", etiqueta: "T9" },
            { campo: "t10", etiqueta: "T10" },
            { campo: "pregunta1", etiqueta: "¿Cuál fue el menor tiempo de entrega?" },
            { campo: "pregunta2", etiqueta: "¿Cuál fue el mayor tiempo de entrega?" }
        ],
        // T = a + (b − a) · r = 3 + 4r
        respuestas: {
            t1: "3.15152", t2: "6.50156", t3: "3.67272", t4: "4.9384", t5: "3.48808",
            t6: "5.26944", t7: "3.3982", t8: "6.43132", t9: "6.63596", t10: "3.96488",
            pregunta1: "3.15152", pregunta2: "6.63596"
        }
    },

    {
        id: "p4n4", tipo: "uniforme",
        enunciado: "El tiempo de transporte está uniformemente distribuido entre a = 20 y b = 50. Con los números rectangulares dados, obtén el tiempo de cada traslado.",
        numeros: [0.10, 0.25, 0.50, 0.75, 0.95],
        campos: [
            { campo: "t1", etiqueta: "T1" },
            { campo: "t2", etiqueta: "T2" },
            { campo: "t3", etiqueta: "T3" },
            { campo: "t4", etiqueta: "T4" },
            { campo: "t5", etiqueta: "T5" },],
        respuestas: { t1: 23, t2: 27.5, t3: 35, t4: 42.5, t5: 48.5 }
    },

    {
        id: "p5n4", tipo: "empirica",
        enunciado: "Se desea conocer los tiempos (en segundos) que tardan en transmitirse 10 solicitudes diferentes vía internet de un computador a otro. Estos tiempos se encuentran empíricamente distribuidos. Utiliza los números rectangulares dados para realizar los cálculos.",
        numeros: [0.27953, 0.74457, 0.60311, 0.16818, 0.90561, 0.72848, 0.54155, 0.66164, 0.38384, 0.92784],
        campos: [
            { campo: "t1", etiqueta: "T1" },
            { campo: "t2", etiqueta: "T2" },
            { campo: "t3", etiqueta: "T3" },
            { campo: "t4", etiqueta: "T4" },
            { campo: "t5", etiqueta: "T5" },
            { campo: "t6", etiqueta: "T6" },
            { campo: "t7", etiqueta: "T7" },
            { campo: "t8", etiqueta: "T8" },
            { campo: "t9", etiqueta: "T9" },
            { campo: "t10", etiqueta: "T10" }
        ],
        respuestas: {
            t1: "0.747703149", t2: "1.48914", t3: "1.20622", t4: "0.579965516", t5: "1.81122",
            t6: "1.45696", t7: "1.0831", t8: "1.32328", t9: "0.876173498", t10: "1.85568"
        }
    },

    {
        id: "p6n4", tipo: "poisson",
        enunciado: "La cantidad de clientes que llegan diariamente a una galería de arte tiene un comportamiento Poisson con λ = 3. La galería trabaja 3 de los 7 días de la semana. Completa la tabla:",
        tabla: [
            { x: "0", fx: "0.0497870684", FX: "0.0497870684" },
            { x: "1", fx: "0.1493612051", FX: "0.1991482735" },
            { x: "2", fx: "0.2240418077", FX: "0.4231900811" },
            { x: "3", fx: "0.2240418077", FX: "0.6472318888" },
            { x: "4", fx: "0.1680313557", FX: "0.8152632445" },
            { x: "5", fx: "0.1008188134", FX: "0.9160820580" },
            { x: "6", fx: "0.0504094067", FX: "0.9664914647" },
            { x: "7", fx: "0.0216040315", FX: "0.9880954961" },
            { x: "8", fx: "0.0081015118", FX: "0.9961970079" },
            { x: "9", fx: "0.0027005039", FX: "0.9988975119" },
            { x: "10", fx: "0.0008101512", FX: "0.9997076630" },
            { x: "11", fx: "0.0002209503", FX: "0.9999286134" },
            { x: "12", fx: "0.0000552376", FX: "0.9999838510" }
        ],
    },

    {
        id: "p7n4", tipo: "poisson",
        enunciado: "El número de fallas de una máquina por turno sigue una distribución Poisson con λ = 2. Construye f(x) y F(x)",
        tabla: [
            //   x    f(x)        F(x)        
            { x: 0, fx: 0.270671, FX: 0.406006, },
            { x: 1, fx: 0.135335, FX: 0.135335 },
            { x: 2, fx: 0.270671, FX: 0.676676, },
            { x: 3, fx: 0.180447, FX: 0.857123, },
            { x: 4, fx: 0.090224, FX: 0.947347, },
            { x: 5, fx: 0.036089, FX: 0.983436, },
            { x: 6, fx: 0.01203, FX: 0.995466, },
            { x: 7, fx: 0.003437, FX: 0.998903, },
            { x: 8, fx: 0.000859, FX: 0.999763, },
            { x: 9, fx: 0.000191, FX: 0.999954, }
        ],
    },

    {
        // lambda = 4
        id: "p8n4", tipo: "poisson",
        enunciado: "La cantidad de clientes que llegan diariamente a una tienda de telefonía tiene un comportamiento Poisson con λ = 4. La tienda trabaja 4 de los 7 días de la semana. Completa la tabla:",
        tabla: [
            { x: "0", fx: "0.018315638888734186", FX: "0.018315638888734186" },
            { x: "1", fx: "0.07326255555493674", FX: "0.09157819444367093" },
            { x: "2", fx: "0.14652511110987348", FX: "0.23810330555354442" },
            { x: "3", fx: "0.19536681481316465", FX: "0.43347012036670907" },
            { x: "4", fx: "0.19536681481316465", FX: "0.6288369351798737" },
            { x: "5", fx: "0.15629345185053173", FX: "0.7851303870304054" },
            { x: "6", fx: "0.10419563456702115", FX: "0.8893260215974266" },
            { x: "7", fx: "0.059540362609726366", FX: "0.948866384207153" },
            { x: "8", fx: "0.029770181304863183", FX: "0.9786365655120162" },
            { x: "9", fx: "0.013231191691050304", FX: "0.9918677572030665" },
            { x: "10", fx: "0.005292476676420121", FX: "0.9971602338794866" },
            { x: "11", fx: "0.0019245369732436807", FX: "0.9990847708527303" },
            { x: "12", fx: "0.0006415123244145602", FX: "0.9997262831771448" },
            { x: "13", fx: "0.00019738840751217236", FX: "0.999923671584657" },
            { x: "14", fx: "0.000056396687860620676", FX: "0.9999800682725176" },
            { x: "15", fx: "0.00001503911676283218", FX: "0.9999951073892804" },
        ],
    },

    {
        id: "p9n4", tipo: "empirica",
        enunciado: "El tiempo(en minutos) que tarda un técnico en reparar una falla está empíricamente distribuido. Utiliza los números rectangulares dados para simular el tiempo que tarda en 10 reparaciones.",
        numeros: [0.22289, 0.14937, 0.3309, 0.20345, 0.11635, 0.31012, 0.76733, 0.44357, 0.12005, 0.24498],
        campos: [
            { campo: "t1", etiqueta: "T1" },
            { campo: "t2", etiqueta: "T2" },
            { campo: "t3", etiqueta: "T3" },
            { campo: "t4", etiqueta: "T4" },
            { campo: "t5", etiqueta: "T5" },
            { campo: "t6", etiqueta: "T6" },
            { campo: "t7", etiqueta: "T7" },
            { campo: "t8", etiqueta: "T8" },
            { campo: "t9", etiqueta: "T9" },
            { campo: "t10", etiqueta: "T10" }
        ],
        respuestas: {
            t1: "0.6676675819597654", t2: "0.5465711298632594", t3: "0.8135109095765096",
            t4: "0.6378871373526824", t5: "0.48238988380769343", t6: "0.7875531728080334",
            t7: "1.53466", t8: "0.9418810965297053", t9: "0.49", t10: "0.6999714279883144",
        }
    }

];

var problemasPartida = [];   // los que tocan en esta partida
var problemaActual = 0;      // cuál va (0, 1, 2, 3)

function Revolver(lista) {   // Fisher-Yates: todos los órdenes con la misma probabilidad
    var copia = lista.slice();                    // copia para no dañar el banco
    for (var i = copia.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = copia[i];
        copia[i] = copia[j];
        copia[j] = temp;
    }
    return copia;
}

function ElegirProblemas() {
    var resueltos = JSON.parse(sessionStorage.getItem("resueltosNivel4") || "[]");
    var noResueltos = bancoNivel4.filter(function (p) { return !resueltos.includes(p.id); });
    var yaResueltos = bancoNivel4.filter(function (p) { return resueltos.includes(p.id); });

    // 1 de cada tipo...
    var exponencial = noResueltos.filter(function (p) { return p.tipo === "exponencial"; });
    var empirica = noResueltos.filter(function (p) { return p.tipo === "empirica"; });
    var uniforme = noResueltos.filter(function (p) { return p.tipo === "uniforme"; });
    var poisson = noResueltos.filter(function (p) { return p.tipo === "poisson"; });
    var elegidos = Revolver(exponencial).slice(0, 1)
        .concat(Revolver(empirica).slice(0, 1))
        .concat(Revolver(uniforme).slice(0, 1))
        .concat(Revolver(poisson).slice(0, 1));

    // ...y el resto se completa al azar
    var sobrantes = Revolver(noResueltos).filter(function (p) { return !elegidos.includes(p); });
    elegidos = elegidos.concat(sobrantes).slice(0, problemasPorNivel);

    if (elegidos.length < problemasPorNivel) {
        elegidos = elegidos.concat(Revolver(yaResueltos)).slice(0, problemasPorNivel);
    }

    problemasPartida = Revolver(elegidos);        // mezcla el orden
}

var nombresPrueba = {
    exponencial: "distribución exponencial",
    uniforme: "distribución uniforme",
    empirica: "distribución empírica",
    poisson: "distribución de Poisson"
};

function CuadriculaDeNumeros(numeros, porFila) {
    var html = "<table class='tabla-numeros'>";
    for (var i = 0; i < numeros.length; i += porFila) {        // salta de 5 en 5
        var fila = numeros.slice(i, i + porFila);              // toma 5 números
        html += "<tr><td>" + fila.join("</td><td>") + "</td></tr>";
    }
    return html + "</table>";
}

function MostrarProblema() {
    parado = true;
    gato.classList.remove("gato-corriendo");
    var p = problemasPartida[problemaActual];
    document.getElementById("textoProblema").innerText = p.enunciado || "";

    tituloProblema.innerText = "Aplica la " + nombresPrueba[p.tipo];
    // si el problema no trae números, no se dibuja la cuadrícula (y no truena)
    document.getElementById("p-numeros").innerHTML = p.numeros ? CuadriculaDeNumeros(p.numeros, 5) : "";
    textoProblema.innerText = p.enunciado || "";

    CrearCampos(p);
    PintarVidas();
    pantallaProblema.style.display = "block";
    IniciarReloj();
}


var columnasPorTipo = {
    poisson: [
        { campo: "x", titulo: "x", dado: true },   // se muestra como texto
        { campo: "fx", titulo: "f(x)" },            // casilla para el jugador
        { campo: "FX", titulo: "F(x)" }
    ]
    // exponencial, uniforme y empírica no llevan tabla
};

var tablaFija = {
    poisson: true      // las 13 filas ya vienen definidas: el jugador no agrega filas
};

var filasTabla = 0;     // cuántas filas lleva el jugador

function CrearTabla(p) {
    var columnas = columnasPorTipo[p.tipo];
    var tabla = document.createElement("table");
    tabla.className = "p-tabla";
    tabla.id = "tablaProblema";

    var encabezado = tabla.insertRow();
    if (!tablaFija[p.tipo]) encabezado.innerHTML = "<th>i</th>";     // "i" solo si NO es fija
    columnas.forEach(function (col) {
        encabezado.innerHTML += "<th>" + col.titulo + "</th>";
    });

    // primero se pone en la página, DESPUÉS se agregan filas
    document.getElementById("zona-respuestas").appendChild(tabla);
    filasTabla = 0;

    if (tablaFija[p.tipo]) {
        p.tabla.forEach(function () { InsertarFila(); });    // una fila por cada renglón del banco
    } else {
        InsertarFila();                                       // empieza con 1
    }
}

function InsertarFila() {
    var p = problemasPartida[problemaActual];
    var columnas = columnasPorTipo[p.tipo];
    var tabla = document.getElementById("tablaProblema");
    var fila = tabla.insertRow(-1);
    var i = filasTabla;

    if (!tablaFija[p.tipo]) fila.insertCell().innerText = i + 1;      // misma condición que el encabezado
    columnas.forEach(function (col) {
        if (col.dado) {                                          // columna dada: texto
            fila.insertCell().innerText = p.tabla[i][col.campo];
            return;
        }
        var input = document.createElement("input");             // columna normal: casilla
        input.dataset.fila = i;
        input.dataset.campo = col.campo;
        fila.insertCell().appendChild(input);
    });
    filasTabla++;
}

function QuitarFila() {
    var tabla = document.getElementById("tablaProblema");
    if (filasTabla > 1) {
        tabla.deleteRow(-1);
        filasTabla--;
    }
}

function CrearCampos(p) {
    var zona = document.getElementById("zona-respuestas");
    zona.innerHTML = "";

    var llevaTabla = columnasPorTipo[p.tipo] !== undefined;
    if (llevaTabla) CrearTabla(p);
    var puedeAgregarFilas = llevaTabla && !tablaFija[p.tipo];
    document.querySelector(".botones-tabla").style.display = puedeAgregarFilas ? "block" : "none";

    (p.campos || []).forEach(function (c) {          // || [] por si un problema no trae campos
        var etiqueta = document.createElement("label");
        etiqueta.className = "campo";
        etiqueta.textContent = c.etiqueta + ": ";

        var input = document.createElement("input");
        input.dataset.campo = c.campo;

        etiqueta.appendChild(input);
        zona.appendChild(etiqueta);
    });

    document.querySelector(".p-mensaje").innerText = "";
}

function ANumero(texto) {
    texto = String(texto).replace(/\s+/g, "").replace(",", ".");
    if (texto === "") return NaN;

    var partes = texto.split("+");
    var total = 0;
    for (var i = 0; i < partes.length; i++) {
        var parte = partes[i];
        if (parte === "") return NaN;
        var numero;
        if (parte.includes("/")) {
            var div = parte.split("/");
            if (div.length !== 2) return NaN;
            numero = Number(div[0]) / Number(div[1]);
        } else {
            numero = Number(parte);
        }
        if (isNaN(numero)) return NaN;
        total += numero;
    }
    return total;
}

// tolerancia: qué tan cerca debe estar (si no se indica, 0.0005)
function SonIguales(respuestaJugador, respuestaCorrecta, tolerancia) {
    var a = ANumero(respuestaJugador);
    var b = ANumero(respuestaCorrecta);
    if (isNaN(a) || isNaN(b)) return false;
    return Math.abs(a - b) < (tolerancia || 0.0005);
}

// Busca la tolerancia de un campo suelto en el banco
function ToleranciaDe(p, campo) {
    var c = (p.campos || []).find(function (c) { return c.campo === campo; });
    return c ? c.tolerancia : undefined;
}

function RevisarRespuestas() {
    var mensaje = document.querySelector(".p-mensaje");
    var inputs = document.querySelectorAll("#zona-respuestas input");
    var p = problemasPartida[problemaActual];
    var errores = 0;

    // 1) Aviso SIN castigo
    for (var k = 0; k < inputs.length; k++) {
        if (inputs[k].value.trim() === "") {
            mensaje.innerText = "Te faltan casillas por llenar.";
            return;
        }
    }

    // 2) Revisar cada casilla
    inputs.forEach(function (input) {
        var campo = input.dataset.campo;
        var correcta, tolerancia;

        if (input.dataset.fila !== undefined) {               // casilla de la tabla
            var fila = Number(input.dataset.fila);
            correcta = p.tabla[fila] ? p.tabla[fila][campo] : undefined;
        } else {                                               // casilla suelta
            correcta = p.respuestas[campo];
            tolerancia = ToleranciaDe(p, campo);
        }

        if (correcta !== undefined && SonIguales(input.value, correcta, tolerancia)) {
            input.classList.add("ok");
            input.classList.remove("mal");
            input.readOnly = true;
        } else {
            input.classList.add("mal");
            input.classList.remove("ok");
            errores++;
        }
    });

    // 3) Filas que faltan = UN error
    var faltanFilas = p.tabla && filasTabla < p.tabla.length;
    if (faltanFilas) errores++;

    // 4) Resultado
    if (errores > 0) {
        var texto = "Te equivocaste";
        if (faltanFilas) texto += " (te faltan filas)";
        mensaje.innerText = texto + ". Has perdido media vida y 5 minutos.";
        PerderMediaVida();
        if (mediasVidas > 0) Penalizar();
    } else {
        mensaje.innerText = "";
        ContinuarCarrera();
    }
}


function PintarVidas() {
    var contenedorVidas = document.getElementById("p-vidas");
    contenedorVidas.innerHTML = "";

    for (var i = 0; i < 3; i++) {
        var resto = mediasVidas - i * 2;
        var img = document.createElement("img");

        if (resto >= 2) {
            img.src = "img/corazon.png";
            img.alt = "Corazón completo";
            img.classList.add("img-corazon");
        } else if (resto === 1) {
            img.src = "img/corazonRoto.png";
            img.alt = "Medio corazón";
            img.classList.add("img-corazonRoto");
        } else {
            continue;
        }
        contenedorVidas.appendChild(img);
    }
}

function PerderMediaVida() {
    mediasVidas--;
    PintarVidas();
    if (mediasVidas <= 0) {
        SinVidas();
    }
}

function SinVidas() {
    DetenerReloj();
    pantallaProblema.style.display = "none";
    document.querySelector(".pantalla-revivir").style.display = "block";
    if (revivirUsado) {
        document.querySelector(".revivir-texto").innerText = "Ya usaste tu oportunidad de revivir.";
        document.querySelector(".btn-revivir").style.display = "none";
    }
}

function AbrirMinijuego() {
    revivirUsado = true;
    document.querySelector(".pantalla-revivir").style.display = "none";
    document.querySelector(".minijuego").style.display = "block";
    IniciarMinijuegoNivel4(indiceForzado);
}

function MinijuegoGanado() {
    document.querySelector(".minijuego").style.display = "none";
    mediasVidas = 6;
    PintarVidas();
    document.querySelector(".p-mensaje").innerText = "¡Has revivido! Termina el problema.";
    if (tiempoRestante < 600) tiempoRestante = 600;   // si se le acabó el tiempo, recibe 10 minutos
    pantallaProblema.style.display = "block";
    ReanudarReloj();
}

function MinijuegoPerdido() {
    IrAlMenu();
}

function IrAlMenu() {
    window.location.href = "niveles.html";
}


var imagenesFormulas = [          // se usan en la intro Y en el botón "Fórmulas"
    "img/nivel4/formula1.png",
    "img/nivel4/formula2.png"
];
var formulaActual = 0;

function AbrirFormulas() {
    formulaActual = 0;
    MostrarFormulas();
    document.querySelector(".ventana-formulas").style.display = "flex";
    document.activeElement.blur();
}

function CerrarFormulas() {
    document.querySelector(".ventana-formulas").style.display = "none";
}

function CambiarFormula(direccion) {
    formulaActual += direccion;
    if (formulaActual < 0) formulaActual = imagenesFormulas.length - 1;
    if (formulaActual >= imagenesFormulas.length) formulaActual = 0;
    MostrarFormulas();
}

function MostrarFormulas() {
    document.querySelector(".formulas-img").src = imagenesFormulas[formulaActual];
    document.querySelector(".formulas-contador").innerText = (formulaActual + 1) + " / " + imagenesFormulas.length;
}
