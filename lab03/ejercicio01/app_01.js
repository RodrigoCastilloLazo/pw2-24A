document.getElementById('txtNumeroTarjeta').addEventListener('keypress', soloNumerosAll);
document.getElementById('txtNumDoc').addEventListener('keypress', soloNumerosDNI);
document.getElementById('boton_captcha').addEventListener('click', cambiarCaptcha);
document.addEventListener('DOMContentLoaded', function() {
    generarTeclado();
    cargarCaptcha();
    document.getElementById('limpiar').addEventListener('click', limpiarPassword);
});
function cambiarEspTextNumDoc() {
    limpiarNumDoc();
    cambiarEspacios();
}

function cambiarEspacios() {
    const tipoDoc = document.getElementById('cboTipoDoc').value;
    const txtNumDoc = document.getElementById('txtNumDoc');

    switch (tipoDoc) {
        case '1': 
            txtNumDoc.maxLength = 8;
            break;
        case '2': 
            txtNumDoc.maxLength = 20;
            break;
        case '3': 
            txtNumDoc.maxLength = 20;
            break;
        case '4': 
            txtNumDoc.maxLength = 11;
            break;
    }
}
const captchaData = [
    { image: 'captchaImg/263S2V.jpg', answer: '263S2V' },
    { image: 'captchaImg/6HJH6CTN.jpg', answer: '6HJH6CTN' },
    { image: 'captchaImg/AAXUE.jpg', answer: 'AAXUE' },
    { image: 'captchaImg/EXXTENHK.jpg', answer: 'EXXTENHK' }
  ];

function cargarCaptcha() {
    const captcha = captchaData[Math.floor(Math.random() * captchaData.length)];
    document.getElementById('captcha').src = captcha.image;
    document.getElementById('captcha').setAttribute('data-answer', captcha.answer);
}

function cambiarCaptcha() {
    const txtCaptcha = document.getElementById('txtCaptcha');
    txtCaptcha.value = "";
    cargarCaptcha();

}

window.onload = cargarCaptcha;

function verificarCaptcha() {
    const respuestaUsuario = document.getElementById('txtCaptcha').value.toUpperCase();
    const respuestaCorrecta = document.getElementById('captcha').getAttribute('data-answer');

    if (respuestaUsuario == respuestaCorrecta) {
        return true;
    }else {
        alert('Incorrecto captcha');
        cambiarCaptcha();
        return false;
    }
}

function autenticar() {
    const txtNumeroTarjeta = document.getElementById('txtNumeroTarjeta').value;
    const txtNumDoc = document.getElementById('txtNumDoc').value;
    const tipoDoc = document.getElementById('cboTipoDoc').value;
    const txtNumDocTamaño = document.getElementById('txtNumDoc').maxLength;
    const txtPasswordTamaño = document.getElementById('txtPassword').value.length;
    if (txtNumeroTarjeta.length === 16 && verificarCaptcha() && txtNumDocTamaño === txtNumDoc.length && txtPasswordTamaño === 6) {
        alert('Ingreso Correcto')
        window.location.reload();
    }else {
        alert("Ingreso Incorrecto")
        window.location.reload();
    }
}
function generarTeclado() {
    const numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    numeros.sort(() => Math.random() - 0.5); 
    const teclado = document.getElementById('botones-clave');
    const limpiarBtn = document.getElementById('limpiar'); 
    teclado.innerHTML = ''; 

    numeros.forEach(num => {
        const boton = document.createElement('div');
        boton.textContent = num;
        boton.classList.add('boton-clave');
        boton.addEventListener('click', () => evalRanTable(num));
        teclado.appendChild(boton);
    });
    teclado.appendChild(limpiarBtn);
}

function evalRanTable(char) {
    const txtPassword = document.getElementById('txtPassword');
    if (txtPassword.value.length < 6) {
        txtPassword.value += char;
    }
}

function limpiarPassword() {
    const txtPassword = document.getElementById('txtPassword');
    txtPassword.value = '';
}

function soloNumerosAll(event) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    return /[0-9]/.test(keyValue);
  }
function soloNumerosDNI(event) {
    return soloNumerosAll(event);
}

function limpiarNumDoc() {
    document.getElementById('txtNumDoc').value = '';
}
function limpiarTipoTargeta() {
    document.getElementById('txtNumeroTarjeta').value = '';
}

  