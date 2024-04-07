import { useState } from "react";
import {
  Container,
} from "react-bootstrap";

import { CropEntry } from "./CropEntry";
import { CropTable } from "./CropTable";
import PropTypes from 'prop-types';
import { EmptyDataModalAlert } from "./EmptyDataModalAlert";

const CropForm = ({ cropList, setCropList }) => {

  const [editingIndex, setEditingIndex] = useState(null);
  const [cropData, setCropData] = useState({
    name: '',
    areaPerCrop: '',
    quantity: '',
    color: "#000000", // Default color
  });

  const [emptyDataFlag, setEmptyDataFlag] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCropData({
      ...cropData,
      [name]: value,
    });
  };

  // Función para validar que los campos no estén vacíos
  const validateFields = () => {
    return cropData.name !== '' && cropData.areaPerCrop !== '' && cropData.quantity !== '';
  };

  const handleAddOrUpdateCrop = () => {
    if (validateFields()) {
      if (editingIndex !== null) {
        // Update existing crop
        const updatedCropList = [...cropList];
        updatedCropList[editingIndex] = cropData;
        setCropList(updatedCropList);
        setEditingIndex(null);
      } else {
        // Add new crop
        setCropList([...cropList, cropData]);
      }
      // Reset form fields
      setCropData({
        name: '',
        areaPerCrop: '',
        quantity: '',
        color: "#000000", // Default color
      });
    } else {
      setEmptyDataFlag(true);
    }

  };

  return (
    <Container fluid className="justify-content-center align-items-center">
      {emptyDataFlag === true && (
        <EmptyDataModalAlert
          emptyDataFlag={emptyDataFlag}
          setEmptyDataFlag={setEmptyDataFlag}
        />
      )}
      <CropEntry
        cropList={cropList}
        setCropList={setCropList}
        editingIndex={editingIndex}
        cropData={cropData}
        setCropData={setCropData}
        handleInputChange={handleInputChange}
        handleAddOrUpdateCrop={handleAddOrUpdateCrop}
      />
      <CropTable
        cropList={cropList}
        setCropList={setCropList}
        setEditingIndex={setEditingIndex}
        setCropData={setCropData}
      />
    </Container>
  );
};

export default CropForm;

CropForm.propTypes = {
  cropList: PropTypes.array.isRequired,
  setCropList: PropTypes.func.isRequired,
};