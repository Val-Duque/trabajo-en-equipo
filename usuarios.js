// ========================================
// JAVASCRIPT - SISTEMA DE CONTRASEÑAS
// Este archivo controla el modal de contraseña
// ========================================

// ========================================
// VARIABLES - Guardamos referencias a los elementos del HTML
// ========================================

// document.getElementById() busca un elemento por su ID
// Es como decir "busca el elemento que tiene id='modal'"
const modal = document.getElementById('modal');
const inputPassword = document.getElementById('input-password');
const modalError = document.getElementById('modal-error');
const modalTitulo = document.getElementById('modal-titulo');
const btnEntrar = document.getElementById('btn-entrar');
const btnCancelar = document.getElementById('btn-cancelar');

// Nuevos elementos para la foto y el botón de ver contraseña
const modalFotoImg = document.getElementById('modal-foto-img');
const btnVerPassword = document.getElementById('btn-ver-password');
const iconoVer = document.getElementById('icono-ver');
const iconoOcultar = document.getElementById('icono-ocultar');

// document.querySelectorAll() busca TODOS los elementos con esa clase
// Devuelve una lista de todos los elementos con clase "usuario-card"
const tarjetasUsuarios = document.querySelectorAll('.usuario-card');

// Esta variable guardará la contraseña correcta del usuario seleccionado
let passwordCorrecta = '';

// ========================================
// FUNCIONES - Bloques de código reutilizables
// ========================================

// Esta función ABRE el modal (lo hace visible)
function abrirModal(nombreUsuario, password, fotoSrc) {
    // Cambiamos el título para mostrar el nombre del usuario
    modalTitulo.textContent = 'Hola ' + nombreUsuario + ', ingresa tu contraseña';

    // Mostramos la foto del usuario en el modal
    modalFotoImg.src = fotoSrc;

    // Guardamos la contraseña correcta para compararla después
    passwordCorrecta = password;

    // Limpiamos el campo de texto (por si había algo escrito antes)
    inputPassword.value = '';

    // Reseteamos el campo a tipo password (oculto)
    inputPassword.type = 'password';
    iconoVer.classList.remove('oculto');
    iconoOcultar.classList.add('oculto');

    // Ocultamos el mensaje de error
    modalError.style.display = 'none';

    // Mostramos el modal cambiando su display a "flex"
    modal.style.display = 'flex';

    // Ponemos el cursor automáticamente en el campo de contraseña
    inputPassword.focus();
}

// Esta función CIERRA el modal (lo oculta)
function cerrarModal() {
    modal.style.display = 'none';
}

// Esta función alterna entre ver y ocultar la contraseña
function togglePassword() {
    // Si el campo está en modo password (oculto)
    if (inputPassword.type === 'password') {
        // Lo cambiamos a texto (visible)
        inputPassword.type = 'text';
        // Mostramos el ícono de ojo tachado
        iconoVer.classList.add('oculto');
        iconoOcultar.classList.remove('oculto');
    } else {
        // Lo cambiamos a password (oculto)
        inputPassword.type = 'password';
        // Mostramos el ícono de ojo normal
        iconoVer.classList.remove('oculto');
        iconoOcultar.classList.add('oculto');
    }
}

// Esta función VERIFICA si la contraseña es correcta
function verificarPassword() {
    // Obtenemos lo que el usuario escribió en el campo
    const passwordIngresada = inputPassword.value;

    // Comparamos: ¿lo que escribió es igual a la contraseña correcta?
    if (passwordIngresada === passwordCorrecta) {
        // ¡Contraseña correcta! Redirigimos al escritorio
        // window.location.href cambia la página actual
        window.location.href = 'index.html';
    } else {
        // Contraseña incorrecta, mostramos el error
        modalError.style.display = 'block';

        // Limpiamos el campo para que intente de nuevo
        inputPassword.value = '';

        // Ponemos el cursor de nuevo en el campo
        inputPassword.focus();
    }
}

// ========================================
// EVENTOS - Acciones que pasan cuando el usuario hace algo
// ========================================

// Para CADA tarjeta de usuario, agregamos un evento de clic
// forEach recorre cada elemento de la lista uno por uno
tarjetasUsuarios.forEach(function (tarjeta) {
    // Cuando se hace clic en una tarjeta...
    tarjeta.addEventListener('click', function () {
        // Obtenemos el número de usuario del atributo data-usuario
        // dataset es un objeto que contiene todos los atributos data-*
        const numeroUsuario = tarjeta.dataset.usuario;

        // Obtenemos la contraseña del atributo data-password
        const password = tarjeta.dataset.password;

        // Obtenemos la foto del usuario desde el img dentro de la tarjeta
        const fotoUsuario = tarjeta.querySelector('.usuario-foto img').src;

        // Abrimos el modal con el nombre, contraseña y foto de este usuario
        abrirModal('Usuario ' + numeroUsuario, password, fotoUsuario);
    });
});

// Cuando se hace clic en el botón de ver/ocultar contraseña
btnVerPassword.addEventListener('click', togglePassword);

// Cuando se hace clic en el botón "Entrar"
btnEntrar.addEventListener('click', verificarPassword);

// Cuando se hace clic en el botón "Cancelar"
btnCancelar.addEventListener('click', cerrarModal);

// Cuando se presiona Enter en el campo de contraseña
inputPassword.addEventListener('keypress', function (evento) {
    // evento.key nos dice qué tecla se presionó
    if (evento.key === 'Enter') {
        verificarPassword();
    }
});

// Cuando se hace clic en el fondo oscuro (fuera del modal)
modal.addEventListener('click', function (evento) {
    // evento.target es el elemento exacto donde se hizo clic
    // Si se hizo clic en el fondo (no en el contenido del modal)
    if (evento.target === modal) {
        cerrarModal();
    }
});
