/**AQUI ESTA TIEMPO PROBLEMA */
/**AQUI ESTA TIEMPO PROBLEMA *//* ---------- Tiempo ---------- */
var minutosProblema = 45; /**AQUI ESTA TIEMPO PROBLEMA */
var minutosPenalizacion = 5;
var tiempoRestante = 0;      // en segundos
var reloj = null;            // aquí se guarda el setInterval para poder detenerlo
var textoTiempo;

/* ---------- Vidas y revivir ---------- */
var mediasVidas = 6;         // 3 corazones = 6 medias vidas
var revivirUsado = false;    // interruptor: solo se puede revivir una vez por nivel

/***BANCO DE PROBLEMAS PONER ID A CADA PROBLEMA ESTO HACE Q NO SE REPITA**/
var bancoNivel1 = [
    {
        id: "p0n1", tipo: "mixto", a: 5, x0: 7, c: 24, m: 32, n: 9,
        conclusion: "Los números rectangulares se rechazan",
        respuestas: [
            //   Xn    a·Xn+c   mod    rectangular
            { xn: 7, producto: '1 + 27/32', siguiente: 27, r: '27/32' },
            { xn: 27, producto: '4 + 31/32', siguiente: 31, r: '31/32' },
            { xn: 31, producto: '5 + 19/32', siguiente: 19, r: '19/32' },
            { xn: 19, producto: '3 + 23/32', siguiente: 23, r: '23/32' },
            { xn: 23, producto: '4 + 11/32', siguiente: 11, r: '11/32' },
            { xn: 11, producto: '2 + 15/32', siguiente: 15, r: '15/32' },
            { xn: 15, producto: '3 + 3/32', siguiente: 3, r: '3/32' },
            { xn: 3, producto: '1 + 7/32', siguiente: 7, r: '7/32' },
            { xn: 7, producto: '1 + 27/32', siguiente: 27, r: '27/32' }
        ]
    },

    {
        id: "p1n1", tipo: "mixto", a: 5, x0: 7, c: 3, m: 16, n: 17,
        conclusion: "Los números rectangulares son aceptados",
        respuestas: [
            { xn: 7, producto: '2 + 6/16', siguiente: 6, r: '6/16' },
            { xn: 6, producto: '2 + 1/16', siguiente: 1, r: '1/16' },
            { xn: 1, producto: '8/16', siguiente: 8, r: '8/16' },
            { xn: 8, producto: '2 + 11/16', siguiente: 11, r: '11/16' },
            { xn: 11, producto: '3 + 10/16', siguiente: 10, r: '10/16' },
            { xn: 10, producto: '3 + 5/16', siguiente: 5, r: '5/16' },
            { xn: 5, producto: '1 + 12/16', siguiente: 12, r: '12/16' },
            { xn: 12, producto: '3 + 15/16', siguiente: 15, r: '15/16' },
            { xn: 15, producto: '4 + 14/16', siguiente: 14, r: '14/16' },
            { xn: 14, producto: '4 + 9/16', siguiente: 9, r: '9/16' },
            { xn: 9, producto: '3', siguiente: 0, r: '0' },
            { xn: 0, producto: '3/16', siguiente: 3, r: '3/16' },
            { xn: 3, producto: '1 + 2/16', siguiente: 2, r: '2/16' },
            { xn: 2, producto: '13/16', siguiente: 13, r: '13/16' },
            { xn: 13, producto: '4 + 4/16', siguiente: 4, r: '4/16' },
            { xn: 4, producto: '1 + 7/16', siguiente: 7, r: '7/16' },
        ]
    },

    {
        id: "p2n1", tipo: "mixto", a: 3, x0: 8, c: 2, m: 17, n: 17,
        conclusion: "Los números rectangulares se rechazan",
        respuestas: [
            { xn: 8, producto: '1 + 9/17', siguiente: 9, r: '9/17' },
            { xn: 9, producto: '1 + 12/17', siguiente: 12, r: '12/17' },
            { xn: 12, producto: '2 + 4/17', siguiente: 4, r: '4/17' },
            { xn: 4, producto: '14/17', siguiente: 14, r: '14/17' },
            { xn: 14, producto: '2 + 10/17', siguiente: 10, r: '10/17' },
            { xn: 10, producto: '1 + 15/17', siguiente: 15, r: '15/17' },
            { xn: 15, producto: '2 + 13/17', siguiente: 13, r: '13/17' },
            { xn: 13, producto: '2 + 7/17', siguiente: 7, r: '7/17' },
            { xn: 7, producto: '1 + 6/17', siguiente: 6, r: '6/17' },
            { xn: 6, producto: '1 + 3/17', siguiente: 3, r: '3/17' },
            { xn: 3, producto: '11/17', siguiente: 11, r: '11/17' },
            { xn: 11, producto: '2 + 1/17', siguiente: 1, r: '1/17' },
            { xn: 1, producto: '5/17', siguiente: 5, r: '5/17' },
            { xn: 5, producto: '1', siguiente: 0, r: '0' },
            { xn: 0, producto: '2/17', siguiente: 2, r: '2/17' },
            { xn: 2, producto: '8/17', siguiente: 8, r: '8/17' },
            { xn: 8, producto: '1 + 9/17', siguiente: 9, r: '9/17' }        // repetición
        ]
    },

    {
        id: "p3n1", tipo: "mixto", a: 9, x0: 11, c: 5, m: 32, n: 33,
        conclusion: "Los números rectangulares son aceptados",
        respuestas: [
            { xn: 11, producto: '3 + 8/32', siguiente: 8, r: '8/32' },
            { xn: 8, producto: '2 + 13/32', siguiente: 13, r: '13/32' },
            { xn: 13, producto: '3 + 26/32', siguiente: 26, r: '26/32' },
            { xn: 26, producto: '7 + 15/32', siguiente: 15, r: '15/32' },
            { xn: 15, producto: '4 + 12/32', siguiente: 12, r: '12/32' },
            { xn: 12, producto: '3 + 17/32', siguiente: 17, r: '17/32' },
            { xn: 17, producto: '4 + 30/32', siguiente: 30, r: '30/32' },
            { xn: 30, producto: '8 + 19/32', siguiente: 19, r: '19/32' },
            { xn: 19, producto: '5 + 16/32', siguiente: 16, r: '16/32' },
            { xn: 16, producto: '4 + 21/32', siguiente: 21, r: '21/32' },
            { xn: 21, producto: '6 + 2/32', siguiente: 2, r: '2/32' },
            { xn: 2, producto: '23/32', siguiente: 23, r: '23/32' },
            { xn: 23, producto: '6 + 20/32', siguiente: 20, r: '20/32' },
            { xn: 20, producto: '5 + 25/32', siguiente: 25, r: '25/32' },
            { xn: 25, producto: '7 + 6/32', siguiente: 6, r: '6/32' },
            { xn: 6, producto: '1 + 27/32', siguiente: 27, r: '27/32' },
            { xn: 27, producto: '7 + 24/32', siguiente: 24, r: '24/32' },
            { xn: 24, producto: '6 + 29/32', siguiente: 29, r: '29/32' },
            { xn: 29, producto: '8 + 10/32', siguiente: 10, r: '10/32' },
            { xn: 10, producto: '2 + 31/32', siguiente: 31, r: '31/32' },
            { xn: 31, producto: '8 + 28/32', siguiente: 28, r: '28/32' },
            { xn: 28, producto: '8 + 1/32', siguiente: 1, r: '1/32' },
            { xn: 1, producto: '14/32', siguiente: 14, r: '14/32' },
            { xn: 14, producto: '4 + 3/32', siguiente: 3, r: '3/32' },
            { xn: 3, producto: '1', siguiente: 0, r: '0' },
            { xn: 0, producto: '5/32', siguiente: 5, r: '5/32' },
            { xn: 5, producto: '1 + 18/32', siguiente: 18, r: '18/32' },
            { xn: 18, producto: '5 + 7/32', siguiente: 7, r: '7/32' },
            { xn: 7, producto: '2 + 4/32', siguiente: 4, r: '4/32' },
            { xn: 4, producto: '1 + 9/32', siguiente: 9, r: '9/32' },
            { xn: 9, producto: '2 + 22/32', siguiente: 22, r: '22/32' },
            { xn: 22, producto: '6 + 11/32', siguiente: 11, r: '11/32' },
        ]
    },

    {
        id: "p4n1", tipo: "multiplicativo", a: 13, x0: 9, m: 64,
        conclusion: "Los números rectangulares son aceptados",
        respuestas: [
            { xn: 9, producto: '1 + 53/64', siguiente: 53, r: '53/64' },
            { xn: 53, producto: '10 + 49/64', siguiente: 49, r: '49/64' },
            { xn: 49, producto: '9 + 61/64', siguiente: 61, r: '61/64' },
            { xn: 61, producto: '12 + 25/64', siguiente: 25, r: '25/64' },
            { xn: 25, producto: '5 + 5/64', siguiente: 5, r: '5/64' },
            { xn: 5, producto: '1 + 1/64', siguiente: 1, r: '1/64' },
            { xn: 1, producto: '13/64', siguiente: 13, r: '13/64' },
            { xn: 13, producto: '2 + 41/64', siguiente: 41, r: '41/64' },
            { xn: 41, producto: '8 + 21/64', siguiente: 21, r: '21/64' },
            { xn: 21, producto: '4 + 17/64', siguiente: 17, r: '17/64' },
            { xn: 17, producto: '3 + 29/64', siguiente: 29, r: '29/64' },
            { xn: 29, producto: '5 + 57/64', siguiente: 57, r: '57/64' },
            { xn: 57, producto: '11 + 37/64', siguiente: 37, r: '37/64' },
            { xn: 37, producto: '7 + 33/64', siguiente: 33, r: '33/64' },
            { xn: 33, producto: '6 + 45/64', siguiente: 45, r: '45/64' },
            { xn: 45, producto: '9 + 9/64', siguiente: 9, r: '9/64' },
        ]
    },

    {
        id: "p5n1", tipo: "multiplicativo", a: 11, x0: 15, m: 128,
        conclusion: "Los números rectangulares son aceptados",
        respuestas: [
            { xn: 15, producto: '1 + 37/128', siguiente: 37, r: '37/128' },
            { xn: 37, producto: '3 + 23/128', siguiente: 23, r: '23/128' },
            { xn: 23, producto: '1 + 125/128', siguiente: 125, r: '125/128' },
            { xn: 125, producto: '10 + 95/128', siguiente: 95, r: '95/128' },
            { xn: 95, producto: '8 + 21/128', siguiente: 21, r: '21/128' },
            { xn: 21, producto: '1 + 103/128', siguiente: 103, r: '103/128' },
            { xn: 103, producto: '8 + 109/128', siguiente: 109, r: '109/128' },
            { xn: 109, producto: '9 + 47/128', siguiente: 47, r: '47/128' },
            { xn: 47, producto: '4 + 5/128', siguiente: 5, r: '5/128' },
            { xn: 5, producto: '55/128', siguiente: 55, r: '55/128' },
            { xn: 55, producto: '4 + 93/128', siguiente: 93, r: '93/128' },
            { xn: 93, producto: '7 + 127/128', siguiente: 127, r: '127/128' },
            { xn: 127, producto: '10 + 117/128', siguiente: 117, r: '117/128' },
            { xn: 117, producto: '10 + 7/128', siguiente: 7, r: '7/128' },
            { xn: 7, producto: '77/128', siguiente: 77, r: '77/128' },
            { xn: 77, producto: '6 + 79/128', siguiente: 79, r: '79/128' },
            { xn: 79, producto: '6 + 101/128', siguiente: 101, r: '101/128' },
            { xn: 101, producto: '8 + 87/128', siguiente: 87, r: '87/128' },
            { xn: 87, producto: '7 + 61/128', siguiente: 61, r: '61/128' },
            { xn: 61, producto: '5 + 31/128', siguiente: 31, r: '31/128' },
            { xn: 31, producto: '2 + 85/128', siguiente: 85, r: '85/128' },
            { xn: 85, producto: '7 + 39/128', siguiente: 39, r: '39/128' },
            { xn: 39, producto: '3 + 45/128', siguiente: 45, r: '45/128' },
            { xn: 45, producto: '3 + 111/128', siguiente: 111, r: '111/128' },
            { xn: 111, producto: '9 + 69/128', siguiente: 69, r: '69/128' },
            { xn: 69, producto: '5 + 119/128', siguiente: 119, r: '119/128' },
            { xn: 119, producto: '10 + 29/128', siguiente: 29, r: '29/128' },
            { xn: 29, producto: '2 + 63/128', siguiente: 63, r: '63/128' },
            { xn: 63, producto: '5 + 53/128', siguiente: 53, r: '53/128' },
            { xn: 53, producto: '4 + 71/128', siguiente: 71, r: '71/128' },
            { xn: 71, producto: '6 + 13/128', siguiente: 13, r: '13/128' },
            { xn: 13, producto: '1 + 15/128', siguiente: 15, r: '15/128' },
        ]
    },

    {
        id: "p6n1", tipo: "multiplicativo", a: 7, x0: 5, m: 32,
        conclusion: "Los números rectangulares se rechazan",
        respuestas: [
            { xn: 5, producto: '1 + 3/32', siguiente: 3, r: '3/32' },
            { xn: 3, producto: '21/32', siguiente: 21, r: '21/32' },
            { xn: 21, producto: '4 + 19/32', siguiente: 19, r: '19/32' },
            { xn: 19, producto: '4 + 5/32', siguiente: 5, r: '5/32' },
            { xn: 5, producto: '1 + 3/32', siguiente: 3, r: '3/32' },
        ]
    },

    {
        id: "p7n1", tipo: "multiplicativo", a: 9, x0: 15, m: 64,
        conclusion: "Los números rectangulares se rechazan",
        respuestas: [
            { xn: 15, producto: '2 + 7/64', siguiente: 7, r: '7/64' },
            { xn: 7, producto: '63/64', siguiente: 63, r: '63/64' },
            { xn: 63, producto: '8 + 55/64', siguiente: 55, r: '55/64' },
            { xn: 55, producto: '7 + 47/64', siguiente: 47, r: '47/64' },
            { xn: 47, producto: '6 + 39/64', siguiente: 39, r: '39/64' },
            { xn: 39, producto: '5 + 31/64', siguiente: 31, r: '31/64' },
            { xn: 31, producto: '4 + 23/64', siguiente: 23, r: '23/64' },
            { xn: 23, producto: '3 + 15/64', siguiente: 15, r: '15/64' },
        ]
    },

    {
        id: "p8n1", tipo: "mixto", a: 3, x0: 10, c: 34, m: 52, n: 6,
        conclusion: "Los números rectangulares se rechazan",
        respuestas: [
            { xn: 10, producto: '1 + 12/52', siguiente: 12, r: '12/52' },
            { xn: 12, producto: '1 + 18/52', siguiente: 18, r: '18/52' },
            { xn: 18, producto: '1 + 36/52', siguiente: 36, r: '36/52' },
            { xn: 36, producto: '2 + 38/52', siguiente: 38, r: '38/52' },
            { xn: 38, producto: '2 + 44/52', siguiente: 44, r: '44/52' },
            { xn: 44, producto: '3 + 10/52', siguiente: 10, r: '10/52' },
        ]
    },

    {
        id: "p9n1", tipo: "multiplicativo", a: 67, x0: 20, m: 39,
        conclusion: "Los números rectangulares se rechazan",
        respuestas: [
            { xn: 20, producto: '34 + 14/39', siguiente: 14, r: '14/39' },
            { xn: 14, producto: '24 + 2/39', siguiente: 2, r: '2/39' },
            { xn: 2, producto: '3 + 17/39', siguiente: 17, r: '17/39' },
            { xn: 17, producto: '29 + 8/39', siguiente: 8, r: '8/39' },
            { xn: 8, producto: '13 + 29/39', siguiente: 29, r: '29/39' },
            { xn: 29, producto: '49 + 32/39', siguiente: 32, r: '32/39' },
            { xn: 32, producto: '54 + 38/39', siguiente: 38, r: '38/39' },
            { xn: 38, producto: '65 + 11/39', siguiente: 11, r: '11/39' },
            { xn: 11, producto: '18 + 35/39', siguiente: 35, r: '35/39' },
            { xn: 35, producto: '60 + 5/39', siguiente: 5, r: '5/39' },
            { xn: 5, producto: '8 + 23/39', siguiente: 23, r: '23/39' },
            { xn: 23, producto: '39 + 20/39', siguiente: 20, r: '20/39' },
        ]
    },
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
    var resueltos = JSON.parse(sessionStorage.getItem("resueltosNivel1") || "[]");
    var noResueltos = bancoNivel1.filter(function (p) { return !resueltos.includes(p.id); });
    var yaResueltos = bancoNivel1.filter(function (p) { return resueltos.includes(p.id); });

    var mixtos = noResueltos.filter(function (p) { return p.tipo === "mixto"; });
    var multiplicativos = noResueltos.filter(function (p) { return p.tipo === "multiplicativo"; });
    var elegidos = Revolver(mixtos).slice(0, 2)
        .concat(Revolver(multiplicativos).slice(0, 2));

    var sobrantes = Revolver(noResueltos).filter(function (p) { return !elegidos.includes(p); });
    elegidos = elegidos.concat(sobrantes).slice(0, problemasPorNivel);

    if (elegidos.length < problemasPorNivel) {
        elegidos = elegidos.concat(Revolver(yaResueltos)).slice(0, problemasPorNivel);
    }

    problemasPartida = Revolver(elegidos);        // mezcla el orden
}

/**Mostrar proble*¨*/
function MostrarProblema() {
    parado = true;
    gato.classList.remove("gato-corriendo");
    var p = problemasPartida[problemaActual];   // p = el problema actual (sus datos: p.a, p.m...)

    var titulo;
    if (p.tipo === "mixto") {
        titulo = `Xn+1 = (${p.a}Xn + ${p.c}) mod ${p.m}, X0 = ${p.x0}`;
    } else {
        titulo = `Xn+1 = (${p.a}Xn) mod ${p.m}, X0 = ${p.x0}`;
    }
    tituloProblema.innerText = titulo;

    CrearTabla(p);
    PintarVidas();
    pantallaProblema.style.display = "block";
    IniciarReloj();
}

/***formato tabla no util para los demas problemas hay q cambiarlo por una entrada d tecto */
var solucion = [];      // respuestas correctas del problema actual
var filasTabla = 0;     // cuántas filas lleva el jugador

function CrearTabla(p) {
    solucion = p.respuestas;      // solo LEE el banco, nunca lo modifica

    var encabezado = document.getElementById("encabezado");
    if (p.tipo === "mixto") {
        encabezado.innerHTML =
            "<th>n</th><th>Xn</th><th>a·Xn + c</th><th>Xn+1</th><th>Número rectangular</th>";
    } else if (p.tipo === "multiplicativo") {
        encabezado.innerHTML =
            "<th>n</th><th>Xn</th><th>a·Xn</th><th>Xn+1 = (a·Xn) mod m</th><th>Número rectangular</th>";
    }

    var tabla = document.getElementById("tablaMix");
    while (tabla.rows.length > 1) tabla.deleteRow(-1);   // borra filas viejas (no el encabezado)
    filasTabla = 0;
    InsertarFila();

    // limpiar lo del problema anterior
    document.getElementById("p-conclusion").value = "";
    document.getElementById("p-conclusion").classList.remove("ok", "mal");
    document.querySelector(".p-mensaje").innerText = "";
}

function InsertarFila() {
    var tabla = document.getElementById("tablaMix");
    var fila = tabla.insertRow(-1);          // -1 = al final
    var i = filasTabla;                      // número de esta fila (0, 1, 2...)
    fila.insertCell(0).innerText = i;        // columna n (solo texto)
    var campos = ["xn", "producto", "siguiente", "r"];
    for (var k = 0; k < campos.length; k++) {
        var input = document.createElement("input");
        input.dataset.fila = i;
        input.dataset.campo = campos[k];
        if (campos[k] === "r") input.placeholder = "Ejemplo: 1/2";
        fila.insertCell(k + 1).appendChild(input);
    }
    filasTabla++;
}

function QuitarFila() {
    var tabla = document.getElementById("tablaMix");
    if (filasTabla > 1) {                    // que siempre quede al menos 1
        tabla.deleteRow(-1);
        filasTabla--;
    }
}

/** =========================================================
 *  REVISAR RESPUESTAS
 *  ========================================================= */
// Convierte "1 + 27/32", "27/32", "0.84375" o 27 en un número
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

function SonIguales(respuestaJugador, respuestaCorrecta) {
    var a = ANumero(respuestaJugador);
    var b = ANumero(respuestaCorrecta);
    if (isNaN(a) || isNaN(b)) return false;
    return Math.abs(a - b) < 0.0005;
}

function RevisarRespuestas() {
    var mensaje = document.querySelector(".p-mensaje");
    var inputs = document.querySelectorAll("#tablaMix input");
    var conclusion = document.getElementById("p-conclusion");
    var p = problemasPartida[problemaActual];
    var errores = 0;

    // A) Avisos SIN castigo
    for (var k = 0; k < inputs.length; k++) {
        if (inputs[k].value.trim() === "") {
            mensaje.innerText = "Te faltan casillas por llenar.";
            return;
        }
    }
    if (conclusion.value === "") {
        mensaje.innerText = "Elige una conclusión.";
        return;
    }

    // B) Revisar casilla por casilla
    inputs.forEach(function (input) {
        var fila = Number(input.dataset.fila);
        var campo = input.dataset.campo;
        var celda = input.parentElement;
        var correcta = solucion[fila] ? solucion[fila][campo] : undefined;   // filas de más = undefined

        if (correcta !== undefined && SonIguales(input.value, correcta)) {
            celda.classList.add("ok");
            celda.classList.remove("mal");
            input.readOnly = true;        // las correctas ya no se pueden cambiar
        } else {
            celda.classList.add("mal");
            celda.classList.remove("ok");
            errores++;
        }
    });

    // C) Filas que faltan = UN error (va FUERA del forEach para contarse una sola vez)
    var filasFaltantes = solucion.length - filasTabla;
    if (filasFaltantes > 0) errores++;

    // D) Conclusión
    if (conclusion.value === p.conclusion) {
        conclusion.classList.add("ok");
        conclusion.classList.remove("mal");
    } else {
        conclusion.classList.add("mal");
        conclusion.classList.remove("ok");
        errores++;
    }

    // E) Resultado
    if (errores > 0) {
        var texto = "Te equivocaste";
        if (filasFaltantes > 0) texto += " (te faltan iteraciones)";
        else if (filasTabla > solucion.length) texto += " (pusiste iteraciones de más)";
        mensaje.innerText = texto + ". Has perdido media vida y 5 minutos.";
        PerderMediaVida();
        if (mediasVidas > 0) Penalizar();      // solo quita tiempo si sigue vivo
    } else {
        mensaje.innerText = "";
        guardarProgreso(1, problemaActual + 1);
        ContinuarCarrera();
    }
}

/*VIDAS */
function PintarVidas() {
    var contenedorVidas = document.getElementById("p-vidas");
    contenedorVidas.innerHTML = "";                  // borra los corazones anteriores

    for (var i = 0; i < 3; i++) {
        var resto = mediasVidas - i * 2;
        var img = document.createElement("img");     // una imagen NUEVA por vuelta

        if (resto >= 2) {
            img.src = "../img/corazon.png";
            img.alt = "Corazón completo";
            img.classList.add("img-corazon");
        } else if (resto === 1) {
            img.src = "../img/corazonRoto.png";
            img.alt = "Medio corazón";
            img.classList.add("img-corazonRoto");
        } else {
            continue;                                // vida perdida: no dibuja nada
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

/*MINIJUEGO */
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

    // Elige al azar uno de los 3 minijuegos del nivel 1
    const cuales = ["sopa", "c3"];
    const elegido = cuales[Math.floor(Math.random() * cuales.length)];

    if (elegido === "sopa") IniciarSopa();
    else IniciarCuestionario3();
}

function MinijuegoGanado() {
    document.querySelector(".minijuego").style.display = "none";
    mediasVidas = 6;                  // recupera los 3 corazones
    PintarVidas();
    document.querySelector(".p-mensaje").innerText = "¡Has revivido! Termina el problema.";
    if (tiempoRestante < 600) tiempoRestante = 600;   // si se le acabó el tiempo, recibe 10 minutos
    pantallaProblema.style.display = "block";         // la tabla sigue como la dejó
    ReanudarReloj();                                   // se reanuda el reloj
}

function MinijuegoPerdido() {
    IrAlMenu();
}

function IrAlMenu() {
    window.location.href = "../niveles.html";
}

/**formulas */
var imagenesFormulas = [          // se usan en la intro Y en el botón "Fórmulas"
    "./img/formula1.png",
    "./img/formula2.png"
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
