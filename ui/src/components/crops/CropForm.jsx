import { useState } from "react";
import {
  Container,
} from "react-bootstrap";


import { CropEntry } from "./CropEntry";
import { CropTable } from "./CropTable";

import PropTypes from 'prop-types';

const CropForm = ({ cropList, setCropList }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [cropData, setCropData] = useState({
    name: "",
    area: "",
    quantity: "",
    color: "#000000", // Default color
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCropData({
      ...cropData,
      [name]: value,
    });
  };

  const handleAddOrUpdateCrop = () => {
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
      name: "",
      area: "",
      quantity: "",
      color: "#000000",
    });
  };
  
  return (
    <Container fluid className="justify-content-center align-items-center">
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