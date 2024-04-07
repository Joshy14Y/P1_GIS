
import { useEffect, useState } from 'react';
import { getParcelas } from '../client/client.js'
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import CropForm from '../components/crops/CropForm.jsx';
import { VerticalCard } from '../components/cutCards/VerticalCard.jsx';
import { HorizontallyCard } from '../components/cutCards/HorizontallyCard.jsx';
import { GridCard } from '../components/cutCards/GridCard.jsx';
import { CustomCard } from '../components/cutCards/CustomCard.jsx';
import { ResultFormData } from '../components/resultForm/ResultFormData.jsx';
import { gridCuts, horizontalCuts, verticalCuts, customCuts } from '../utils.js';

/*

1- el terreno (tamanio)
2- la cantidad de cultivos (saber cuanto terreno es)
3- elegir el tipo de corte
4- resultados

*/
export default function MainPage() {

    const [cropList, setCropList] = useState([]); // lista de cultivos
    const [plots, setPlots] = useState([]); // lista de terrenos
    const [cut, setCut] = useState(''); // string con el corte elegido
    const [cutList, setCutList] = useState([]); // lista de los cortes a realizar
    const [activeTab, setActiveTab] = useState("cultivos");
    const [activeAlert, setActiveAlert] = useState("");
    const [angle, setAngle] = useState(10); // angulo elegido para el corte personalidazo
    const [selectedPlotColor] = useState("rgba(29,94,5, 0.5)"); // color por defecto para pintar los terrenos 

    const [selectedPlot, setSelectedPlot] = useState({}); // guarda el terreno elegido para trabajar 
    const [selectedPlotIndex, setSelectedPlotIndex] = useState(-1); // guarda el index del terreno elegido
    const [totalCropsArea, setTotalCropsArea] = useState(0);

    const [splitList, setSplitList] = useState([]);

    const [responseData, setResponseData] = useState([]); // tiene la respuesta de la peticion al backend

    const [resultFlag, setResultFlag] = useState(false);

    const getPlots = async () => {
        let data = []
        const result = await getParcelas();
        result.map((plot) => {
            data.push(plot)
        })
        setPlots(data);
    }

    const onSelectPlot = (plot, index) => {
        setSelectedPlot(plot);
        setSelectedPlotIndex(index);
    }

    const createPlots = (plots, selectedIndex) => {

        return plots.map((objeto, index) => (
            <g key={index} transform="scale(1)">
                <path
                    d={objeto.svg_geom}
                    stroke="black" // Color de la línea
                    fill={index === selectedIndex ? 'rgba(255, 69, 0, 0.5)' : selectedPlotColor} // Relleno
                    strokeWidth="1.090645035892012" // Ancho de la línea
                    onClick={() => onSelectPlot(objeto, index)}
                />
            </g>
        ))
    }


    function splitListFun(list) {

        let length = list.length;
        let splitList_ = [];

        // Agregar un 0 al final si la longitud de la lista es impar
        if (length % 2 !== 0) {
            list.push(0);
            length = list.length;
        }

        // Dividir la lista por la mitad
        const middleIndex = length / 2;

        // Agregar las dos sublistas a splitList
        splitList_.push(list.slice(0, middleIndex));
        splitList_.push(list.slice(middleIndex));
        setSplitList(splitList_);
        return { List: splitList_, middleIndex: middleIndex };
    }


    const checkDataForResult = async () => {
        setResultFlag(false);
        setTotalCropsArea(0);
        let dataFromSplit = []
        let retrieveData = []

        if (cropList.length === 0) {
            //bandera de que agregue cultivos
            console.log('sin cultivos')
            return
        }

        if (Object.keys(selectedPlot).length === 0) {
            //bandera de que elija un terreno
            console.log('sin terreno')
            return
        }

        if (cut === '') {
            //bandera de que un corte
            console.log('sin corte')
            return
        }

        cropList.map((crop) => {
            let cropTotalArea = crop.areaPerCrop * crop.quantity;
            setTotalCropsArea((prevTotalCropsArea) => cropTotalArea + prevTotalCropsArea);
        })

        const newCutList = cropList.map((crop) => crop.areaPerCrop * crop.quantity);
        console.log('newCutList', newCutList)
        setCutList(newCutList);

        if (selectedPlot.area < totalCropsArea) return;

        switch (cut) {
            case 'vertical':
                retrieveData = await verticalCuts(selectedPlot.geom, cutList);
                if (retrieveData === undefined) return;
                setResponseData(retrieveData);
                break;
            case 'horizontal':
                retrieveData = await horizontalCuts(selectedPlot.geom, cutList);
                if (retrieveData === undefined) return;
                setResponseData(retrieveData);
                break;
            case 'grid':
                dataFromSplit = splitListFun(newCutList);
                retrieveData = await gridCuts(selectedPlot.geom, dataFromSplit.List, dataFromSplit.middleIndex);
                if (retrieveData === undefined) return;
                setResponseData(retrieveData);
                break;
            case 'custom':
                retrieveData = await customCuts(selectedPlot.geom, cutList, angle);
                if (retrieveData === undefined) return;
                setResponseData(retrieveData);
                break;
            default:
                break;
        }

        //clearStates()
        //dataFromSplit = []
        //retrieveData = []
        setResultFlag(true);
    }

    useEffect(() => {
        getPlots();
    }, [])

    useEffect(() => {
        console.log('Lista de cultivos', cropList)
    }, [cropList])

    useEffect(() => {
        console.log('Terreno elegido', selectedPlot)
    }, [selectedPlot])

    return (
        <Tabs
            id="justify-tab-example"
            justify
            activeKey={activeTab}
            onSelect={(tab) => setActiveTab(tab)} // Actualizar el estado del tab activo
        >
            <Tab
                eventKey="terreno"
                title="Terrenos"
                className='d-flex justify-content-center align-items-center'
            >
                {activeTab === "terreno" && (
                    <div>
                        <h1 style={{ textAlign: 'center', top: 0, zIndex: 1, background: 'white' }}>Seleccione el terreno</h1>
                        <div style={{ padding: '10px', border: '2px solid black', marginTop: '10px' }}>
                            <svg id="svg" width="600" height="400" viewBox="443698.75456394313 -1146566.6288744938 872.5160287136096 598.7469839074183">
                                {createPlots(plots, selectedPlotIndex)}
                            </svg>
                        </div>
                    </div>
                )}

            </Tab>

            <Tab
                eventKey="cultivos"
                title="Cultivos"
            >
                {activeTab === "cultivos" && (
                    <div>
                        <h1 style={{ textAlign: 'center', top: 0, zIndex: 1, background: 'white' }}>Seleccione los cultivos</h1>
                        <CropForm
                            cropList={cropList}
                            setCropList={setCropList}
                        />
                    </div>
                )}

            </Tab>
            <Tab
                eventKey="corte"
                title="Tipo de Cortes"
                className='m-2 d-flex align-items-center justify-content-center'
            >
                {activeTab === "corte" && ( // Renderizar solo si el tab activo es "corte"
                    <Container>
                        <div className='align-items-center justify-content-center'>
                            <h1 style={{ textAlign: 'center' }}>Seleccione el tipo de corte</h1>
                            <Row>
                                <Col sm className='mb-2'>
                                    <VerticalCard
                                        setCut={setCut}
                                        activeAlert={activeAlert}
                                        setActiveAlert={setActiveAlert}
                                    />
                                </Col>
                                <Col sm className='mb-2'>
                                    <HorizontallyCard
                                        setCut={setCut}
                                        activeAlert={activeAlert}
                                        setActiveAlert={setActiveAlert}
                                    />
                                </Col>
                                <Col sm className='mb-2'>
                                    <GridCard
                                        setCut={setCut}
                                        activeAlert={activeAlert}
                                        setActiveAlert={setActiveAlert}
                                    />
                                </Col>
                                <Col sm className='mb-2'>
                                    <CustomCard
                                        setCut={setCut}
                                        activeAlert={activeAlert}
                                        setActiveAlert={setActiveAlert}
                                        setAngle={setAngle}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Container>
                )}
            </Tab>
            <Tab eventKey="resultado" title="Resultados" className='d-flex justify-content-center align-items-center'>
                {activeTab === "resultado" && (
                    <Container>
                        <div className='align-items-center justify-content-center'>
                            <h1 style={{ textAlign: 'center' }}>Resultados obtenidos</h1>
                            <Row>
                                <Col sm className='mb-2'>
                                    {resultFlag === true && (
                                        <ResultFormData
                                            selectedPlot={selectedPlot}
                                            cut={cut}
                                            cropList={cropList}
                                            responseData={responseData}
                                            totalCropsArea={totalCropsArea}
                                            splitList={splitList}
                                        />
                                    )}
                                </Col>
                                <Col sm className='mb-2  d-flex flex-column align-items-center'>
                                    <div style={{ padding: '10px', border: '2px solid black', marginTop: '10px', alignContent: 'center', alignItems: 'center' }}>
                                        {resultFlag === true && (
                                            <svg id="svg" width="450" height="300" viewBox="443698.75456394313 -1146566.6288744938 872.5160287136096 598.7469839074183">
                                                {console.log(responseData)}
                                                {
                                                    responseData.map((crop, index) => {
                                                        <g key={index} transform="scale(1)">
                                                            <path
                                                                d={crop.geom_svg}
                                                                stroke="black" // Color de la línea
                                                                fill={'rgba(255, 69, 0, 0.5)'} // Relleno
                                                                strokeWidth="1.090645035892012" // Ancho de la línea
                                                            />
                                                        </g>
                                                    })
                                                }
                                            </svg>
                                        )}
                                    </div>
                                    <Button className='mt-3' variant="primary" onClick={checkDataForResult} >Generar Resultado</Button>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                )}
            </Tab>
        </Tabs>
    )
}
