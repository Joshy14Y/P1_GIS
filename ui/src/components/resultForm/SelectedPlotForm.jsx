



import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const SelectedPlotForm = ({ selectedPlot,selectedPlotIndex }) => {

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Row >
                    <Col className="text-center my-1">
                        <Form.Label>Numero de parcela</Form.Label>
                        <Form.Control type="text" disabled value={selectedPlotIndex !== -1 ?selectedPlot.id: 0} />
                        <Form.Label>Area</Form.Label>
                        <Form.Control type="text" disabled value={selectedPlotIndex !== -1 ?`${selectedPlot.area}m²`: 0} />
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

SelectedPlotForm.propTypes = {
    selectedPlot: PropTypes.object,
    selectedPlotIndex: PropTypes.number.isRequired,
};