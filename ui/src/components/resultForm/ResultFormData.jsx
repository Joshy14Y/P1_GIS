

import Form from 'react-bootstrap/Form';
import { Button, Row, Col } from 'react-bootstrap';

export const ResultFormData = () => {

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Row>
                    <Col className="text-center my-1">
                        <Form.Label>Tamaño del terreno</Form.Label>
                        <Form.Control type="text" disabled value={"sad"} />
                    </Col>
                    <Col className="text-center my-1">
                        <Form.Label>Tamaño total de los cultivos</Form.Label>
                        <Form.Control type="text" disabled value={"sad"} />
                    </Col>
                </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                {/* Generar un row por cultivo con sus datos */}
                <Row>
                    <Col className="text-center my-1">
                        <Form.Label>Cultivo</Form.Label>
                        <Form.Control type="text" disabled value={"sad"} />
                    </Col>
                    <Col className="text-center my-1">
                        <Form.Label>Area total</Form.Label>
                        <Form.Control type="text" disabled value={"sad"} />
                    </Col>
                    <Col className="text-center my-1">
                        <Form.Label>Color</Form.Label>
                        <Form.Control className="mx-auto w-100" type="color" name="color" disabled value={"sad"} />
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )

}

