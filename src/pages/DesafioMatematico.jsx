import { useState, useEffect } from 'react';
import "../stylesheets/DesafioMatematico.css";

function DesafioMatematico() {
    const [num1, setNumero1] = useState(0);
    const [num2, setNumero2] = useState(0);
    const [operacion, setOperacion] = useState('+');
    const [respuesta, setRespuesta] = useState('');
    const [respuestaCorrecta, setRespuestaCorrecta] = useState(0);
    const [puntaje, setPuntaje] = useState(0);
    const [mensaje, setMensaje] = useState('');
    const [desafio, setDesafio] = useState(1);
    const [juegoTerminado, setJuegoTerminado] = useState(false);
    const [dificultad, setDificultad] = useState('basico');
    const [dificultadSeleccionada, setDificultadSeleccionada] = useState(false); // Nuevo estado para seleccionar dificultad

    const generarProblema = () => {
        if (desafio > 5) {
            setJuegoTerminado(true);
            return;
        }

        let newNum1, newNum2, newOperacion, correctAnswer;

        switch (dificultad) {
            case 'basico':
                newNum1 = Math.floor(Math.random() * 11);
                newNum2 = Math.floor(Math.random() * 11);
                newOperacion = Math.random() > 0.5 ? '+' : '-';
                if (newOperacion === '-' && newNum2 > newNum1) {
                    [newNum1, newNum2] = [newNum2, newNum1];
                }
                correctAnswer = newOperacion === '+' ? newNum1 + newNum2 : newNum1 - newNum2;
                break;
            case 'intermedio':
                newNum1 = Math.floor(Math.random() * 11);
                newNum2 = Math.floor(Math.random() * 11) + 1;
                newOperacion = Math.random() > 0.5 ? '×' : '÷';
                correctAnswer = newOperacion === '×' ? newNum1 * newNum2 : Math.floor(newNum1 / newNum2);
                break;
            case 'avanzado':
                const decimalNum1 = (Math.random() * 10).toFixed(1);
                const decimalNum2 = (Math.random() * 10).toFixed(1);
                newOperacion = Math.random() > 0.5 ? '×' : '+';
                correctAnswer = newOperacion === '×' ? (decimalNum1 * decimalNum2).toFixed(1) : (parseFloat(decimalNum1) + parseFloat(decimalNum2)).toFixed(1);
                newNum1 = decimalNum1;
                newNum2 = decimalNum2;
                break;
            default:
                break;
        }

        setNumero1(newNum1);
        setNumero2(newNum2);
        setOperacion(newOperacion);
        setRespuestaCorrecta(correctAnswer);
        setRespuesta('');
        setMensaje('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (parseFloat(respuesta) === parseFloat(respuestaCorrecta)) {
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
        if (dificultadSeleccionada) generarProblema();
    }, [desafio, dificultad]);

    return (
        <div className='challenge-container'>
            <div className='challenge-pokemons'>
                <div class="gyarados"></div>
                <div class="altaria"></div>
                <div class="emolga"></div>
                <div class="volcarona"></div>
                <div class="lugia"></div>
                <div class="espeon"></div>
                <div class="umbreon"></div>
                <div class="sylveon"></div>
                <div class="meloetta"></div>
                <div class="tyranitar"></div>
                <div class="tyrantrum"></div>
                <div class="lapras"></div>
                <div class="froakie"></div>
                <div class="gengar"></div>
                <div class="pikachu"></div>
            </div>
            <div className='challenge-effect'></div>
            <div className='challenge-box'>
                {!dificultadSeleccionada ? (
                    <div className="difficulty-box">
                        <h1>Selecciona la Dificultad</h1>
                        <div className='difficulty-setter'>
                            <button className='button-easy' onClick={() => { setDificultad('basico'); setDificultadSeleccionada(true); }}>
                                Básico
                            </button>
                            <button className='button-intermediate' onClick={() => { setDificultad('intermedio'); setDificultadSeleccionada(true); }}>
                                Intermedio
                            </button>
                            <button className='button-hard' onClick={() => { setDificultad('avanzado'); setDificultadSeleccionada(true); }}>
                                Avanzado
                            </button>
                        </div>
                    </div>
                ) : (
                    juegoTerminado ? (
                        <div className='results-box'>
                            <h1 id='juegoTerminado-titulo'>Juego Terminado.</h1>
                            <h2>Puntaje final: {puntaje}</h2>
                        </div>
                    ) : (
                        <div className="scoring-box">
                            <h1>Desafío Matemático ({desafio}/5)</h1>
                            <div className='scoring-setter'>
                            <h2 id="numbers">
                                {num1} {operacion} {num2}
                            </h2>
                            <div className='scoring-form'>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="number"
                                    value={respuesta}
                                    onChange={(e) => setRespuesta(e.target.value)}
                                    placeholder="Tu respuesta..."
                                    disabled={mensaje !== ''}
                                />
                                <button type="submit" disabled={mensaje !== ''}>Comprobar</button>
                            </form>
                            </div>
                            <p>{mensaje}</p>
                            {mensaje && (
                                <button onClick={siguienteDesafio}>
                                    {desafio < 5 ? 'Siguiente desafío' : 'Ver resultado final'}
                                </button>
                            )}
                            <p>Puntaje: {puntaje}</p>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default DesafioMatematico;
