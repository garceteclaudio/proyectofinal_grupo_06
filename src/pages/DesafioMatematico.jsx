import React, { useState, useEffect } from 'react';
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
    const [dificultadSeleccionada, setDificultadSeleccionada] = useState(false);

    const generarProblema = () => {
        //TERMINAR EL JUEGO UNA VEZ TERMINADO EL QUINTO DESAFÍO
        if (desafio > 5) {
            setJuegoTerminado(true);
            return;
        }

        let newNum1, newNum2, newOperacion, correctAnswer;

        switch (dificultad) {
            //GENERAR DESAFÍOS EN BASE A LA DIFICULTAD SELECCIONADA
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
                newNum2 = Math.floor(Math.random() * 10) + 1;
                newOperacion = Math.random() > 0.5 ? '×' : '÷';
                if (newOperacion === '×') {
                    newNum1 = Math.floor(Math.random() * 11);
                    correctAnswer = newNum1 * newNum2;
                } else {
                    newNum1 = newNum2 * Math.floor(Math.random() * 11);
                    correctAnswer = newNum1 / newNum2;
                }
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

        //COMPARA LA RESPUESTA INGRESADA CON LA CORRECTA
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

    const reiniciarJuego = () => {
        setNumero1(0);
        setNumero2(0);
        setOperacion('+');
        setRespuesta('');
        setRespuestaCorrecta(0);
        setPuntaje(0);
        setMensaje('');
        setDesafio(1);
        setJuegoTerminado(false);
        setDificultad('basico');
        setDificultadSeleccionada(false);
    };

    useEffect(() => {
        if (dificultadSeleccionada) generarProblema();
    }, [desafio, dificultad]);

    return (
        <div className='challenge-container'>
            {/* FONDO */}
            <div className='challenge-pokemons'>
                <div className="gyarados"></div>
                <div className="altaria"></div>
                <div className="emolga"></div>
                <div className="volcarona"></div>
                <div className="lugia"></div>
                <div className="espeon"></div>
                <div className="umbreon"></div>
                <div className="sylveon"></div>
                <div className="meloetta"></div>
                <div className="tyranitar"></div>
                <div className="tyrantrum"></div>
                <div className="lapras"></div>
                <div className="froakie"></div>
                <div className="gengar"></div>
                <div className="pikachu"></div>
            </div>
            <div className='challenge-effect'></div>
            <div className='challenge-box'>
                {!dificultadSeleccionada ? (
                    <div className="difficulty-box">
                        {/* CONTENEDOR DEL SELECTOR DE DIFICULTAD */}
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
                            {/* CONTENEDOR DEL PUNTAJE FINAL */}
                            <h1>Juego Terminado.</h1>
                            <h2>Puntaje final: {puntaje}</h2>
                            <button onClick={reiniciarJuego}>Volver a Jugar</button>
                        </div>
                    ) : (
                        <div className="scoring-box">
                            {/* CONTENEDOR DE LOS DESAFÍOS MATEMÁTICOS */}
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
