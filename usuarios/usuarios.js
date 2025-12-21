// ========================================
// JAVASCRIPT - SISTEMA DE USUARIOS
// ========================================

const modal = document.getElementById('modal');
const inputPassword = document.getElementById('input-password');
const modalError = document.getElementById('modal-error');
const modalTitulo = document.getElementById('modal-titulo');
const btnEntrar = document.getElementById('btn-entrar');
const btnCancelar = document.getElementById('btn-cancelar');
const modalFotoImg = document.getElementById('modal-foto-img');
const btnVerPassword = document.getElementById('btn-ver-password');
const iconoVer = document.getElementById('icono-ver');
const iconoOcultar = document.getElementById('icono-ocultar');
const tarjetasUsuarios = document.querySelectorAll('.usuario-card');

let passwordCorrecta = '';
let usuarioActual = '';

// Abrir modal
function abrirModal(nombreUsuario, password, fotoSrc) {
    modalTitulo.textContent = 'Hola ' + nombreUsuario + ', ingresa tu contraseña';
    modalFotoImg.src = fotoSrc;
    passwordCorrecta = password;
    usuarioActual = nombreUsuario; // Guardamos el nombre para saber a dónde redirigir
    inputPassword.value = '';

    // Resetear estado visual
    inputPassword.type = 'password';
    iconoVer.classList.remove('oculto');
    iconoOcultar.classList.add('oculto');
    modalError.style.display = 'none';
    modal.style.display = 'flex';
    inputPassword.focus();
}

// Cerrar modal
function cerrarModal() {
    modal.style.display = 'none';
}

// Alternar visibilidad contraseña
function togglePassword() {
    if (inputPassword.type === 'password') {
        inputPassword.type = 'text';
        iconoVer.classList.add('oculto');
        iconoOcultar.classList.remove('oculto');
    } else {
        inputPassword.type = 'password';
        iconoVer.classList.remove('oculto');
        iconoOcultar.classList.add('oculto');
    }
}

// Verificar contraseña y redirigir
function verificarPassword() {
    const passwordIngresada = inputPassword.value;

    if (passwordIngresada === passwordCorrecta) {
        // Redirección basada en el usuario
        if (usuarioActual.includes('Usuario 2')) {
            window.location.href = 'usuario2.html'; // Relativo a usuarios/html/ si estamos ahí
        } else {
            window.location.href = '../../index.html';
        }
    } else {
        modalError.style.display = 'block';
        inputPassword.value = '';
        inputPassword.focus();
    }
}

// Event Listeners
tarjetasUsuarios.forEach(function (tarjeta) {
    tarjeta.addEventListener('click', function () {
        const numeroUsuario = tarjeta.dataset.usuario;
        const password = tarjeta.dataset.password;
        const fotoUsuario = tarjeta.querySelector('img').src;
        abrirModal('Usuario ' + numeroUsuario, password, fotoUsuario);
    });
});

if (btnVerPassword) btnVerPassword.addEventListener('click', togglePassword);
if (btnEntrar) btnEntrar.addEventListener('click', verificarPassword);
if (btnCancelar) btnCancelar.addEventListener('click', cerrarModal);

if (inputPassword) {
    inputPassword.addEventListener('keypress', function (evento) {
        if (evento.key === 'Enter') verificarPassword();
    });
}

if (modal) {
    modal.addEventListener('click', function (evento) {
        if (evento.target === modal) cerrarModal();
    });
}

// Funcionalidad de Apagado (Botón en SeleccionDeUsu.html)
const botonApagar = document.querySelector('.boton-apagar');
if (botonApagar) {
    botonApagar.addEventListener('click', function () {
        window.location.href = 'apagado.html';
    });
}
