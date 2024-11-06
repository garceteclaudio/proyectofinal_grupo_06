{/* <!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Billetera Virtual</title>
    <link rel="stylesheet" href="../public/CSS/index.css" />
  </head>
  <body>
    <main>
      <div class="background"></div>
      <div class="form-container">
        <form class="form-box" id="formulario">
          <div class="title-container">
          <p class="form-title">Formulario de Carga</p>
          </div>
          <!-- NOMBRE -->
          <div class="form-input">
            <label for="nombre">Nombre Completo</label>
            <input type="text" id="nombre" required/>
            <img src="/public/resources/images/user.png" class="form-image"
            />
          </div>
          <!-- TRANSACCIONES -->
          <div class="form-input">
            <label for="transacciones">Cantidad de Transacciones</label>
            <input type="number" id="transacciones" required />
            <img src="/public/resources/images/payment.png" class="form-image"/>
          </div>
          <!-- MÉTODO DE PAGO -->
          <div class="form-input">
            <label for="select">Método de Pago</label>
            <select name="type-of-user" id="select">
              <option value="Transferencia" class="form-option">Transferencia</option>
              <option value="Mercado Pago" class="form-option">Mercado Pago</option>
              <option value="Brubank" class="form-option">Brubank</option>
              <option value="Ualá" class="form-option">Ualá</option>
              <option value="PayPal" class="form-option">PayPal</option>
              <option value="Depósito" class="form-option">Depósito</option>
              <option value="Criptomonedas" class="form-option">Criptomonedas</option>
            </select>
            <img src="/public/resources/images/method.png" class="form-image"/>
          </div>
          <!-- BOTONES -->
          <div class="button-container">
            <div class="submit-box">
              <button type="submit" id="cargar" class="form-button">Cargar</button>
            </div>
            <div class="normal-box">
              <button type="button" id="verListado" class="form-button">Ver Listado</button>
              <button type="button" id="masTransacciones" class="form-button">Ver Resumen</button>
            </div>
          </div>
        </form>
      </div>
      <!-- Contenedores para el listado y el resumen de transacciones -->
      <section class="listado" id="contenedorListado">
        <h2>Resumen de Cuentas</h2>
        <div id="listado"></div>
      </section>

      <section class="listado" id="contenedorMasTransacciones">
        <h2>Billetera con más Transacciones</h2>
        <div id="masTransaccionesResumen"></div>
      </section>
    </main>
    <script src="../../../src/index.js"></script>
  </body>
</html>
 */}