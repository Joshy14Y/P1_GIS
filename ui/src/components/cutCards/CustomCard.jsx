

import { Button, Card, Row, Col,Form } from "react-bootstrap"
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import { useState } from "react";

const CUSTOM = 'custom';
export const CustomCard = ({ setCut, activeAlert, setActiveAlert, setAngle }) => {

  const [angleValue, setAngleValue] = useState('');

  const onClickBtn = () => {
    setCut(CUSTOM);
    setActiveAlert(CUSTOM);
    setAngle(angleValue)
  }
  // Función para manejar cambios en el campo de entrada
  const handleChange = (event) => {
    setAngleValue(event.target.value);
  }
  return (
    <Card style={{ width: '16rem' }}>
      <Card.Img variant="top" src="Corte_Horizontal.jpg" />
      <Card.Body>
        <Card.Title>Corte Personalizado</Card.Title>
        <Form.Label htmlFor="inputAngle">Ingrese el número del angulo a elegir.</Form.Label>
        <Form.Control
          type="number"
          id="inputAngle"
          aria-describedby="passwordHelpBlock"
          value={angleValue} // Valor del campo de entrada
          onChange={handleChange} // Manejador de cambios
        />
        <Row>
          <Col sm className='mb-2 mt-2'>
            <Button variant="primary" onClick={onClickBtn}>Usar</Button>
          </Col>
          <Col sm className='mb-2'>
            {activeAlert === CUSTOM && (
              <Alert key="success" variant="success" className="mt-2 ml-2" style={{ fontSize: '0.8rem' }}>
                !Activo!
              </Alert>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

CustomCard.propTypes = {
  setCut: PropTypes.func.isRequired,
  activeAlert: PropTypes.string.isRequired,
  setActiveAlert: PropTypes.func.isRequired,
  setAngle: PropTypes.func.isRequired,
};