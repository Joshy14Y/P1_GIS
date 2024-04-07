
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export const OversizedAlert = ({ oversized, setOversized }) => {
    return (
        <>
            <Alert show={oversized} variant="danger">
                <Alert.Heading>Alerta</Alert.Heading>
                <p>
                    La superficie total de cultivo supera el tamaño de la parcela seleccionada.
                    Intente utilizar otra parcela o reducir el tamaño del cultivo.
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setOversized(false)} variant="outline-danger">
                        Cerrar
                    </Button>
                </div>
            </Alert>

            {!oversized && <Button onClick={() => setOversized(true)}>Show Alert</Button>}
        </>
    )
}

OversizedAlert.propTypes = {
    oversized: PropTypes.bool.isRequired,
    setOversized: PropTypes.func.isRequired,
};