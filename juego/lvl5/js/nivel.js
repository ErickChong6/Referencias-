/**USARIO ACTUAL EN LA PARTIDA */
const jugador = perfilActivo();

if (jugador) {
    document.getElementById("usuario").textContent = jugador.nombre;
} else {
    location.href = "../login.html"; // si nadie ha entrado, lo manda al login
}

/***GAME LOOP**/
var time = new Date();
var deltaTime = 0;
if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(Init, 1);
} else {
    document.addEventListener("DOMContentLoaded", Init);
}

function Init() {
    time = new Date();
    Start();
    Loop();
}

function Loop() {
    // Math.min pone un "techo": nunca más de 0.05 s por cuadro.
    // Así, si cambias de pestaña y regresas, el gato no da un brinco enorme.
    deltaTime = Math.min((new Date() - time) / 1000, 0.05);
    time = new Date();
    Update();
    requestAnimationFrame(Loop);
}

/***VARIABLES DEL JUEGO**/
var sueloY = 22;
var velY = 0;
var impulso = 900;
var gravedad = 2500;
var gatoPosX = 42;
var gatoPosY = sueloY;
var sueloX = 0;
var velEscenario = 1280 / 3;
var gameVel = 1;
var score = 0;
var parado = true;              // empieza pausado: primero se ve la historia
var saltando = false;
var contenedor;
var gato;
var textoScore;
var suelo;
var gameOver;
var tiempoHastaObstaculo = 1.5;
var tiempoObstaculoMin = 1;
var tiempoObstaculoMax = 2;
var obstaculoPosY = 16;
var obstaculos = [];
var pxPorMetro = 40;            // cuántos píxeles equivalen a 1 metro (más alto = más lento)

// Checkpoints: la meta se CALCULA para que siempre coincida con el número de problemas
var problemasPorNivel = 4;      // debe ser igual a los que elige ElegirProblemas()
var distanciaCheckpoint = 200;  // 
var metaFinal = distanciaCheckpoint * problemasPorNivel;   // 200 × 4 = 800 (con 500 → 2000)
var siguienteCheckpoint = distanciaCheckpoint;             // el primer problema
var ultimoCheckpoint = 0;       // desde aquí reinicias si chocas
var metrosRetroceso = 100;      // cuánto regresas al chocar

var tiempoHastaNube = 0.5;
var tiempoNubeMin = 0.7;
var tiempoNubeMax = 2.7;
var maxNubeY = 270;
var minNubeY = 100;
var nubes = [];
var velNube = 0.5;

var pantallaProblema;
var tituloProblema;
var nivelCompletado;
var avisoCheckpoint;
var ventanaFormulas;
var textoResueltos;

/**CAMBIAR IMAGENES */
var imagenesHistoria = [          // las 6 viñetas de tu cómic
    "./img/historia1.png",
    "./img/historia2.png",
    "./img/historia3.png",
    "./img/historia4.png",
];
var diapositivas = [];
var diapositivaActual = 0;
var pantallaHistoria;


/***  START: se ejecuta UNA vez, prepara todo**/
function Start() {
    gameOver = document.querySelector(".game-over");
    suelo = document.querySelector(".suelo");
    contenedor = document.querySelector("#contenedor");
    textoScore = document.querySelector(".score");
    gato = document.querySelector(".gato");
    pantallaProblema = document.querySelector(".problema");
    tituloProblema = document.querySelector(".p-titulo");
    nivelCompletado = document.querySelector(".nivel-completado");
    avisoCheckpoint = document.querySelector(".aviso-checkpoint");
    ventanaFormulas = document.querySelector(".ventana-formulas");
    textoResueltos = document.querySelector("#problemasResueltos p");
    textoTiempo = document.querySelector(".p-tiempo");

    document.querySelector(".btn-ir-problema").addEventListener("click", IrAlProblema);
    document.querySelector(".btn-enviar").addEventListener("click", RevisarRespuestas);
    document.addEventListener("keydown", HandleKeyDown);
    pantallaHistoria = document.querySelector(".pantalla-historia");

    ElegirProblemas();
    PintarResueltos();
    IniciarHistoria();
}

/***TECLADO**/
function HandleKeyDown(ev) {
    // 0) Guarda: historia al inicio. El teclado solo sirve para pasar diapositivas
    if (pantallaHistoria.style.display === "flex") {
        if (ev.key === "ArrowRight" || ev.key === "Enter") {
            ev.preventDefault();            // que Enter no presione TAMBIÉN el botón seleccionado
            CambiarDiapositiva(1);
        }
        if (ev.key === "ArrowLeft") CambiarDiapositiva(-1);
        return;
    }

    // 1) Guarda: si están abiertas las fórmulas, el teclado solo sirve para ellas
    if (ventanaFormulas.style.display === "flex") {
        if (ev.key === "ArrowRight") CambiarFormula(1);
        if (ev.key === "ArrowLeft") CambiarFormula(-1);
        if (ev.key === "Escape") CerrarFormulas();
        return;     // como va al inicio, aquí sí detiene lo de abajo
    }

    // 2) Enter en el aviso del checkpoint
    if (ev.key === "Enter" && avisoCheckpoint.style.display === "block") {
        ev.preventDefault();                // mismo motivo: un solo "clic"
        IrAlProblema();
        return;
    }

    // 3) Saltar con espacio o flecha ↑
    if (ev.key === " " || ev.key === "ArrowUp") {
        if (!parado) ev.preventDefault();   // evita el scroll solo en la carrera (en la tabla sí se pueden escribir espacios)
        Saltar();
    }
}

function Saltar() {
    if (parado) return;     // guarda: no saltar si el juego está pausado
    if (gatoPosY === sueloY) {
        saltando = true;
        velY = impulso;
        gato.classList.remove("gato-corriendo");
    }
}

/**UPDATE: se ejecuta ~60 veces por segundo**/
function Update() {
    if (parado) return;

    MoverSuelo();
    MoverGato();
    velY -= gravedad * deltaTime;
    DecidirCrearObstaculos();
    MoverObstaculos();
    DetectarColision();
    GanarPuntos();
    MoverNubes();
    DecidirCrearNubes();
}

/**  Gato  */
function MoverGato() {
    gatoPosY += velY * deltaTime;
    if (gatoPosY < sueloY) {
        TocarSuelo();
    }
    gato.style.bottom = gatoPosY + "px";
}

function TocarSuelo() {
    gatoPosY = sueloY;
    velY = 0;
    if (saltando) {
        gato.classList.add("gato-corriendo");
    }
    saltando = false;
}

/**  Escenario  */
function CalcularDesplazamiento() {
    return velEscenario * deltaTime * gameVel;
}

function MoverSuelo() {
    sueloX += CalcularDesplazamiento();
    suelo.style.left = -(sueloX % contenedor.clientWidth) + "px";
}

/**  Obstáculos  */
function DecidirCrearObstaculos() {
    tiempoHastaObstaculo -= deltaTime;
    if (tiempoHastaObstaculo <= 0) {
        CrearObstaculo();
    }
}

function CrearObstaculo() {
    var obstaculo = document.createElement("div");
    contenedor.appendChild(obstaculo);
    obstaculo.classList.add("caldero");
    obstaculo.posX = contenedor.clientWidth;
    obstaculo.style.left = contenedor.clientWidth + "px";

    obstaculos.push(obstaculo);
    // paréntesis: TODO el tiempo se divide entre gameVel (más rápido = obstáculos más seguidos)
    tiempoHastaObstaculo = (tiempoObstaculoMin + Math.random() *
        (tiempoObstaculoMax - tiempoObstaculoMin)) / gameVel;
}

function MoverObstaculos() {
    for (var i = obstaculos.length - 1; i >= 0; i--) {
        if (obstaculos[i].posX < -obstaculos[i].clientWidth) {
            obstaculos[i].parentNode.removeChild(obstaculos[i]);
            obstaculos.splice(i, 1);
        } else {
            obstaculos[i].posX -= CalcularDesplazamiento();
            obstaculos[i].style.left = obstaculos[i].posX + "px";
        }
    }
}

function LimpiarObstaculos() {
    obstaculos.forEach(o => o.remove());
    obstaculos = [];
}

/**  Nubes  */
function DecidirCrearNubes() {
    tiempoHastaNube -= deltaTime;
    if (tiempoHastaNube <= 0) {
        CrearNube();
    }
}

function CrearNube() {
    var nube = document.createElement("div");
    contenedor.appendChild(nube);
    nube.classList.add("nube");
    nube.posX = contenedor.clientWidth;
    nube.style.left = contenedor.clientWidth + "px";
    nube.style.bottom = minNubeY + Math.random() * (maxNubeY - minNubeY) + "px";

    nubes.push(nube);
    tiempoHastaNube = (tiempoNubeMin + Math.random() * (tiempoNubeMax - tiempoNubeMin)) / gameVel;
}

function MoverNubes() {
    for (var i = nubes.length - 1; i >= 0; i--) {
        if (nubes[i].posX < -nubes[i].clientWidth) {
            nubes[i].parentNode.removeChild(nubes[i]);
            nubes.splice(i, 1);
        } else {
            nubes[i].posX -= CalcularDesplazamiento() * velNube;
            nubes[i].style.left = nubes[i].posX + "px";
        }
    }
}

/**  Puntaje (metros)  */
function GanarPuntos() {
    score += CalcularDesplazamiento() / pxPorMetro;
    PintarMetros();
    RevisarCheckpoint();
}

function PintarMetros() {       // un solo lugar decide cómo se ve el contador
    textoScore.innerText = Math.floor(score) + " m";
}

function PintarResueltos() {    // "2 / 4"
    textoResueltos.innerText = problemaActual + " / " + problemasPorNivel;
}

/***CHOQUES**/
function DetectarColision() {
    for (var i = 0; i < obstaculos.length; i++) {
        if (obstaculos[i].posX > gatoPosX + gato.clientWidth) {
            break;  // los siguientes están todavía más lejos: ya no hace falta revisarlos
        } else {
            if (IsCollision(gato, obstaculos[i], 10, 30, 15, 20)) {
                GameOver();
            }
        }
    }
}

function IsCollision(a, b, paddingTop, paddingRight, paddingBottom, paddingLeft) {
    var aRect = a.getBoundingClientRect();
    var bRect = b.getBoundingClientRect();

    return !(
        ((aRect.top + aRect.height - paddingBottom) < (bRect.top)) ||
        (aRect.top + paddingTop > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width - paddingRight) < bRect.left) ||
        (aRect.left + paddingLeft > (bRect.left + bRect.width))
    );
}

function GameOver() {
    if (parado) return;     // guarda: evita dos reinicios si toca dos obstáculos a la vez
    parado = true;
    Estrellarse();
    gameOver.style.display = "block";
    setTimeout(ReiniciarDesdeCheckpoint, 1500);     // 1500 ms = 1.5 s
}

function Estrellarse() {
    gato.classList.remove("gato-corriendo");
    gato.classList.add("gato-estrellado");
}

function ReiniciarDesdeCheckpoint() {
    // 1. A dónde regresa: 100 m atrás, pero nunca antes del último checkpoint
    score = Math.max(ultimoCheckpoint, score - metrosRetroceso);
    PintarMetros();

    // 2. Quitar obstáculos (si no, vuelve a chocar al instante)
    LimpiarObstaculos();
    tiempoHastaObstaculo = 1.5;

    // 3. Gato al suelo
    gatoPosY = sueloY;
    velY = 0;
    saltando = false;
    gato.style.bottom = gatoPosY + "px";

    // 4. Quitar "estrellado" y volver a correr
    gato.classList.remove("gato-estrellado");
    gato.classList.add("gato-corriendo");

    // 5. Esconder el mensaje y, AL FINAL, dar "play"
    gameOver.style.display = "none";
    parado = false;
}

/***  CHECKPOINTS* */
function RevisarCheckpoint() {
    if (score >= siguienteCheckpoint) {
        score = siguienteCheckpoint;
        PintarMetros();
        MostrarAvisoCheckpoint();
    }
}

function MostrarAvisoCheckpoint() {
    parado = true;
    gato.classList.remove("gato-corriendo");
    avisoCheckpoint.style.display = "block";
}

function IrAlProblema() {
    avisoCheckpoint.style.display = "none";
    document.activeElement.blur();      // quita el foco del botón (si no, el espacio lo vuelve a presionar)
    MostrarProblema();
}

function ContinuarCarrera() {
    DetenerReloj();
    document.activeElement.blur();      // mismo motivo: que el espacio no vuelva a presionar "Enviar"

    // guardar el problema como resuelto (sin repetirlo)
    var resueltos = JSON.parse(sessionStorage.getItem("resueltosNivel1") || "[]");
    var id = problemasPartida[problemaActual].id;
    if (!resueltos.includes(id)) resueltos.push(id);
    sessionStorage.setItem("resueltosNivel1", JSON.stringify(resueltos));

    problemaActual++;
    PintarResueltos();                              // contador del footer
    pantallaProblema.style.display = "none";
    ultimoCheckpoint = siguienteCheckpoint;          // guardar para reinicios

    if (ultimoCheckpoint >= metaFinal) {
        FinDelNivel();
        return;
    }

    siguienteCheckpoint += distanciaCheckpoint;
    gameVel += 0.2;                 // cuánto aumenta la velocidad después de cada checkpoint
    LimpiarObstaculos();
    tiempoHastaObstaculo = 1.5;     // un respiro antes del siguiente obstáculo
    gato.classList.add("gato-corriendo");
    parado = false;
}

function FinDelNivel() {
    parado = true;
    gato.classList.remove("gato-corriendo");
    nivelCompletado.style.display = "flex";
    sessionStorage.removeItem("resueltosNivel1");
}

/*** RELOJ DEL PROBLEMA* */
function IniciarReloj() {
    tiempoRestante = minutosProblema * 60;   // empieza en 45:00
    ReanudarReloj();                         // y a partir de ahí es igual que reanudar
}

function ReanudarReloj() {                   // sigue desde el tiempo que quedaba
    DetenerReloj();                          // por si había uno corriendo
    PintarTiempo();
    reloj = setInterval(function () {
        tiempoRestante--;
        PintarTiempo();
        if (tiempoRestante <= 0) {
            TiempoAgotado();
        }
    }, 1000);                                // cada 1000 ms = 1 segundo
}

function DetenerReloj() {
    clearInterval(reloj);
    reloj = null;
}

function PintarTiempo() {
    var t = Math.max(0, tiempoRestante);
    var minutos = Math.floor(t / 60);
    var segundos = t % 60;
    if (segundos < 10) segundos = "0" + segundos;
    textoTiempo.innerText = "Tiempo restante: " + minutos + ":" + segundos + " minutos";

    if (t <= 300) textoTiempo.classList.add("alerta");   // últimos 5 min en rojo
    else textoTiempo.classList.remove("alerta");
}

function Penalizar() {
    tiempoRestante -= minutosPenalizacion * 60;          // quita 300 segundos
    PintarTiempo();
    if (tiempoRestante <= 0) {
        TiempoAgotado();
    }
}

function TiempoAgotado() {
    DetenerReloj();
    SinVidas();     // mismo camino que perder las vidas: pantalla de revivir (está en problemas1.js)
}

/**HISTORIA Y FÓRMULAS AL INICIAR*/
function IniciarHistoria() {
    parado = true;                                        // la carrera espera
    gato.classList.remove("gato-corriendo");
    diapositivas = imagenesHistoria.concat(imagenesFormulas);
    diapositivas.forEach(function (ruta) {                // precarga: descarga todas desde ya
        var img = new Image();
        img.src = ruta;
    });
    diapositivaActual = 0;
    MostrarDiapositiva();
    pantallaHistoria.style.display = "flex";
}

function MostrarDiapositiva() {
    document.querySelector(".historia-img").src = diapositivas[diapositivaActual];
    document.querySelector(".historia-contador").innerText =
        (diapositivaActual + 1) + " / " + diapositivas.length;

    var esLaUltima = diapositivaActual === diapositivas.length - 1;
    document.querySelector(".btn-historia-sig").innerText = esLaUltima ? "¡A correr!" : "▶";
}

function CambiarDiapositiva(direccion) {
    var nueva = diapositivaActual + direccion;
    if (nueva < 0) return;                                // en la primera, ◀ no hace nada
    if (nueva >= diapositivas.length) {                   // después de la última...
        TerminarHistoria();                               // ...empieza la carrera
        return;
    }
    diapositivaActual = nueva;
    MostrarDiapositiva();
}

function TerminarHistoria() {
    pantallaHistoria.style.display = "none";
    document.activeElement.blur();                        // que el espacio no presione un botón
    gato.classList.add("gato-corriendo");
    parado = false;
}
