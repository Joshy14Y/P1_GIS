
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
export async function getHorizontalCuts(geometry, cuts) {
  try {
    const url = `${baseURL}/horizontal-cuts?geometry=${geometry}&cuts=${JSON.stringify(cuts)}`;
    const response = await axios.get(url);
    console.log('response.data.horizontalCuts',response.data.horizontalCuts)
    return response.data.horizontalCuts;
  } catch (error) {
    console.error('Error fetching horizontal cuts:', error.response.data);
    throw error;
  }
}

// Define a function to fetch vertical cuts
export async function getVerticalCuts(geometry, cuts) {
  try {
    const url = `${baseURL}/vertical-cuts?geometry=${geometry}&cuts=${JSON.stringify(cuts)}`;
    const response = await axios.get(url);
    console.log('response.data.verticalCuts',response.data.verticalCuts)
    return response.data.verticalCuts;
  } catch (error) {
    console.error('Error fetching vertical cuts:', error.response.data);
    throw error;
  }
}

// Define a function to fetch grid cuts
export async function getGridCuts(geometry, cuts, cantidadxColumn) {
  try {
    const url = `${baseURL}/grid-cuts?geometry=${geometry}&cuts=${JSON.stringify(cuts)}&cantidadxColumn=${cantidadxColumn}`;
    const response = await axios.get(url);
    console.log('response.data.gridCuts',response.data.gridCuts)
    return response.data.gridCuts;
  } catch (error) {
    console.error('Error fetching grid cuts:', error.response.data);
    throw error;
  }
}

// Define a function to fetch grid cuts
export async function getCustomCuts(geometry, cuts, rotation) {
  try {
    const url = `${baseURL}/rotated-cuts?geometry=${geometry}&cuts=${JSON.stringify(cuts)}&rotation=${rotation}`;
    const response = await axios.get(url);
    console.log('response.data.rotatedCuts',response.data.rotatedCuts)
    return response.data.rotatedCuts;
  } catch (error) {
    console.error('Error fetching custom cuts:', error.response.data);
    throw error;
  }
}
