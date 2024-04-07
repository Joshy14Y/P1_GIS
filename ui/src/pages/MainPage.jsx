
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
import { AlertResult } from '../components/alert/AlertResult.jsx';
import { UndefinedAlert } from '../components/alert/UndefinedAlert.jsx';
import { OversizedAlert } from '../components/alert/OversizedAlert.jsx';
import { SelectedPlotForm } from '../components/resultForm/SelectedPlotForm.jsx';

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
    const [activeTab, setActiveTab] = useState("terreno"); //tiene el tab activo
    const [activeAlert, setActiveAlert] = useState(""); // alerta de que llene todos los campos en el form de cultivos
    const [angle, setAngle] = useState(10); // angulo elegido para el corte personalidazo
    const [selectedPlotColor] = useState("rgba(29,94,5, 0.5)"); // color por defecto para pintar los terrenos 
    const [selectedPlot, setSelectedPlot] = useState({}); // guarda el terreno elegido para trabajar 
    const [selectedPlotIndex, setSelectedPlotIndex] = useState(-1); // guarda el index del terreno elegido
    const [totalCropsArea, setTotalCropsArea] = useState(0); // suma del total de las areas de los cultivos
    const [splitList, setSplitList] = useState([]);  // lista que se usa para el corte grid
    const [responseData, setResponseData] = useState([]); // tiene la respuesta de la peticion al backend
    const [resultFlag, setResultFlag] = useState(false); // flag que permite mostrar los componentes del resultado

    const [missingDataFlag, setMissingDataFlag] = useState(false);
    const [undefinedFlag, setUndefinedFlag] = useState(false);
    const [oversized, setOversized] = useState(false);

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
            list.unshift(0);
            length = list.length;
        }

        // Dividir la lista por la mitad
        const middleIndex = length / 2;

        // Agregar las dos sublistas a splitList
        splitList_.push(list.slice(0, middleIndex));
        splitList_.push(list.slice(middleIndex));
        console.log('splitList_', splitList_)
        setSplitList(splitList_);
        return { List: splitList_, middleIndex: middleIndex };
    }


    const checkDataForResult = async () => {
        setMissingDataFlag(false)
        setResultFlag(false);
        setOversized(false);
        setTotalCropsArea(0);
        let dataFromSplit = []
        let retrieveData = []

        if (cropList.length === 0) {
            //bandera de que agregue cultivos
            console.log('sin cultivos')
            setMissingDataFlag(true)
            return
        }

        if (Object.keys(selectedPlot).length === 0) {
            //bandera de que elija un terreno
            console.log('sin terreno')
            setMissingDataFlag(true)
            return
        }

        if (cut === '') {
            //bandera de que un corte
            console.log('sin corte')
            setMissingDataFlag(true)
            return
        }

        const newCutList = cropList.map((crop) => crop.areaPerCrop * crop.quantity);
        setCutList(newCutList);

        const newCropTotalArea = newCutList.reduce((totalArea, crop) => totalArea + crop, 0);
        setTotalCropsArea(newCropTotalArea);


        if (selectedPlot.area < newCropTotalArea) {
            setOversized(true);
            return;
        }
        console.log('cut', cut);
        switch (cut) {
            case 'vertical':
                retrieveData = await verticalCuts(selectedPlot.geom, newCutList);
                if (retrieveData === undefined) {
                    setUndefinedFlag(true);
                    return;
                }
                setResponseData(retrieveData);
                break;
            case 'horizontal':
                retrieveData = await horizontalCuts(selectedPlot.geom, newCutList);
                if (retrieveData === undefined) {
                    setUndefinedFlag(true);
                    return;
                }
                setResponseData(retrieveData);
                break;
            case 'grid':
                dataFromSplit = splitListFun(newCutList);
                retrieveData = await gridCuts(selectedPlot.geom, dataFromSplit.List, dataFromSplit.middleIndex);
                if (retrieveData === undefined) {
                    setUndefinedFlag(true);
                    return;
                }
                setResponseData(retrieveData);
                break;
            case 'custom':
                retrieveData = await customCuts(selectedPlot.geom, newCutList, angle);
                if (retrieveData === undefined) {
                    setUndefinedFlag(true);
                    return;
                }
                setResponseData(retrieveData);
                break;
        }
        setResultFlag(true);
    }

    const chooseColor = (index, cropList) => {
        console.log('chooseColor', cropList)
        let length = cropList.length;
        if (index <= (length - 1)) {
            console.log(cropList[index])
            return cropList[index].color
        }
        else {
            return 'rgba(29,94,5, 0.5)'
        }
    }

    useEffect(() => {
        getPlots();
    }, [])

    useEffect(() => {
        setResultFlag(false);
        setResponseData([]);
    }, [cut])

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
                    <Row>
                        <Col sm className='mb-2 d-flex flex-column align-items-center'>
                            <div>
                                <h1 style={{ textAlign: 'center', top: 0, zIndex: 1, background: 'white' }}>Seleccione la parcela</h1>
                                <div style={{ padding: '10px', border: '2px solid black', marginTop: '10px' }}>
                                    <svg id="svg" width="600" height="400" viewBox="443698.75456394313 -1146566.6288744938 872.5160287136096 598.7469839074183">
                                        {createPlots(plots, selectedPlotIndex)}
                                    </svg>
                                </div>
                            </div>
                        </Col>
                        <Col sm className='mb-2 text-center'> {/* Agregamos la clase 'text-center' */}
                            <div className='mt-5 text-center'>
                                <SelectedPlotForm
                                    selectedPlot={selectedPlot}
                                    selectedPlotIndex={selectedPlotIndex}
                                />
                            </div>
                        </Col>
                    </Row>

                )}

            </Tab>

            <Tab
                eventKey="cultivos"
                title="Cultivos"
            >
                {activeTab === "cultivos" && (
                    <div>
                        <h1 style={{ textAlign: 'center', top: 0, zIndex: 1, background: 'white' }}>Agregue cultivos</h1>
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
                        <div className='d-flex flex-column align-items-center justify-content-center'>
                            <Button className='mt-3 mb-3' size="lg" variant="primary" onClick={checkDataForResult}>Generar Resultado</Button>
                            <div>
                                <h1 style={{ textAlign: 'center' }}>Resultados obtenidos</h1>
                                {oversized === true && (
                                    <OversizedAlert
                                        oversized={oversized}
                                        setOversized={setOversized}
                                    />)
                                }
                                {missingDataFlag === true && (
                                    <AlertResult
                                        missingDataFlag={missingDataFlag}
                                        setMissingDataFlag={setMissingDataFlag}
                                    />)
                                }
                                {undefinedFlag === true && (
                                    <UndefinedAlert
                                        undefinedFlag={undefinedFlag}
                                        setUndefinedFlag={setUndefinedFlag}
                                    />)
                                }
                                {resultFlag === true && (
                                    <Row>
                                        <Col sm className='mb-2'>
                                            <ResultFormData
                                                selectedPlot={selectedPlot}
                                                cut={cut}
                                                cropList={cropList}
                                                responseData={responseData}
                                                totalCropsArea={totalCropsArea}
                                                splitList={splitList}
                                            />
                                        </Col>
                                        <Col sm className='mb-2 d-flex flex-column align-items-center'>
                                            <div style={{ padding: '10px', border: '2px solid black', marginTop: '10px', alignContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                                                <svg id="svg" width="100%" height="100%" viewBox="443698.75456394313 -1146566.6288744938 872.5160287136096 598.7469839074183" preserveAspectRatio="xMidYMid meet">
                                                    {
                                                        responseData.map((crop, index) => {
                                                            return (
                                                                <g key={index} transform="scale(1)">
                                                                    <path
                                                                        d={crop.geom_svg}
                                                                        stroke="black" // Color de la línea
                                                                        //fill='rgba(255, 69, 0, 0.5)' // Relleno
                                                                        fill={chooseColor(index, cropList)} // Relleno
                                                                        strokeWidth="2" // Ancho de la línea
                                                                    />
                                                                </g>)
                                                        })
                                                    }
                                                </svg>
                                            </div>
                                        </Col>
                                    </Row>
                                )}
                            </div>
                        </div>
                    </Container>
                )}
            </Tab>
        </Tabs>
    )
}
