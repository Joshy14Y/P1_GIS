
//const axios = require('axios');
import axios from 'axios';
// Define the base URL where your Express server is running
const baseURL = 'http://localhost:3000';

// Define a function to fetch parcelas
export async function getParcelas() {
  try {
    const response = await axios.get(`${baseURL}/parcelas`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching parcelas:', error.response.data);
    throw error;
  }
}

// Define a function to fetch horizontal cuts
async function getHorizontalCuts(geometry, cuts) {
  try {
    const response = await axios.get(`${baseURL}/horizontal-cuts`, {
      params: { geometry, cuts },
    });
    return response.data.horizontalCuts;
  } catch (error) {
    console.error('Error fetching horizontal cuts:', error.response.data);
    throw error;
  }
}

// Define a function to fetch vertical cuts
async function getVerticalCuts(geometry, cuts) {
  try {
    const response = await axios.get(`${baseURL}/vertical-cuts`, {
      params: { geometry, cuts },
    });
    return response.data.verticalCuts;
  } catch (error) {
    console.error('Error fetching vertical cuts:', error.response.data);
    throw error;
  }
}

// Define a function to fetch grid cuts
async function getGridCuts(geometry, cuts, cantidadxColumn) {
  try {
    const response = await axios.get(`${baseURL}/grid-cuts`, {
      params: { geometry, cuts, cantidadxColumn },
    });
    return response.data.gridCuts;
  } catch (error) {
    console.error('Error fetching grid cuts:', error.response.data);
    throw error;
  }

}

