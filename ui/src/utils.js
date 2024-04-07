import { getHorizontalCuts, getVerticalCuts, getGridCuts, getCustomCuts } from "./client/client";


export const horizontalCuts = async (geometry, cuts) => {
    try {
        const result = await getHorizontalCuts(geometry, cuts);
        console.log('result', result);
        //guardar resultado en el state
        return result
    } catch (error) {
        console.log('Error al intentar ejecutar funcion de cortes horizontales.', error)
    }
}

export const verticalCuts = async (geometry, cuts) => {
    try {
        const result = await getVerticalCuts(geometry, cuts);
        console.log('result', result);
        //guardar resultado en el state
        return result
    } catch (error) {
        console.log('Error al intentar ejecutar funcion de cortes horizontales.', error)
    }
}

export const gridCuts = async (geometry, cuts, cantidadxColumn) => {
    try {
        const result = await getGridCuts(geometry, cuts, cantidadxColumn);
        console.log('result', result);
        //guardar resultado en el state
        return result
    } catch (error) {
        console.log('Error al intentar ejecutar funcion de cortes horizontales.', error)
    }
}

export const customCuts = async (geometry, cuts, rotation) => {
    try {
        const result = await getCustomCuts(geometry, cuts, rotation);
        console.log('result', result);
        return result
    } catch (error) {
        console.log('Error al intentar ejecutar funcion de cortes horizontales.', error)
    }
}


