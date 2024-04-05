
import { useEffect, useState } from 'react';
import { getParcelas } from '../client/client.js'
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import CropForm from '../components/crops/CropForm.jsx';
import { VerticalCard } from '../components/cutCards/VerticalCard.jsx';
import { HorizontallyCard } from '../components/cutCards/HorizontallyCard.jsx';
import { GridCard } from '../components/cutCards/GridCard.jsx';
import { CustomCard } from '../components/cutCards/CustomCard.jsx';

/*

1- el terreno (tamanio)
2- la cantidad de cultivos (saber cuanto terreno es)
3- elegir el tipo de corte
4- resultados

*/
export default function MainPage() {

    const [cropList, setCropList] = useState([]);
    const [plots, setPlots] = useState([]);
    const [cut, setCut] = useState('');
    const [activeTab, setActiveTab] = useState("resultado");
    const [activeAlert, setActiveAlert] = useState("");
    const [angle, setAngle] = useState(0);
    const [selectedPlotColor, setSelectedPlotColor] = useState("rgba(29,94,5, 0.5)");

    const [selectedPlot, setSelectedPlot] = useState("");
    const [selectedPlotIndex, setSelectedPlotIndex] = useState(-1);

    const [mousePosition, setMousePosition] = useState({ posX: 0, posY: 0 })

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
                title="Terreno"
                className='d-flex justify-content-center align-items-center'
            >
                {activeTab === "terreno" && (
                    <div>
                        <h1 style={{ textAlign: 'center', top: 0, zIndex: 1, background: 'white' }}>Seleccione el terreno</h1>
                        <div style={{ padding: '10px', border: '2px solid black', marginTop: '10px' }}>
                            <svg id="svg" width="650" height="500" viewBox="443698.75456394313 -1146566.6288744938 872.5160287136096 598.7469839074183">
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
                title="Tipo de Corte"
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
            <Tab eventKey="resultado" title="Resultado" className='d-flex justify-content-center align-items-center'>
                {activeTab === "resultado" && (
                    <Container>
                        <div className='align-items-center justify-content-center'>
                            <h1 style={{ textAlign: 'center' }}>Resultados obtenidos</h1>
                            <Row>
                                <Col sm className='mb-2'>

                                </Col>
                                <Col sm className='mb-2'>
                                    <div style={{ padding: '10px', border: '2px solid black', marginTop: '10px' }}>
                                        <svg id="svg" width="450" height="300" viewBox="443698.75456394313 -1146566.6288744938 872.5160287136096 598.7469839074183">
                                            { /* cargar el resultado optenido */}
                                        </svg>
                                    </div>
                                </Col>
                                <Col sm className='mb-2'>
                                    <Button variant="primary" >Generar Resultado</Button>
                                </Col>

                            </Row>
                        </div>
                    </Container>
                )}
            </Tab>
        </Tabs>
    )
}
