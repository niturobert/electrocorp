import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'

import Globe from 'react-globe.gl';

import SidebarArchive from '../components/Sidebar/Archive'
import FABArchive from './../components/FABs/Archive'
import Informations from './../components/Widgets/Informations'

import {Redirect} from 'react-router-dom'


export default function Archive(props) {
    document.title = 'Archive'
    document.body.classList.add('overflow-hidden')

    // Fetched data.
    let [pylons, setPylons] = useState([])
    let [powerPlants, setPowerPlants] = useState([])
    let [powerLines, setPowerLines] = useState([])
    let [powerCabins, setPowerCabins] = useState([])

    // Rendering data.
    let [points, setPoints] = useState([])
    let [checkedState, setCheckedState] = useState([true, true, true, true])

    // Set the cursor type
    const [dataToShow, setDataToShow] = useState({})


    // Handling checkboxes.
    function toggleCheckbox(event) {
        const name = event.target.name;

        switch (name) {
            case 'power plants':
                setCheckedState([!checkedState[0], checkedState[1], checkedState[2], checkedState[3]])
                break
                
            case 'pylons':
                setCheckedState([checkedState[0], !checkedState[1], checkedState[2], checkedState[3]])
                break

            case 'power cabins':
                setCheckedState([checkedState[0], checkedState[1], !checkedState[2], checkedState[3]])
                break
            
            case 'power lines':
                setCheckedState([checkedState[0], checkedState[1], checkedState[2], !checkedState[3]])
                break
        }
    }

    // Handling updates.
    async function updateRendering(force=false) {
        setDataToShow([])
        if (checkedState[0]) {
            if (powerPlants.length === 0 || force === true) {
                fetch("http://api.electrocorp.com/power_plant/all", {
                    method: 'POST',
                    cache: 'no-cache',
                    body: JSON.stringify({token: Cookies.get('token')}),
                })
                    .then(data => data.json())
                    .then(data => {
                        if (data.data != null) {
                            powerPlants = data.data
                            setPowerPlants(data.data)
                        }
                    })
            }
        } else {
            // setPowerPlants([])
            powerPlants = []
        }

        if (checkedState[1]) {
            if (pylons.length === 0 || force === true) {
                await fetch("http://api.electrocorp.com/pylon/all", {
                    cache: 'no-cache',
                    method: 'POST',
                    body: JSON.stringify({token: Cookies.get('token')})
                })
                    .then(data => data.json())
                    .then(data => {
                        if (data.data != null) {
                            pylons = data.data
                            setPylons(data.data)
                        }
                    })
            }
        } else {
            // setPylons([])
            pylons = []
        }

        if (checkedState[2]) {
            if (powerCabins.length === 0 || force === true) {
                await fetch("http://api.electrocorp.com/power_cabin/all", {
                    cache: 'no-cache',
                    method: 'POST',
                    body: JSON.stringify({token: Cookies.get('token')})
                })
                    .then(data => data.json())
                    .then(data => {
                        if (data.data != null) {
                            powerCabins = data.data
                            setPowerCabins(data.data)
                        }
                    })
            }
        } else {
            // setPowerCabins([])
            powerCabins = []
        }

        if (checkedState[3]) {
            if (powerLines.length === 0 || force === true) {
                await fetch("http://api.electrocorp.com/power_line/all", {
                    cache: 'no-cache',
                    method: 'POST',
                    body: JSON.stringify({token: Cookies.get('token')})
                })
                    .then(data => data.json())
                    .then(data => {
                        powerLines = []

                        data.data.forEach(foobar => {
                            powerLines.push({'coords': foobar.coords, 'color': foobar.properties.color, 'slug': 'mein'})
                        })
                    })
            }
        } else {
            // setPowerLines([])
            powerLines = []
        }

        setPoints([...pylons, ...powerCabins])
        setPowerPlants(powerPlants)
        setPowerLines(powerLines)
    }

    // On Item Click Data
    function onPathClick(arc, event) {
        alert(JSON.stringify(arc))
    }

    function onElementClick(foo, bar) {
        // alert(JSON.stringify(foo))
        setDataToShow(foo)
    }

    // Show the new cursor...
    function onPathHover(foo, _) {
        alert(JSON.stringify(foo))
    }

    function onElementHover(foo, bar) {
        if (foo === null) {
            document.body.style.cursor = 'pointer' 
        } else {
            document.body.style.cursor = 'grab' 
        }
    }

    useEffect(() => updateRendering(), [])

    if (Cookies.get('token') === null) {
        return (
            // <p>(NOT INCLUDED) Cookies: {document.cookie}</p>
            <Redirect to="/login" />
        )
    }


    // Render the page.
    return (
        <div className="overflow-hidden">
            <div className="h-screen w-screen flex overflow-hidden text-white bg-gray-800">
                <SidebarArchive checkedState={checkedState} onUpdate={toggleCheckbox} onSubmit={updateRendering} />

                <div className="grid grid-cols-3 w-full mr-8">
                    <main className="col-span-2 transition duration-500 ease-in-out overflow-y-auto">
                        <Globe
                            // Generic configuration
                            width={1020}
                            waitForGlobeReady={false}
                            className="overflow-hidden"
                            globeImageUrl={process.env.PUBLIC_URL + '/img/world.jpeg'}
                            backgroundImageUrl={process.env.PUBLIC_URL + "/img/night-sky.png"}

                            // Power Plants
                            labelsData={powerPlants}
                            labelLat="lat"
                            labelLng="lng"
                            labelColor={(foobar) => {
                                if (['Hydro', 'Solar', 'Wind', 'Nuclear', 'Geothermal'].includes(foobar.category)) {
                                    return 'rgba(255, 165, 0, 0.75)'
                                }

                                return 'rgba(255, 120, 0, 0.75)'
                            }}
                            labelText={() => ''}
                            labelDotRadius={0.1}
                            labelSize={0.25}
                            onLabelClick={onElementClick}

                            // Cabins and Pylons
                            pointsData={points}
                            pointColor="color"
                            pointRadius={0.025}
                            pointAltitude="size"
                            onPointClick={onElementClick}
                            onPointHover={onElementHover}

                            // Power Lines
                            pathsData={powerLines}
                            pathColor={x => x.color}
                            pathPoints="coords"
                            pathLabel="slug"
                            pathStroke={1}
                            pathLabel={x => x.properties.name}
                            pathDashLength={1}
                            pathDashAnimateTime={1500}
                            pathDashGap={0.025}
                            onPathHover={onPathHover}
                            onPathClick={onPathClick}
                        />
                        <div></div>
                    </main>

                    <div className="col-span-1 transition duration-500 ease-in-out overflow-y-auto mt-8 ml-8">
                        <Informations data={dataToShow} updater={updateRendering} />
                    </div>
                </div>
            </div>

            <FABArchive powerPlants={powerPlants} powerCabins={powerCabins} pylons={pylons} />
        </div>
    )
}