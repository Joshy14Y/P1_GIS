
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
export const UndefinedAlert = ({ undefinedFlag, setUndefinedFlag }) => {
    return (
        <>
            <Alert show={undefinedFlag} variant="danger">
                <Alert.Heading>Alerta</Alert.Heading>
                <p>
                    Resultado indefinido, el sistema no ha podido procesar la información.
                    Intente reducir el tamaño de las parcelas.
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setUndefinedFlag(false)} variant="outline-danger">
                        Cerrar
                    </Button>
                </div>
            </Alert>

            {!undefinedFlag && <Button onClick={() => setUndefinedFlag(true)}>Show Alert</Button>}
        </>
    )
}
UndefinedAlert.propTypes = {
    undefinedFlag: PropTypes.bool.isRequired,
    setUndefinedFlag: PropTypes.func.isRequired,
};