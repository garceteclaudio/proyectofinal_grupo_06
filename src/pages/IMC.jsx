import React, { useState } from "react";
import '../stylesheets/IMC.css';
import BarChart from "../components/BarChart";
import Form from 'react-bootstrap/Form';

function IMC(){
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [resultado, setResultado] = useState('');
    const [estadisticasAbiertas, setEstadisticasAbiertas] = useState(false);
    const [historialPeso, setHistorialPeso] = useState ([]);
    const [mes, setMes] = useState ('');
    
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

        if (mes) {
            const nuevoHistorial = { label: mes, value: parseFloat(peso) };
    
            setHistorialPeso(prevHistorial => {
                const mesExistente = prevHistorial.find(item => item.label === mes);
                    
                if (mesExistente) {
                    return prevHistorial.map(item => item.label === mes ? { ...item, value: parseFloat(peso) } : item);
                } else {
                    return [...prevHistorial, nuevoHistorial];
                }
            });
        }

        setHistorialPeso(prevHistorial => {
            const mesesOrdenados = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            return [...prevHistorial].sort((a, b) => mesesOrdenados.indexOf(a.label) - mesesOrdenados.indexOf(b.label));
        });

        setResultado(
            `Paciente: ${nombre} ${apellido} \n` +
            `Tu IMC es: ${imc ? imc.toFixed(2) : "N/A"} \n` +
            `Observación: ${calculo}`
        );
    };

    return (
        <main className="d-flex flex-column justify-content-center align-items-center">
            <div className="IMC">
                <h1>Indice de Masa Corporal</h1>
            </div>

            <div className="background-container"></div>
            <div className="main-container">
                <div className="form-container">
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
                    <Form.Group className="mb-3">
                        <Form.Label>Mes: </Form.Label>
                        <Form.Select value={mes} onChange={(e) => setMes(e.target.value)}>
                            <option value="">Selecciona el mes</option>
                            <option value="Enero">Enero</option>
                            <option value="Febrero">Febrero</option>
                            <option value="Marzo">Marzo</option>
                            <option value="Abril">Abril</option>
                            <option value="Mayo">Mayo</option>
                            <option value="Junio">Junio</option>
                            <option value="Julio">Julio</option>
                            <option value="Agosto">Agosto</option>
                            <option value="Septiembre">Septiembre</option>
                            <option value="Octubre">Octubre</option>
                            <option value="Noviembre">Noviembre</option>
                            <option value="Diciembre">Diciembre</option>
                        </Form.Select>
                    </Form.Group>
                    <button type="button" className="btn btn-calcular w-100" onClick={calcularIMC}>Calcular IMC</button>
                    <div className="resultado mt-3 text-center">{resultado.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}</div>
                    <button type="button" className="btn btn-estadisticas mt-4" onClick={() => setEstadisticasAbiertas(!estadisticasAbiertas)}>
                        Ver Estadísticas
                    </button>
                </div>

                <div className={`estadisticas ${estadisticasAbiertas ? 'estadisticas-visible' : ''}`} >
                    <BarChart data={historialPeso} /> 
                </div>

                </div>
        </main>
    );
}
export default IMC;