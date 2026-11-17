var contrasenas = {
    2: "HERBACEUS",
    3: "LIBRO",
    4: "MODULO",
    5: "SEMILLA"
}

var nivelElegido = null;

/**Cargar los niveles desbloqueados */
function CargarDesbloqueados() {
    return JSON.parse(localStorage.getItem("nivelesDesbloqueados") || "[1]");
}

function GuardarDesbloqueado(nivel) {
    const lista = CargarDesbloqueados();
    if (!lista.includes(nivel)) lista.push(nivel);
    localStorage.setItem("nivelesDesbloqueados", JSON.stringify(lista));
}

function EstaDesbloqueado(nivel) {
    return CargarDesbloqueados().includes(nivel);
}

/**botones cambiar img */
function ImagenesNiveles() {
    document.querySelectorAll(".btn-nivel").forEach(function (enlace) {
        const nivel = Number(enlace.dataset.nivel);
        const img = enlace.querySelector("img");
        if (EstaDesbloqueado(nivel)) {
            img.src = "img/boton/nivel" + nivel + "c.svg";
        } else {
            img.src = "img/boton/nivel" + nivel + ".svg";
        }
    });
}

function ClicEnNivel(evento) {
    const enlace = evento.currentTarget;
    const nivel = Number(enlace.dataset.nivel);

    if (EstaDesbloqueado(nivel)) return;
    evento.preventDefault();
    nivelElegido = nivel;
    AbrirContrasena();
}

function AbrirContrasena() {
    document.querySelector(".contrasena-titulo").innerText = "Nivel " + nivelElegido + " bloqueado";
    document.querySelector(".contrasena-mensaje").innerText = "";
    document.getElementById("input-contrasena").value = "";
    document.querySelector(".ventana-contrasena").style.display = "flex";
    document.getElementById("input-contrasena").focus();     // listo para escribir
}

function CerrarContrasena() {
    document.querySelector(".ventana-contrasena").style.display = "none";
    nivelElegido = null;
}

function RevisarContrasena() {
    const escrita = document.getElementById("input-contrasena").value.trim().toUpperCase();
    const correcta = contrasenas[nivelElegido];

    if (escrita === correcta) {
        GuardarDesbloqueado(nivelElegido);
        ImagenesNiveles();                              // cambia la imagen
        const destino = `lvl${nivelElegido}/nivel.html`;
        CerrarContrasena();
        setTimeout(function () {                      // un momento para que vea el cambio
            window.location.href = destino;
        }, 600);
    } else {
        document.querySelector(".contrasena-mensaje").innerText = "Contraseña incorrecta";
    }
}


document.addEventListener("DOMContentLoaded", function () {
    ImagenesNiveles();
    document.querySelectorAll(".btn-nivel").forEach(function (enlace) {
        enlace.addEventListener("click", ClicEnNivel);
    });
    // Enter para enviar, Escape para cancelar
    document.getElementById("input-contrasena").addEventListener("keydown", function (ev) {
        if (ev.key === "Enter") RevisarContrasena();
        if (ev.key === "Escape") CerrarContrasena();
    });
});
