

import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';

export const EmptyDataModalAlert = ({ emptyDataFlag, setEmptyDataFlag }) => {

    return (
        <Modal
            size="sm"
            show={emptyDataFlag}
            onHide={() => setEmptyDataFlag(false)}
            aria-labelledby="example-modal-sizes-title-sm"
            className="alert-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    ¡Alerta!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant="danger">
                    <p>Por favor, llene todos los campos.</p>
                </Alert>
            </Modal.Body>
        </Modal>
    )
}

EmptyDataModalAlert.propTypes = {
    emptyDataFlag: PropTypes.bool.isRequired,
    setEmptyDataFlag: PropTypes.func.isRequired,
};