
import { useEffect, useState } from 'react';
import CropForm from '../components/CropForm.jsx';
import { getParcelas } from '../client/client.js'
export default function MainPage() {

    const [cropList, setcropList] = useState([]);

    const getPlots = async () => {
        await getParcelas()
            .then((res) => {
                console.log('res', res);
            })
            .catch((err) => {
                console.log('Error al obtener las parcelas. ', err);
            })
    }

    const addCrop = (crop) => {
        setcropList([...cropList, crop]);
    }

    useEffect(() => {
        getPlots();
    }, [])

    return (
        <div>
            <CropForm />
        </div>
    )
}
