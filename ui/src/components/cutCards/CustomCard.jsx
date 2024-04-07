import { Button, Card, Row, Col, Form } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import PropTypes from "prop-types";
import { useState } from "react";

const CUSTOM = "custom";
export const CustomCard = ({
  setCut,
  activeAlert,
  setActiveAlert,
  setAngle,
}) => {
  const [angleValue, setAngleValue] = useState(10);
  const [angleAlert, setAngleAlert] = useState(false);

  const onClickBtn = () => {
    if (angleValue === "") {
      setAngleAlert(true);
      return;
    } else {
      setAngleAlert(false);
    }
    setCut(CUSTOM);
    setActiveAlert(CUSTOM);
    setAngle(angleValue);
  };
  // Función para manejar cambios en el campo de entrada
  const handleChange = (event) => {
    let value = event.target.value;

    // Verificar que el valor esté dentro del rango permitido
    if (value < 0) {
      value = 0;
    } else if (value > 90) {
      value = 90;
    }

    setAngleValue(value);
  };
  return (
    <Card style={{ width: "16rem" }}>
      <Card.Img variant="top" src="Corte_Personalizado.jpg" />
      <Card.Body>
        <Card.Title>Corte Personalizado</Card.Title>
        <Form.Label htmlFor="inputAngle">
          Ingrese el número del angulo a elegir, debe estar entre 10 y 90.
        </Form.Label>
        <Form.Control
          type="number"
          id="inputAngle"
          value={angleValue} // Valor del campo de entrada
          onChange={handleChange} // Manejador de cambios
          min={10} // Valor mínimo permitido
          max={90} // Valor máximo permitido
          placeholder={angleValue}
        />
        <Row>
          <Col sm className="mb-2 mt-2">
            <Button variant="primary" onClick={onClickBtn}>
              Usar
            </Button>
          </Col>
          <Col sm className="mb-2">
            {angleAlert === true && (
              <Alert
                key="success"
                variant="danger"
                className="mt-2 ml-2"
                style={{ fontSize: "0.8rem" }}
              >
                !Ingrese el angulo!
              </Alert>
            )}
            {activeAlert === CUSTOM && (
              <Alert
                key="success"
                variant="success"
                className="mt-2 ml-2"
                style={{ fontSize: "0.8rem" }}
              >
                !Activo!
              </Alert>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

CustomCard.propTypes = {
  setCut: PropTypes.func.isRequired,
  activeAlert: PropTypes.string.isRequired,
  setActiveAlert: PropTypes.func.isRequired,
  setAngle: PropTypes.func.isRequired,
};
