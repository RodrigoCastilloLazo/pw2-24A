document.addEventListener('DOMContentLoaded', () => {
    const pantalla = document.getElementById('display');
    const elementoHistorial = document.getElementById('history');
    const botones = document.querySelectorAll('.buttons button');
    let entradaActual = '';
    let historial = [];
    let variables = {};
    let estaAsignando = false;

    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            const valor = boton.textContent;

            if (valor === '=') {
                if (estaAsignando) {
                    asignarVariable();
                } else {
                    calcularResultado();
                }
            } else if (valor === 'CE') {
                limpiarEntrada();
            } else if (valor === 'asig') {
                iniciarAsignacion();
            } else {
                añadirEntrada(valor);
            }
        });
    });

    elementoHistorial.addEventListener('click', (event) => {
        if (event.target && event.target.nodeName === "DIV") {
            entradaActual = event.target.textContent.split(' = ')[0];
            actualizarPantalla(entradaActual);
        }
    });

    function añadirEntrada(valor) {
        entradaActual += valor;
        actualizarPantalla(entradaActual);
    }

    function limpiarEntrada() {
        entradaActual = '';
        actualizarPantalla('0');
        estaAsignando = false;
    }

    function iniciarAsignacion() {
        if (entradaActual.trim() === 'x') {
            estaAsignando = true;
            entradaActual += ' = ';
            actualizarPantalla(entradaActual);
        } else {
            actualizarPantalla('Error: Use x para asignación');
            entradaActual = '';
        }
    }

    function calcularResultado() {
        if (!estaAsignando) {
            try {
                let expresion = entradaActual;
                for (let variable in variables) {
                    let valor = variables[variable];
                    let regex = new RegExp(`\\b${variable}\\b`, 'g');
                    expresion = expresion.replace(regex, valor);
                }
                let resultado = eval(expresion);
                actualizarHistorial(entradaActual + ' = ' + resultado);
                entradaActual = resultado.toString();
                actualizarPantalla(resultado);
            } catch (error) {
                actualizarPantalla('Error');
                entradaActual = '';
            }
        }
    }

    function asignarVariable() {
        const partes = entradaActual.split('=');
        if (partes.length === 2 && partes[0].trim() === 'x') {
            try {
                let valor = eval(partes[1].trim());
                variables['x'] = valor;
                actualizarHistorial(`x = ${valor}`);
                actualizarPantalla(`x = ${valor}`);
                entradaActual = '';
                estaAsignando = false;
            } catch (error) {
                actualizarPantalla('Error en la asignación');
                entradaActual = '';
                estaAsignando = false;
            }
        } else {
            actualizarPantalla('Error: Asignación inválida');
            entradaActual = '';
            estaAsignando = false;
        }
    }

    function actualizarPantalla(valor) {
        pantalla.textContent = valor;
    }

    function actualizarHistorial(operacion) {
        if (historial.length >= 5) {
            historial.shift();
        }
        historial.push(operacion);
        renderizarHistorial();
    }

    function renderizarHistorial() {
        elementoHistorial.innerHTML = '';
        historial.forEach(item => {
            const elementoHistorialItem = document.createElement('div');
            elementoHistorialItem.textContent = item;
            elementoHistorial.appendChild(elementoHistorialItem);
        });
    }

    limpiarEntrada();
});
