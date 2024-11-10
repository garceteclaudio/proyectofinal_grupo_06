import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import avatarClaudio from '/resources/images/aboutUs/avatar-clau.jpeg';
import avatarMurillo from '/resources/images/aboutUs/avatar-murillo.png';
import avatarYani from '/resources/images/aboutUs/avatar-yani.jpeg';

function AboutUs({ developers }) {
  const avatars = {
    1: avatarClaudio,
    2: avatarMurillo,
    3: avatarYani,
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">GRUPO 6: Desarrolladores de la materia fundamentos de programación web.</h1>
      <Row>
        {developers.map((dev) => (
          <Col md={4} key={dev.id}>
            <Card>
              <Card.Img variant="top" src={avatars[dev.id]} alt={`Avatar ${dev.name}`} />
              <Card.Body>
                <Card.Title>{dev.name}</Card.Title>
                <Card.Text>{dev.description}</Card.Text>
                <Card.Text>
                  <a href={dev.repository} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AboutUs;
