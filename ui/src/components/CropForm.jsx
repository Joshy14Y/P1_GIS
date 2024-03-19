import { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Stack,
  Table,
  Pagination
} from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

const MAX_CROPS = 10; // Maximum number of crops to display

const CropEntry = ({ editingIndex, cropData, handleInputChange, handleAddOrUpdateCrop }) => {
  return (
    <Form className="my-3">
      <Row className="align-items-end justify-content-center">
        <Col xs={12} sm={6} md={2} className="text-center my-1">
          <Form.Group>
            <Form.Label>Nombre de Cultivo</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Zanahoria"
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
              name="area"
              placeholder="0"
              value={cropData.area}
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
              value={cropData.area * cropData.quantity}
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

const CropTable = ({ cropList, setCropList, setEditingIndex, setCropData }) => {

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
            <td>{crop.area}</td>
            <td>{crop.quantity}</td>
            <td>{crop.area * crop.quantity}</td>
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

const CropForm = () => {
  const [cropList, setCropList] = useState([]);
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
    <Container fluid className="m-0">
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
