import { Button, Card, Row, Col } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';

const GRID = 'grid';

export const GridCard = ({ setCut, activeAlert, setActiveAlert }) => {

  const onClickBtn = () => {
    setCut(GRID);
    setActiveAlert(GRID);
  }

  return (
    <Card style={{ width: '16rem' }}>
      <Card.Img variant="top" src="Corte_en_Cuadricula.jpg" />
      <Card.Body>
        <Card.Title>Corte en Cuadrícula</Card.Title>
        <Row>
          <Col sm className='mb-2 mt-2'>
            <Button variant="primary" onClick={onClickBtn}>Usar</Button>
          </Col>
          <Col sm className='mb-2'>
            {activeAlert === GRID && (
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

GridCard.propTypes = {
  setCut: PropTypes.func.isRequired,
  activeAlert: PropTypes.string.isRequired,
  setActiveAlert: PropTypes.func.isRequired
};
