import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [num1, setNumero1] = useState(0);
  const [num2, setNumero2] = useState(0);
  const [operacion, setOperacion] = useState('+');
  const [respuesta, setRespuesta] = useState('');
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [mensaje, setMensaje] = useState('');
  const [desafio, setDesafio] = useState(1);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  const generarProblema = () => {
    if (desafio > 5) {
      setJuegoTerminado(true);
      return;
    }

    // Generar números entre 0 y 10
    let newNum1 = Math.floor(Math.random() * 11);
    let newNum2 = Math.floor(Math.random() * 11);
    const newOperacion = Math.random() > 0.5 ? '+' : '-';

    // Si es una resta, asegurarse de que num1 >= num2
    if (newOperacion === '-' && newNum2 > newNum1) {
      [newNum1, newNum2] = [newNum2, newNum1]; // Intercambiar valores
    }

    setNumero1(newNum1);
    setNumero2(newNum2);
    setOperacion(newOperacion);
    setRespuestaCorrecta(newOperacion === '+' ? newNum1 + newNum2 : newNum1 - newNum2);
    setRespuesta('');
    setMensaje('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (parseInt(respuesta) === respuestaCorrecta) {
      setMensaje('¡Correcto!');
      setPuntaje(puntaje + 1);
    } else {
      setMensaje(`Incorrecto. La respuesta correcta es ${respuestaCorrecta}`);
    }
  };

  const siguienteDesafio = () => {
    setDesafio(desafio + 1);
    generarProblema();
  };

  useEffect(() => {
    generarProblema();
  }, [desafio]);

  if (juegoTerminado) {
    return (
      <div className="App">
        <h1>Juego Terminado</h1>
        <p>Puntaje final: {puntaje}</p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Desafío Matemático ({desafio}/5)</h1>
      <p id="numbers">
        {num1} {operacion} {num2}
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          placeholder="Tu respuesta"
          disabled={mensaje !== ''}
        />
        <button type="submit" disabled={mensaje !== ''}>Comprobar</button>
      </form>
      <p>{mensaje}</p>
      {mensaje && (
        <button onClick={siguienteDesafio}>
          {desafio < 5 ? 'Siguiente desafío' : 'Ver resultado final'}
        </button>
      )}
      <p>Puntaje: {puntaje}</p>
    </div>
  );
}

export default App;
