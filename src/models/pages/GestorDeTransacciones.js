const datosCuentas = [];

//MANEJO DEL FORMULARIO COMO EVENTOS
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formulario");
    const verListado = document.getElementById("verListado");
    const verResumen = document.getElementById("verResumen");

    form.addEventListener("submit", registrarDatos);
    verListado.addEventListener("click", mostrarListado);
    verResumen.addEventListener("click", mostrarResumen);
});

//FUNCIÓN PARA REGISTRAR LOS DATOS DE LAS TRANSACCIONES
function registrarDatos(event) {
    event.preventDefault();

    let nombre = document.getElementById("nombre").value.trim();
    let billetera = document.getElementById("billetera").value;
    let cantidad = document.getElementById("cantidad").value.trim();

    //ALMACENA CADA CONJUNNTO DE DATOS EN UN ARRAY
    datosCuentas.push({
        nombre: nombre,
        billetera: billetera,
        transacciones: parseInt(cantidad)
    });

    document.getElementById("formulario").reset();
}

//FUNCIÓN PARA MOSTRAR LAS TRANSACCIONES COMO UN LSITADO
function mostrarListado() {
    const datosListado = document.getElementById("listadoFinal");
    let datos = "";

    //GENERAR UNA ITEM DE LISTA PARA MOSTRAR LAS TRANSACCIONES REGISTRADAS
    for (let i = 0; i < datosCuentas.length; i++) {
        datos += `<li>${datosCuentas[i].nombre} - ${datosCuentas[i].billetera} - ${datosCuentas[i].transacciones}</li>`;
    }

    datosListado.innerHTML = datos || "Todavía no se registraron transacciones.";
}

function mostrarResumen() {
    const datosResumen = document.getElementById("resumenFinal");
    let maxTransaccion = {};

    //RECORRER CADA CONJUNTO DE DATOS DEL ARRAY 
    for (const cuenta of datosCuentas) {
        const billetera = cuenta.billetera;
        
        //REGISTRAR LA MAYOR TRANSACCIÓN DE CADA BILLETERA EN CASO DE EXISTIR
        if (!maxTransaccion[billetera] || cuenta.transacciones > maxTransaccion[billetera].transacciones) {
            maxTransaccion[billetera] = cuenta;
        }
    }

    //GENERAR UN ITEM DE LISTA PARA MOSTRAR LA MAYOR TRANSACCIÓN DE CADA BILLETERA
    let datos = "";
    for (const billetera in maxTransaccion) {
        const cuenta = maxTransaccion[billetera];
        datos += `<li>${cuenta.nombre} - ${cuenta.billetera} - ${cuenta.transacciones}</li>`;
    }

    datosResumen.innerHTML = datos || "Todavía no se registraron transacciones.";
}