import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DesafioMatematico from "../../src/pages/DesafioMatematico";
import "@testing-library/jest-dom";

describe("DesafioMatematico Component", () => {
  test("Deberia mostrarse correctamente el titulo y la puntuacion inicial.", () => {
    render(<DesafioMatematico />);
    expect(screen.getByText(/Desafío Matemático \(1\/5\)/)).toBeInTheDocument();
    expect(screen.getByText(/Puntaje: 0/)).toBeInTheDocument();
  });

  test("Deberia terminar el juego despues de 5 desafios.", () => {
    render(<DesafioMatematico />);

    // Completar los 5 desafios
    for (let i = 0; i < 5; i++) {
      const submitButton = screen.getByText("Comprobar");
      fireEvent.click(submitButton);
      fireEvent.click(
        screen.getByText(/Siguiente desafío|Ver resultado final/)
      );
    }

    // Comprueba que se muestra la pantalla de fin del juego
    expect(screen.getByText("Juego Terminado.")).toBeInTheDocument();
  });
});
