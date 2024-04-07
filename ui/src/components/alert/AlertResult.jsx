
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
export const AlertResult = ({ missingDataFlag, setMissingDataFlag }) => {
    return (
        <>
            <Alert show={missingDataFlag} variant="warning">
                <Alert.Heading>Alerta</Alert.Heading>
                <p>
                    Datos incompletos, por favor llene todos los campos necesarios para generar el resultado.
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setMissingDataFlag(false)} variant="outline-warning">
                        Cerrar
                    </Button>
                </div>
            </Alert>

            {!missingDataFlag && <Button onClick={() => setMissingDataFlag(true)}>Show Alert</Button>}
        </>
    )
}
AlertResult.propTypes = {
    missingDataFlag: PropTypes.bool.isRequired,
    setMissingDataFlag: PropTypes.func.isRequired,
};