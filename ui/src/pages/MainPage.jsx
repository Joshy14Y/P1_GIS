
import { useEffect, useState } from 'react';
import { getParcelas } from '../client/client.js'
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
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
    const [activeTab, setActiveTab] = useState("corte");
    const [activeAlert, setActiveAlert] = useState("");
    const [angle, setAngle] = useState(0);
    const [selectedPlotColor, setSelectedPlotColor] = useState("rgba(29,94,5, 0.5)");

    const getPlots = async () => {
        let data = []
        const result = await getParcelas();
        result.map((plot) => {
            data.push(plot)
        })

        setPlots(data);

    }


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
                    <div style={{ padding: '10px', border: '2px solid black', marginTop: '10px' }}>
                        <svg id="svg" width="650" height="500" viewBox="443698.75456394313 -1146566.6288744938 872.5160287136096 598.7469839074183">
                            {plots.map((objeto, index) => (
                                <g key={index} transform="scale(1)">
                                    <path
                                        d={objeto.svg_geom}
                                        stroke="black" // Color de la línea
                                        fill="rgba(29,94,5, 0.5)" // Relleno
                                        strokeWidth="1.090645035892012" // Ancho de la línea
                                        onClick={() => console.log('click', objeto)}
                                    />
                                </g>
                            ))}
                        </svg>
                    </div>
                )}

            </Tab>

            <Tab
                eventKey="cultivos"
                title="Cultivos"
            >
                {activeTab === "cultivos" && (
                    <CropForm
                        cropList={cropList}
                        setCropList={setCropList}
                    />
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
            <Tab eventKey="resultado" title="Resultado">
                Tab content for Contact
            </Tab>
        </Tabs>
    )
}
