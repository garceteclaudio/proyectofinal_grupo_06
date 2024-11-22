import React, { useState } from "react";
import '../stylesheets/IndiceDeMasaCorporal.css';
import BarChart from "../components/BarChart";
import Form from 'react-bootstrap/Form';

function IndiceDeMasaCorporal() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [resultado, setResultado] = useState([]);
    const [estadisticasAbiertas, setEstadisticasAbiertas] = useState(false);
    const [historialPeso, setHistorialPeso] = useState([]);
    const [mes, setMes] = useState('');

    const calcularIMC = () => {
        let calculo = '';
        let imc = null;
    
        const pesoNum = parseFloat(peso);
        const alturaNum = parseFloat(altura);
    
        if (!nombre) {
            calculo = "Campo nombre obligatorio";
        } else if (isNaN(pesoNum) || isNaN(alturaNum)) {
            calculo = "Peso y altura deben ser números válidos";
        } else if (pesoNum <= 0 || alturaNum <= 0) {
            calculo = "Peso y altura deben ser mayores a cero";
        } else if (pesoNum > 300) {
            calculo = "Peso inválido - debe ingresar 300 kilos o menos";
        } else if (alturaNum > 3) {
            calculo = "Dato incorrecto - debe ingresar altura menor a 3 metros";
        } else {
            // Cálculo del IMC
            imc = pesoNum / (alturaNum * alturaNum);
            if (imc < 18.5) {
                calculo = "Estás delgado/a.";
            } else if (imc >= 18.5 && imc < 25) {
                calculo = "Estás en el peso ideal.";
            } else if (imc >= 25 && imc < 30) {
                calculo = "Tienes sobrepeso.";
            } else {
                calculo = "Tienes obesidad. Haz dieta.";
            }
        }
    
        // Crear un historial si el mes está especificado
        if (mes && imc) {
            const nuevoHistorial = { label: mes, value: pesoNum };
    
            setHistorialPeso(prevHistorial => {
                const mesExistente = prevHistorial.find(item => item.label === mes);
    
                // Actualizar el mes existente o agregar uno nuevo
                if (mesExistente) {
                    return prevHistorial.map(item =>
                        item.label === mes ? { ...item, value: pesoNum } : item
                    );
                } else {
                    return [...prevHistorial, nuevoHistorial];
                }
            });
    
            // Ordenar el historial por los meses
            setHistorialPeso(prevHistorial => {
                const mesesOrdenados = [
                    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
                ];
                return [...prevHistorial].sort(
                    (a, b) => mesesOrdenados.indexOf(a.label) - mesesOrdenados.indexOf(b.label)
                );
            });
        }
    
        // Construir las líneas del resultado
        const lines = [`Paciente: ${nombre} ${apellido}`];
        if (imc !== null && imc !== undefined) {
            lines.push(`Tu IMC es: ${imc.toFixed(2)}`);
        }
        lines.push(`Observación: ${calculo}`);
    
        setResultado(lines);
    };
    

    return (
        <div className="imc-container">
            <div className="background-container"></div>
            <div className="imc-title">
                <h1>Indice de Masa Corporal</h1>
            </div>
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
                    <div className="resultado">
                        {resultado.map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>
                    <button type="button" className="btn btn-estadisticas" onClick={() => setEstadisticasAbiertas(!estadisticasAbiertas)}>
                        Ver Estadísticas
                    </button>
                </div>

                <div className={`estadisticas ${estadisticasAbiertas ? 'estadisticas-visible' : ''}`} >
                    <BarChart data={historialPeso} />
                </div>
            </div>
        </div>
    );
}

export default IndiceDeMasaCorporal;
