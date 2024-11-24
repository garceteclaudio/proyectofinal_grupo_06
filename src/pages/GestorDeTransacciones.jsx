import React, { useState } from "react";
import "../stylesheets/GestorDeTransacciones.css";

function GestorDeTransacciones() {
  const [datosCuentas, setDatosCuentas] = useState([]);
  const [datosFormulario, setdatosFormulario] = useState({
    nombre: "",
    cantidad: "",
    billetera: "Transferencia"
  });

  //REGISTRAR LOS DATOS DE LAS TRANSACCIONES
  const registrarDatos = (event) => {
    event.preventDefault();

    setDatosCuentas([
      ...datosCuentas,
      {
        nombre: datosFormulario.nombre,
        billetera: datosFormulario.billetera,
        transacciones: parseInt(datosFormulario.cantidad)
      }
    ]);
    setdatosFormulario({ nombre: "", cantidad: "", billetera: "Transferencia" });
  };

  //MOSTRAR TODAS LAS TRANSACCIONES COMO UN LSITADO
  const mostrarListado = () => {
    return (
      <div id="listadoFinal">
        {datosCuentas.length === 0 ? "Todavía no se registraron transacciones." : datosCuentas.map((cuenta, index) => (
            //GENERAR UNA ITEM PARA MOSTRAR LAS TRANSACCIONES REGISTRADAS
            <li key={index}>
              {cuenta.nombre} - {cuenta.billetera} - {cuenta.transacciones}
            </li>
          ))}
      </div>
    );
  };

// MOSTRAR LAS TRANSACCIONES MÁS GRANDES POR USUARIO
const mostrarResumen = () => {
  // Agrupar y sumar las transacciones por usuario y billetera
  const transaccionesAgrupadas = datosCuentas.reduce((acumulador, cuenta) => {
    const clave = `${cuenta.nombre}-${cuenta.billetera}`;
    const transaccionExistente = acumulador.find((item) => item.clave === clave);

    if (transaccionExistente) {
      transaccionExistente.transacciones += cuenta.transacciones;
    } else {
      acumulador.push({
        clave,
        nombre: cuenta.nombre,
        billetera: cuenta.billetera,
        transacciones: cuenta.transacciones,
      });
    }

    return acumulador;
  }, []);

  // Determinar la transacción más alta por usuario
  const maxTransaccionPorUsuario = transaccionesAgrupadas.reduce((acumulador, transaccion) => {
    const usuarioExistente = acumulador.find(
      (item) => item.nombre === transaccion.nombre
    );

    if (!usuarioExistente || transaccion.transacciones > usuarioExistente.transacciones) {
      const nuevoAcumulador = acumulador.filter((item) => item.nombre !== transaccion.nombre);
      nuevoAcumulador.push(transaccion);
      return nuevoAcumulador;
    }

    return acumulador;
  }, []);

  // Renderizar las transacciones más altas
  return (
    <div id="resumenFinal">
      {maxTransaccionPorUsuario.length === 0
        ? "Todavía no se registraron transacciones."
        : maxTransaccionPorUsuario.map((cuenta, index) => (
            // Mostrar la mayor transacción de cada usuario
            <li key={index}>
              {cuenta.nombre} - {cuenta.billetera} - {cuenta.transacciones}
            </li>
          ))}
    </div>
  );
};

  return (
    <div className="project-container">
      <div className="background-image"></div>
      {/*<div className="form-container">*/}
      <form className="form-box" onSubmit={registrarDatos}>
        <div className="title-container">
          <p className="form-title">Formulario de Carga</p>
        </div>
        {/* NOMBRE */}
        <div className="form-input">
          <label htmlFor="nombre">Nombre Completo</label>
          <input
            type="text"
            id="nombre"
            value={datosFormulario.nombre}
            onChange={(e) => setdatosFormulario({ ...datosFormulario, nombre: e.target.value })}
            required
          />
          <img src="/resources/images/pages/user.png" className="form-image" alt="User" />
        </div>
        {/* TRANSACCIONES */}
        <div className="form-input">
          <label htmlFor="transacciones">Cantidad de Transacciones</label>
          <input
            type="number"
            id="cantidad"
            value={datosFormulario.cantidad}
            onChange={(e) => setdatosFormulario({ ...datosFormulario, cantidad: e.target.value })}
            required
          />
          <img src="/resources/images/pages/payment.png" className="form-image" alt="Payment" />
        </div>
        {/* MÉTODO DE PAGO */}
        <div className="form-input">
          <label htmlFor="select">Método de Pago</label>
          <select
            id="billetera"
            value={datosFormulario.billetera}
            onChange={(e) => setdatosFormulario({ ...datosFormulario, billetera: e.target.value })}
          >
            <option value="Transferencia">Transferencia</option>
            <option value="Mercado Pago">Mercado Pago</option>
            <option value="Brubank">Brubank</option>
            <option value="Ualá">Ualá</option>
            <option value="PayPal">PayPal</option>
            <option value="Depósito">Depósito</option>
            <option value="Criptomonedas">Criptomonedas</option>
          </select>
          <img src="/resources/images/pages/method.png" className="form-image" alt="Method" />
        </div>
        {/* BOTONES */}
        <div className="button-container">
          <div className="submit-box">
            <button type="submit" id="cargar" className="form-button">
              Cargar
            </button>
          </div>
          <div className="normal-box">
            <a href="#resumenListado"><button type="button" id="verListado" className="form-button">Ver Listado</button></a>
            <a href="#resumenBilleteras"><button type="button" id="verResumen" className="form-button">Ver transacciones mas altas</button></a>
          </div>
        </div>
      </form>
      {/*</div>*/}
      {/* LISTADO */}
      <div className="summary-container" id="resumenListado">
        <div className="summary-box">
          <a href="#" className="summary-toggle">×</a>
          <h2 className="summary-title">Listado completo de transacciones</h2>
          <div className="summary-list">{mostrarListado()}</div>
        </div>
      </div>
      {/* RESUMEN */}
      <div className="summary-container" id="resumenBilleteras">
        <div className="summary-box">
          <a href="#" className="summary-toggle">×</a>
          <h2 className="summary-title">Transacciones más altas por billetera</h2>
          <div className="summary-list">{mostrarResumen()}</div>
        </div>
      </div>
    </div>
  );
};

export default GestorDeTransacciones;
