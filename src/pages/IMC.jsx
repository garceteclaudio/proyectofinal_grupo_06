import React, { useState } from "react";
import '../stylesheets/IMC.css';

function IMC(){
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [resultado, setResultado] = useState('');
    
    const calcularIMC = () => {
        let calculo;
        let imc;
        
        if (!nombre) {
            calculo = "Campo nombre obligatorio";
            imc = null;
        } else if (peso < 3 || altura < 0.3) {
            calculo = "Peso y altura incorrectos";
             imc = null;
        } else {
             imc = peso / (altura * altura);
             if (imc < 18.5) {
             calculo = "Estás delgado/a.";
            } else if (imc >= 18.5 && imc < 24.9) {
                calculo = "Estás en el peso ideal.";
            } else if (imc >= 25 && imc < 29.9) {
                calculo = "Tienes sobrepeso.";
            } else if (imc > 29.9) {
                calculo = "Tienes obesidad. Haz dieta.";
            }
    }

        setResultado(
            `Paciente: ${nombre} ${apellido} \n` +
            `Tu IMC es: ${imc ? imc.toFixed(2) : "N/A"} \n` +
            `Observación: ${calculo}`
        );
    };

    return(
        <main className="d-flex flex-column justify-content-center align-items-center">
            <div className="form-container w-50 mt-n3 formulario">
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        className="form-control"
                        value={nombre}
                     onChange={(e) => setNombre(e.target.value)}
                    />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="apellido" className="form-label">Apellido:</label>
                        <input
                            type="text"
                            id="apellido"
                            className="form-control"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="peso" className="form-label">Peso (kg):</label>
                        <input
                            type="number"
                            id="peso"
                            className="form-control"
                            placeholder="Use punto en vez de coma"
                            value={peso}
                            onChange={(e) => setPeso(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="altura" className="form-label">Altura (m):</label>
                        <input
                            type="number"
                            id="altura"
                            className="form-control"
                            placeholder="Use punto en vez de coma"
                            value={altura}
                            onChange={(e) => setAltura(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-dark w-100"
                        onClick={calcularIMC}
                    >Calcular IMC</button>
                <div className="resultado mt-3 text-center">{resultado.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                ))}</div>
            </div>
        </main>
    );
}
export default IMC;