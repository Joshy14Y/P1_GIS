
import { useEffect, useState } from 'react';
import { getHorizontalCuts, getParcelas } from '../client/client.js'
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import CropForm from '../components/crops/CropForm.jsx';
import { VerticalCard } from '../components/cutCards/VerticalCard.jsx';
import { HorizontallyCard } from '../components/cutCards/HorizontallyCard.jsx';
import { GridCard } from '../components/cutCards/GridCard.jsx';
import { CustomCard } from '../components/cutCards/CustomCard.jsx';
import { ResultFormData } from '../components/resultForm/ResultFormData.jsx';

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
    const [activeTab, setActiveTab] = useState("resultado");
    const [activeAlert, setActiveAlert] = useState("");
    const [angle, setAngle] = useState(0); // angulo elegido para el corte personalidazo
    const [selectedPlotColor] = useState("rgba(29,94,5, 0.5)"); // color por defecto para pintar los terrenos 

    const [selectedPlot, setSelectedPlot] = useState(""); // guarda el terreno elegido para trabajar 
    const [selectedPlotIndex, setSelectedPlotIndex] = useState(-1); // guarda el index del terreno elegido
    const [totalCropsArea, setTotalCropsArea] = useState(0);

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
                    onMouseOver={(event) => console.log(event)}
                    onMouseOut={() => console.log('sali de tu area')}
                    d={objeto.svg_geom}
                    stroke="black" // Color de la línea
                    fill={index === selectedIndex ? 'rgba(255, 69, 0, 0.5)' : selectedPlotColor} // Relleno
                    strokeWidth="1.090645035892012" // Ancho de la línea
                    onClick={() => onSelectPlot(objeto, index)}
                />
            </g>
        ))
    }

    const checkDataForResult = async () => {
        let cutList = []
        let result = null
        cropList.map((crop) => {
            setTotalCropsArea(totalCropsArea + (crop.areaPerCrop * crop.quantity))
            cutList.push(crop.areaPerCrop * crop.quantity)
        })

        //if (selectedPlot.area < totalCropsArea) return;
        console.log(cut)
        switch (cut) {
            case 'vertical':

                break;
            case 'horizontal':
                console.log('selectedPlot.geom', selectedPlot.geom);
                console.log('cutList',cutList);
                result = await getHorizontalCuts(selectedPlot.geom, cutList);
                console.log(result);
                break;
            case 'grid':

                break;
            case 'custom':

                break;
            default:
                break;
        }

    }

    useEffect(() => {
        console.log('selected plot', selectedPlot);
    }, [onSelectPlot])

    useEffect(() => {
        getPlots();
    }, [])

    useEffect(() => {
        console.log('angle', angle)
    }, [angle])

    useEffect(() => {
        console.log('cut', cut)
    }, [cut])

    useEffect(() => {
        console.log('CropList', cropList)
    }, [cropList])
    useEffect(() => {
        console.log('plots', plots);
    }, [plots])

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
                                    <ResultFormData />
                                </Col>
                                <Col sm className='mb-2  d-flex flex-column align-items-center'>
                                    <div style={{ padding: '10px', border: '2px solid black', marginTop: '10px', alignContent: 'center', alignItems: 'center' }}>
                                        <svg id="svg" width="450" height="300" viewBox="443698.75456394313 -1146566.6288744938 872.5160287136096 598.7469839074183">
                                            { /* cargar el resultado optenido */}
                                        </svg>
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
