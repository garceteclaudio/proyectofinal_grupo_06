import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DesafioMatematico from "../src/pages/DesafioMatematico.jsx";
import "@testing-library/jest-dom";

describe("Componente DesafioMatematico", () => {
  test("Las variables de estado inicial están configuradas correctamente", () => {
    render(<DesafioMatematico />);

    expect(screen.getByText("Selecciona la Dificultad")).toBeInTheDocument();
    expect(screen.queryByText("Desafío Matemático")).not.toBeInTheDocument();
    expect(screen.queryByText("Juego Terminado")).not.toBeInTheDocument();
  });

  test("Seleccionar la dificultad actualiza el estado correctamente", () => {
    render(<DesafioMatematico />);

    fireEvent.click(screen.getByText("Básico"));
    expect(screen.getByText("Desafío Matemático (1/5)")).toBeInTheDocument();
  });
});
