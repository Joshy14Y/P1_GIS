import { Button, Card, Row, Col } from "react-bootstrap"
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';

const HORIZONTAL = 'horizontal';

export const HorizontallyCard = ({ setCut, activeAlert, setActiveAlert }) => {

  const onClickBtn = () => {
    setCut(HORIZONTAL);
    setActiveAlert(HORIZONTAL);
  }

  return (
    <Card style={{ width: '16rem' }}>
      <Card.Img variant="top" src="Corte_Horizontal.jpg" />
      <Card.Body>
        <Card.Title>Corte Horizontal</Card.Title>
        <Row>
          <Col sm className='mb-2 mt-2'>
            <Button variant="primary" onClick={ onClickBtn}>Usar</Button>
          </Col>
          <Col sm className='mb-2'>
            {activeAlert === HORIZONTAL && (
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

HorizontallyCard.propTypes = {
  setCut: PropTypes.func.isRequired,
  activeAlert: PropTypes.string.isRequired,
  setActiveAlert: PropTypes.func.isRequired
};