import React, { useState } from "react";
import "../stylesheets/GestorDeTransacciones.css";

const GestorDeTransacciones = () => {
  const [datosCuentas, setDatosCuentas] = useState([]);
  const [datosFormulario, setdatosFormulario] = useState({
    nombre: "",
    cantidad: "",
    billetera: "Transferencia"
  });

  //REGISTRAR LOS DATOS DE LAS TRANSACCIONES
  const registrarDatos = (event) => {
    event.preventDefault(); //EVITAR REGISTROS INCOMPLETOS

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

  //MOSTRAR LAS TRANSACCIONES MÁS GRANDES POR BILLETERA
  const mostrarResumen = () => {
    const maxTransaccion = {};

    //RECORRER CADA CONJUNTO DE DATOS DEL ARRAY 
    datosCuentas.forEach((cuenta) => {
      const billetera = cuenta.billetera;
      
      //REGISTRAR LA MAYOR TRANSACCIÓN DE CADA BILLETERA EN CASO DE EXISTIR
      if (!maxTransaccion[billetera] || cuenta.transacciones > maxTransaccion[billetera].transacciones) {
        maxTransaccion[billetera] = cuenta;
      }
    });

    return (
      <div id="resumenFinal">
        {Object.keys(maxTransaccion).length === 0 ? "Todavía no se registraron transacciones." : Object.keys(maxTransaccion).map((billetera, index) => {
            const cuenta = maxTransaccion[billetera];
            return (
              //GENERAR UN ITEM PARA MOSTRAR LA MAYOR TRANSACCIÓN DE CADA BILLETERA
              <li key={index}>
                {cuenta.nombre} - {cuenta.billetera} - {cuenta.transacciones}
              </li>
            );
          })}
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
          <div class="normal-box">
            <a href="#resumenListado"><button type="button" id="verListado" class="form-button">Ver Listado</button></a>
            <a href="#resumenBilleteras"><button type="button" id="verResumen" class="form-button">Ver Resumen</button></a>
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
