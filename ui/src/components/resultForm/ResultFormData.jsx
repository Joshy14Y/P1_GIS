

import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const ResultFormData = ({ selectedPlot, cut, cropList, responseData, totalCropsArea, splitList }) => {

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Row>
                    <Col className="text-center my-1">
                        <Form.Label>Tamaño del terreno seleccionado</Form.Label>
                        <Form.Control type="text" disabled value={selectedPlot.area} />
                    </Col>
                    <Col className="text-center my-1">
                        <Form.Label>Suma del area de los cultivos</Form.Label>
                        <Form.Control type="text" disabled value={totalCropsArea} />
                    </Col>
                    <Col className="text-center my-1">
                        <Form.Label>Tipo de Corte seleccionado</Form.Label>
                        <Form.Control type="text" disabled value={cut} />
                    </Col>
                </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                {cropList.map((crop, index) => (
                    <Row key={index}>
                        <Col className="text-center my-1">
                            <Form.Label>Cultivo</Form.Label>
                            <Form.Control type="text" disabled value={crop.name} />
                        </Col>
                        <Col className="text-center my-1">
                            <Form.Label>Area total</Form.Label>
                            <Form.Control type="text" disabled value={crop.areaPerCrop * crop.quantity} />
                        </Col>
                        <Col className="text-center my-1">
                            <Form.Label>Area Asignada</Form.Label>
                            <Form.Control type="text" disabled value={responseData[index].area.toFixed(2)} />
                        </Col>
                        <Col className="text-center my-1">
                            <Form.Label>Color</Form.Label>
                            <Form.Control className="mx-auto w-100" type="color" name="color" disabled value={crop.color} />
                        </Col>
                    </Row>
                ))}
            </Form.Group>
        </Form>
    )
}

ResultFormData.propTypes = {
    cropList: PropTypes.array.isRequired,
    selectedPlot: PropTypes.object.isRequired,
    cut: PropTypes.string.isRequired,
    responseData: PropTypes.array.isRequired,
    totalCropsArea: PropTypes.number.isRequired,
    splitList: PropTypes.array.isRequired,
};