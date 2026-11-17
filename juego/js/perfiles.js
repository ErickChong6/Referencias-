const CLAVE_PERFILES = "miJuego_perfiles";
const CLAVE_SESION = "miJuego_sesion";


const RETOS_POR_NIVEL = [4, 4, 4, 4, 2];
const TOTAL_NIVELES = RETOS_POR_NIVEL.length;
const MAX_PERFILES = 6;

// Biblioteca de fotos de perfil.
const AVATARES = [
    { id: "gato1", img: "img/fotosPerfil/1.png" },
    { id: "bruja", img: "img/fotosPerfil/2.png" },
    { id: "gato2", img: "img/fotosPerfil/3.png" },
    { id: "brujo", img: "img/fotosPerfil/4.png" }
];

//  Guardar y leer 
function cargarPerfiles() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_PERFILES)) || [];
    } catch {
        return [];
    }
}

function guardarPerfiles(perfiles) {
    localStorage.setItem(CLAVE_PERFILES, JSON.stringify(perfiles));
}

function buscarPerfil(id) {
    return cargarPerfiles().find(p => p.id === id) || null;
}

function existeNombre(nombre) {
    const n = nombre.toLowerCase();
    return cargarPerfiles().some(p => p.nombre.toLowerCase() === n);
}

function crearPerfil(nombre, avatar, password) {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const perfil = {
        id,
        nombre,
        avatar,
        clave: hashPassword(id + password),
        progreso: RETOS_POR_NIVEL.map(() => 0), // retos hechos en cada nivel
    };
    const perfiles = cargarPerfiles();
    perfiles.push(perfil);
    guardarPerfiles(perfiles);
    return perfil;
}

function borrarPerfil(id) {
    guardarPerfiles(cargarPerfiles().filter(p => p.id !== id));
    if (sessionStorage.getItem(CLAVE_SESION) === id) cerrarSesion();
}

//  Contraseña NO MOVER
function hashPassword(texto) {
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (let i = 0; i < texto.length; i++) {
        const ch = texto.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
}

function verificarPassword(perfil, password) {
    return perfil.clave === hashPassword(perfil.id + password);
}

function iniciarSesion(id) {
    sessionStorage.setItem(CLAVE_SESION, id);
}

function cerrarSesion() {
    sessionStorage.removeItem(CLAVE_SESION);
}

function perfilActivo() {
    const id = sessionStorage.getItem(CLAVE_SESION);
    return id ? buscarPerfil(id) : null;
}

// ---------- Progreso (úsalo desde el juego) ----------
// guardarProgreso(1, 4)  → en el nivel 1 lleva 4 retos hechos.
// Nunca baja: si ya tenía 6, se queda en 6.
function guardarProgreso(nivel, completados) {
    const perfiles = cargarPerfiles();
    const perfil = perfiles.find(p => p.id === sessionStorage.getItem(CLAVE_SESION));
    const i = nivel - 1;
    if (!perfil || i < 0 || i >= TOTAL_NIVELES) return;

    const tope = Math.min(completados, RETOS_POR_NIVEL[i]);
    perfil.progreso[i] = Math.max(perfil.progreso[i] || 0, tope);
    guardarPerfiles(perfiles);
}

// completarReto(1) → suma 1 reto al nivel 1.
function completarReto(nivel) {
    const perfil = perfilActivo();
    if (!perfil) return;
    guardarProgreso(nivel, (perfil.progreso[nivel - 1] || 0) + 1);
}

function resumenProgreso(perfil) {
    const prog = perfil.progreso || [];
    let nivelesCompletados = 0;
    let actual = null;

    RETOS_POR_NIVEL.forEach((total, i) => {
        const hechos = prog[i] || 0;
        if (hechos >= total) nivelesCompletados++;
        else if (actual === null) actual = { nivel: i + 1, hechos, total };
    });

    return { nivelesCompletados, actual };
}

function htmlAvatar(idAvatar, tamano = "") {
    const a = AVATARES.find(x => x.id === idAvatar) || AVATARES[0];
    const contenido = a.img
        ? `<img src="${a.img}" alt="">`
        : `<span class="emoji">${a.emoji}</span>`;
    return `<div class="avatar ${tamano}">${contenido}</div>`;
}
