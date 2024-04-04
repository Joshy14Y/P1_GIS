import { Button, Card, Row, Col } from "react-bootstrap"
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';

const VERTICAL = 'vertical';

export const VerticalCard = ({ setCut, activeAlert, setActiveAlert }) => {

  const onClickBtn = () => {
    setCut(VERTICAL);
    setActiveAlert(VERTICAL);
  }

  return (
    <Card style={{ width: '16rem' }}>
      <Card.Img variant="top" src="Corte_Vertical.jpg" />
      <Card.Body>
        <Card.Title>Corte Vertical</Card.Title>
        <Row>
          <Col sm className='mb-2 mt-2'>
            <Button variant="primary" onClick={onClickBtn}>Usar</Button>
          </Col>
          <Col sm className='mb-2'>
            {activeAlert === VERTICAL && (
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

VerticalCard.propTypes = {
  setCut: PropTypes.func.isRequired,
  activeAlert: PropTypes.string.isRequired,
  setActiveAlert: PropTypes.func.isRequired
};