const PAGINA_JUEGO = "niveles.html";

const $ = (id) => document.getElementById(id);

const lista = $("lista-perfiles");
const modalEntrar = $("modal-entrar");
const modalCrear = $("modal-crear");
const modalAviso = $("modal-aviso");
const btnBorrar = $("btn-borrar");

let perfilSeleccionado = null;
let avatarElegido = AVATARES[0].id;
let borrarPendiente = false;

// ---------- Lista de perfiles ----------
function pintarPerfiles() {
    const perfiles = cargarPerfiles();
    lista.innerHTML = "";

    perfiles.forEach(perfil => {
        const { nivelesCompletados, actual } = resumenProgreso(perfil);
        const lineaNivel = actual
            ? `nivel ${actual.nivel}: ${actual.hechos}/${actual.total}`
            : "¡juego completado!";

        const tarjeta = document.createElement("button");
        tarjeta.type = "button";
        tarjeta.className = "perfil";
        tarjeta.innerHTML = `
            ${htmlAvatar(perfil.avatar)}
            <span class="nombre"></span>
            <span class="dato">niveles completados: ${nivelesCompletados}/${TOTAL_NIVELES}</span>
            <span class="dato">${lineaNivel}</span>
        `;
        tarjeta.querySelector(".nombre").textContent = perfil.nombre; // textContent: el nombre nunca se interpreta como HTML
        tarjeta.addEventListener("click", () => abrirEntrar(perfil));
        lista.appendChild(tarjeta);
    });

    if (perfiles.length < MAX_PERFILES) {
        const nuevo = document.createElement("button");
        nuevo.type = "button";
        nuevo.className = "perfil nuevo";
        nuevo.innerHTML = `
            <div class="avatar-nuevo">+</div>
            <span class="nombre">Crear perfil</span>
        `;
        nuevo.addEventListener("click", abrirCrear);
        lista.appendChild(nuevo);
    }
}

// ---------- Entrar ----------
function abrirEntrar(perfil) {
    perfilSeleccionado = perfil;
    $("entrar-avatar").innerHTML = htmlAvatar(perfil.avatar);
    $("entrar-nombre").textContent = perfil.nombre;
    $("form-entrar").reset();
    $("entrar-error").textContent = "";
    reiniciarBorrar();
    modalEntrar.showModal();
    $("entrar-pass").focus();
}

$("form-entrar").addEventListener("submit", (e) => {
    e.preventDefault();
    const pass = $("entrar-pass").value;

    if (!verificarPassword(perfilSeleccionado, pass)) {
        mostrarError("entrar-error", "Esa no es tu contraseña", modalEntrar);
        $("entrar-pass").select();
        return;
    }

    iniciarSesion(perfilSeleccionado.id);
    location.href = PAGINA_JUEGO;
});

// ---------- Borrar perfil (pide la contraseña y confirmar) ----------
function reiniciarBorrar() {
    borrarPendiente = false;
    btnBorrar.textContent = "Borrar este perfil";
    btnBorrar.classList.remove("confirmar");
}

btnBorrar.addEventListener("click", () => {
    if (!verificarPassword(perfilSeleccionado, $("entrar-pass").value)) {
        mostrarError("entrar-error", "Escribe tu contraseña para poder borrarlo", modalEntrar);
        return;
    }
    if (!borrarPendiente) {
        borrarPendiente = true;
        btnBorrar.textContent = "¿Segura? Se pierde todo el progreso. Toca otra vez para borrar";
        btnBorrar.classList.add("confirmar");
        return;
    }
    borrarPerfil(perfilSeleccionado.id);
    modalEntrar.close();
    pintarPerfiles();
});

// ---------- Crear perfil ----------
function abrirCrear() {
    $("form-crear").reset();
    $("crear-error").textContent = "";
    avatarElegido = AVATARES[0].id;
    pintarSelector();
    modalCrear.showModal();
    $("crear-nombre").focus();
}

function pintarSelector() {
    const contenedor = $("selector-avatares");
    contenedor.innerHTML = "";

    AVATARES.forEach(a => {
        const opcion = document.createElement("button");
        opcion.type = "button";
        opcion.className = "opcion-avatar" + (a.id === avatarElegido ? " elegido" : "");
        opcion.setAttribute("aria-label", "Foto " + a.id);
        opcion.innerHTML = htmlAvatar(a.id, "chico");
        opcion.addEventListener("click", () => {
            avatarElegido = a.id;
            pintarSelector();
        });
        contenedor.appendChild(opcion);
    });
}

$("form-crear").addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = $("crear-nombre").value.trim();
    const pass = $("crear-pass").value;
    const pass2 = $("crear-pass2").value;

    if (!nombre) return mostrarError("crear-error", "Escribe tu nombre", modalCrear);
    if (existeNombre(nombre)) return mostrarError("crear-error", "Ya hay un perfil con ese nombre", modalCrear);
    if (pass.length < 4) return mostrarError("crear-error", "La contraseña necesita al menos 4 caracteres", modalCrear);
    if (pass !== pass2) return mostrarError("crear-error", "Las contraseñas no son iguales", modalCrear);

    crearPerfil(nombre, avatarElegido, pass);
    modalCrear.close();
    pintarPerfiles();

    // Recordatorio: ¡que no se le olvide!
    $("aviso-nombre").textContent = nombre;
    $("aviso-pass").textContent = pass;
    modalAviso.showModal();
});

// ---------- Utilidades ----------
function mostrarError(idError, mensaje, ventana) {
    $(idError).textContent = mensaje;
    ventana.classList.remove("temblar");
    void ventana.offsetWidth; // reinicia la animación
    ventana.classList.add("temblar");
}

// Cualquier botón con data-cerrar cierra su ventana
document.querySelectorAll("[data-cerrar]").forEach(boton => {
    boton.addEventListener("click", () => boton.closest("dialog").close());
});

pintarPerfiles();