import { Button, Col, Form, Row } from "react-bootstrap";
import PropTypes from 'prop-types';

export const CropEntry = ({ editingIndex, cropData, handleInputChange, handleAddOrUpdateCrop }) => {

    
    return (
        <Form className="my-3">
            <Row className="align-items-end justify-content-center">
                <Col xs={12} sm={6} md={2} className="text-center my-1">
                    <Form.Group>
                        <Form.Label>Nombre del Cultivo</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Nombre del cultivo"
                            value={cropData.name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
                <Col xs={12} sm={6} md={2} className="text-center my-1">
                    <Form.Group>
                        <Form.Label>Area por Cultivo</Form.Label>
                        <Form.Control
                            type="number"
                            name="areaPerCrop"
                            placeholder="0"
                            value={cropData.areaPerCrop}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
                <Col xs={12} sm={6} md={2} className="text-center my-1">
                    <Form.Group>
                        <Form.Label>Cantidad de Cultivo</Form.Label>
                        <Form.Control
                            type="number"
                            name="quantity"
                            placeholder="0"
                            value={cropData.quantity}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
                <Col xs={12} sm={6} md={2} className="text-center my-1">
                    <Form.Group>
                        <Form.Label>Área Total</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="0"
                            value={cropData.areaPerCrop * cropData.quantity}
                            onChange={handleInputChange}
                            disabled
                        />
                    </Form.Group>
                </Col>
                <Col xs={12} sm={6} md={2} className="text-center my-1">
                    <Form.Group className="text-center">
                        <Form.Label>Color de Área</Form.Label>
                        <Form.Control
                            className="mx-auto w-100"
                            type="color"
                            name="color"
                            value={cropData.color}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
                <Col xs={12} sm={6} className="text-center my-1" >
                    <Button variant="success" onClick={handleAddOrUpdateCrop}>
                        {editingIndex !== null ? "Actualizar" : "Agregar"}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

CropEntry.propTypes = {
    editingIndex: PropTypes.number,
    cropData: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleAddOrUpdateCrop: PropTypes.func.isRequired
};