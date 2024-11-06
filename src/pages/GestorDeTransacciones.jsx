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
            <input type="text" id="nombre" required />
            <img src="/public/resources/images/user.png" class="form-image" />
          </div>
          <!-- TRANSACCIONES -->
          <div class="form-input">
            <label for="transacciones">Cantidad de Transacciones</label>
            <input type="number" id="cantidad" required />
            <img
              src="/public/resources/images/payment.png"
              class="form-image"
            />
          </div>
          <!-- MÉTODO DE PAGO -->
          <div class="form-input">
            <label for="select">Método de Pago</label>
            <select name="type-of-user" id="billetera">
              <option value="Transferencia" class="form-option">
                Transferencia
              </option>
              <option value="Mercado Pago" class="form-option">
                Mercado Pago
              </option>
              <option value="Brubank" class="form-option">Brubank</option>
              <option value="Ualá" class="form-option">Ualá</option>
              <option value="PayPal" class="form-option">PayPal</option>
              <option value="Depósito" class="form-option">Depósito</option>
              <option value="Criptomonedas" class="form-option">
                Criptomonedas
              </option>
            </select>
            <img src="/public/resources/images/method.png" class="form-image" />
          </div>
          <!-- BOTONES -->
          <div class="button-container">
            <div class="submit-box">
              <button type="submit" id="cargar" class="form-button">Cargar</button>
            </div>
            <div class="normal-box">
              <a href="#resumenListado"><button type="button" id="verListado" class="form-button">Ver Listado</button></a>
              <a href="#resumenBilleteras"><button type="button" id="verResumen" class="form-button">Ver Resumen</button></a>
            </div>
          </div>
        </form>
      </div>
      <!-- LISTADO -->
      <div class="summary-container" id="resumenListado">
        <div class="summary-box">
          <a href="#" class="summary-toggle">×</a>
          <h2 class="summary-title">Listado completo de transacciones</h2>
          <div class="summary-list" id="listadoFinal"></div>
        </div>
      </div>
      <!-- RESUMEN -->
      <div class="summary-container" id="resumenBilleteras">
        <div class="summary-box">
          <a href="#" class="summary-toggle">×</a>
          <h2 class="summary-title">Transacciones más altas por billetera</h2>
          <div class="summary-list" id="resumenFinal"></div>
        </div>
      </div>
    </main>
    <script src="../../../src/index.js"></script>
  </body>
</html>
 */}