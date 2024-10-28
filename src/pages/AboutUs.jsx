import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import avatarClaudio from '../../images/avatar-clau.png';
import avatarMurillo from '../../images/avatar-murillo.png';
import avatarYani from '../../images/avatar-yani.jpeg';

function AboutUs() {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">GRUPO 6: Desarrolladores de la materia fundamentos de programación web.</h1>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={avatarClaudio} alt="Avatar Claudio" />
            <Card.Body>
              <Card.Title>Garcete Claudio Rodolfo</Card.Title>
              <Card.Text>
                Estudiante TUDIVJ, ubicado en Barrio Malvinas, tengo 2 mascotas,
                  Tokyo y Bigote. Me gusta hacer musculación y comer en el Lolo
                  Pulus.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={avatarMurillo} alt="Avatar Murillo" />
            <Card.Body>
              <Card.Title>Murillo Jose Omar</Card.Title>
              <Card.Text>
                Actualmente estudiante de TUDIVJ en la UNJU. Generalmente suelo
                  perder el tiempo en la computadora, aunque a veces lo aprovecho
                  trabajando.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={avatarYani} alt="Avatar Yani" />
            <Card.Body>
              <Card.Title>Gonzalez Yanina </Card.Title>
              <Card.Text>
                Estudiante de la TUDIVJ. Me gusta mucho la música, aparte de
                estudiar también toco la guitarra y estoy en un grupo de baile.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUs;
