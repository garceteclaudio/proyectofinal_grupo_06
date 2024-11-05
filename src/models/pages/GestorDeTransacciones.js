const datosCuentas = [];

// Maneja el evento de envío del formulario
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formulario-flexbox");
    const verListado = document.getElementById("verListado");
    const masTransacciones = document.getElementById("masTransacciones");

    form.addEventListener("submit", registrarDatos);
    verListado.addEventListener("click", muestraDatos);
    masTransacciones.addEventListener("click", muestraMovimientos);
});

// Función para registrar datos
function registrarDatos(event) {
    event.preventDefault();

    let nombre = document.getElementById("nombre").value.trim();
    let billetera = document.getElementById("select").value;
    let transac = document.getElementById("transacciones").value.trim();

    // Validación de datos
    if (!nombre || !billetera || !transac) {
        alert("Por favor, rellena todos los datos");
        return;
    }

    // Almacena los datos en el array
    datosCuentas.push({
        nombre: nombre,
        billetera: billetera,
        transacciones: parseInt(transac)
    });

    document.getElementById("formulario-flexbox").reset();
}

// Función para mostrar los datos registrados
function muestraDatos() {
    let datos = "";
    const listaDatos = document.getElementById("listado");

    for (let i = 0; i < datosCuentas.length; i++) {
        datos += `<li>${datosCuentas[i].nombre} - ${datosCuentas[i].billetera} - ${datosCuentas[i].transacciones}</li>`;
    }

    listaDatos.innerHTML = datos;
}

// Función para mostrar la cuenta con la mayor transacción
function muestraMovimientos() {
    const listaMovimientos = document.getElementById("masTransaccionesResumen");
    let cuentaMaxTransaccion = null;

    // Busca la cuenta con la mayor cantidad de transacciones
    for (const cuenta of datosCuentas) {
        if (!cuentaMaxTransaccion || cuenta.transacciones > cuentaMaxTransaccion.transacciones) {
            cuentaMaxTransaccion = cuenta;
        }
    }

    // Muestra la cuenta con más transacciones
    if (cuentaMaxTransaccion) {
        listaMovimientos.innerHTML = `<li>${cuentaMaxTransaccion.nombre} - ${cuentaMaxTransaccion.billetera} - ${cuentaMaxTransaccion.transacciones}</li>`;
    } else {
        listaMovimientos.innerHTML = "No hay transacciones registradas.";
    }
}
