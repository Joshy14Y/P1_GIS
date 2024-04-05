import { Button, Stack, Table } from "react-bootstrap";

import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import PropTypes from 'prop-types';

export const CropTable = ({ cropList, setCropList, setEditingIndex, setCropData }) => {

    const handleEditCrop = (index) => {
        // Set editing index and populate the form with the crop data
        setEditingIndex(index);
        const cropToEdit = cropList[index];
        setCropData(cropToEdit); // Populate form with crop data
    };

    const handleDeleteCrop = (index) => {
        // Remove the crop from the list
        const updatedCropList = [...cropList];
        updatedCropList.splice(index, 1);
        setCropList(updatedCropList);
    };

    return (
        <Table striped bordered hover responsive className="text-center align-middle my-3">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Área</th>
                    <th>Cantidad</th>
                    <th>Área Total</th>
                    <th>Color</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {cropList.map((crop, index) => (
                    <tr key={index}>
                        <td>{crop.name}</td>
                        <td>{crop.areaPerCrop}</td>
                        <td>{crop.quantity}</td>
                        <td>{crop.areaPerCrop * crop.quantity}</td>
                        <td>
                            <div
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    backgroundColor: crop.color,
                                    margin: "auto", // Center the div horizontally
                                }}
                            ></div>
                        </td>
                        <td>
                            <Stack direction="horizontal" className="justify-content-center">
                                <Button size="sm" variant="primary" className="mx-1" onClick={() => handleEditCrop(index)}>
                                    <FiEdit />
                                </Button>
                                <Button size="sm" variant="danger" className="mx-1" onClick={() => handleDeleteCrop(index)}>
                                    <MdDeleteForever />
                                </Button>
                            </Stack>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

CropTable.propTypes = {
    cropList: PropTypes.array.isRequired,
    setCropList: PropTypes.func.isRequired,
    setEditingIndex: PropTypes.func.isRequired,
    setCropData: PropTypes.func.isRequired
};