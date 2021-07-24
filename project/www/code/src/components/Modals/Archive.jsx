import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'


function PowerPlantMenu(props) {
    const [powerPlantCategories, setPowerPlantCategories] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState(1)
    const [latitude, setLatitude] = useState(0.0)
    const [longitude, setLongitude] = useState(0.0)



    function addPowerPlant() {
        alert(`Name: ${name}, Category: ${category}, Description: ${description}, Coordinates: ${latitude}:${longitude}`)
    }

    useEffect(() => {
        fetch('http://api.electrocorp.com/power_plant/categories')
            .then(data => data.json())
            .then(data => {
                setPowerPlantCategories(data.data)
            })
    }, [])

    return (
        <div>
            <div className="mt-3 text-center sm:mt-0 sm:mx-2 sm:text-left">
                <div className="mt-2">
                    <div className="grid grid-cols-2 gap-2 space-y-1 mt-8">
                        <input type="text" value={name} onChange={event => setName(event.target.value)} className="col-span-2 border-2 rounded px-3 py-2 w-full bg-white text-gray-700 focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Name" />
                        <select value={category} onChange={event => setCategory(event.target.value)} className="col-span-2 border-2 rounded px-3 py-2 w-full bg-white text-gray-700 focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Category">
                            {powerPlantCategories.map(x => (
                                <option value={x.id}>{x.name}</option>
                            ))}
                        </select>
                        <input value={latitude} onChange={event => setLatitude(event.target.value)} type="number" min="-180" max="180" step="any" className="border-2 rounded px-3 py-2 w-full bg-white text-gray-700 focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Latitude" />
                        <input value={longitude} onChange={event => setLongitude(event.target.value)} type="number" min="-180" max="180" step="any" className="border-2 rounded px-3 py-2 w-full bg-white text-gray-700 focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Longitude" />
                        <textarea value={description} onChange={event => setDescription(event.target.value)} className="col-span-2 border-2 rounded px-3 py-2 w-full bg-white text-gray-700 focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Description" rows="4"></textarea>
                    </div>

                </div>
            </div>
            <div className="flex flex-row-reverse pt-4 mx-2 pb-2">
                <button type="submit" onClick={addPowerPlant} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Add
                </button>
                <button type="button" onClick={props.closer} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancel
                </button>
            </div>
        </div>
    )
}


function PylonMenu(props) {
    const [pylonCategories, setPylonCategories] = useState([])
    const [name, setName] = useState('')
    const [latitude, setLatitude] = useState(0.0)
    const [longitude, setLongitude] = useState(0.0)
    const [category, setCategory] = useState(1)



    function addPylon() {
        alert(`Name: ${name}, Category: ${category}, Coordinates: ${latitude}:${longitude}`)
    }

    useEffect(() => {
        fetch('http://api.electrocorp.com/pylon/categories')
            .then(data => data.json())
            .then(data => {
                setPylonCategories(data.data)
            })
    }, [])

    return (
        <div>
            <div className="mt-3 text-center sm:mt-0 sm:mx-2 sm:text-left">
                <div className="mt-2">
                    <div className="grid grid-cols-2 gap-2 space-y-1 mt-8">
                        <input type="text" value={name} onChange={event => setName(event.target.value)} className="col-span-2 border-2 rounded px-3 py-2 w-full bg-white text-gray-700 focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Name" />
                        <select value={category} onChange={event => setCategory(event.target.value)} className="col-span-2 border-2 rounded px-3 py-2 w-full bg-white text-gray-700 focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Category">
                            {pylonCategories.map(x => (
                                <option value={x.id}>{x.name}</option>
                            ))}
                        </select>
                        <input value={latitude} onChange={event => setLatitude(event.target.value)} type="number" min="-180" max="180" step="any" className="border-2 rounded px-3 py-2 w-full bg-white text-gray-700 focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Latitude" />
                        <input value={longitude} onChange={event => setLongitude(event.target.value)} type="number" min="-180" max="180" step="any" className="border-2 rounded px-3 py-2 w-full bg-white text-gray-700 focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Longitude" />
                    </div>

                </div>
            </div>
            <div className="flex flex-row-reverse pt-4 mx-2 pb-2">
                <button type="submit" onClick={addPylon} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Add
                </button>
                <button type="button" onClick={props.closer} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancel
                </button>
            </div>
        </div>
    )
}


function PowerCabin(props) {
    const [name, setName] = useState('')
    const [latitude, setLatitude] = useState(0.0)
    const [longitude, setLongitude] = useState(0.0)
    const [category, setCategory] = useState(1)



    function addPylon() {
        alert(`Name: ${name}, Category: ${category}, Coordinates: ${latitude}:${longitude}`)
    }

    return (
        <div>
            <div className="mt-3 text-center sm:mt-0 sm:mx-2 sm:text-left">
                <div className="mt-2">
                    <div className="grid grid-cols-2 gap-2 space-y-1 mt-8">
                        <input type="text" value={name} onChange={event => setName(event.target.value)} className="col-span-2 border-2 rounded px-3 py-2 w-full bg-white text-gray-700 focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Name" />
                        <input value={latitude} onChange={event => setLatitude(event.target.value)} type="number" min="-180" max="180" step="any" className="border-2 rounded px-3 py-2 w-full bg-white text-gray-700 focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Latitude" />
                        <input value={longitude} onChange={event => setLongitude(event.target.value)} type="number" min="-180" max="180" step="any" className="border-2 rounded px-3 py-2 w-full bg-white text-gray-700 focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Longitude" />
                    </div>

                </div>
            </div>
            <div className="flex flex-row-reverse pt-4 mx-2 pb-2">
                <button type="submit" onClick={addPylon} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Add
                </button>
                <button type="button" onClick={props.closer} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancel
                </button>
            </div>
        </div>
    )
}


function PowerLine(props) {
    const [powerLineCategories, setPowerLineCategories] = useState([])
    const [powerPlants, setPowerPlants] = useState([])
    const [pylons, setPylons] = useState([])
    const [powerCabins, setPowerCabins] = useState([])

    const [name, setName] = useState('')
    const [category, setCategory] = useState(1)
    const [source, setSource] = useState(null)
    const [destination, setDestination] = useState(null)


    useEffect(async () => {
        await fetch('http://api.electrocorp.com/power_line/categories')
            .then(data => data.json())
            .then(data => {
                setPowerLineCategories(data.data)
            })

        await fetch('http://api.electrocorp.com/pylon/all', {
            method: 'POST',
            body: JSON.stringify({token: Cookies.get('token')}),
            cache: 'no-cache'
        })
            .then(data => data.json())
            .then(data => {
                setPylons(data.data)
            })

        await fetch('http://api.electrocorp.com/power_plant/all', {
            method: 'POST',
            body: JSON.stringify({token: Cookies.get('token')}),
            cache: 'no-cache'
        })
            .then(data => data.json())
            .then(data => {
                setPowerPlants(data.data)
            })
        
        await fetch('http://api.electrocorp.com/power_cabin/all', {
            method: 'POST',
            body: JSON.stringify({token: Cookies.get('token')}),
            cache: 'no-cache'
        })
            .then(data => data.json())
            .then(data => {
                setPowerCabins(data.data)
            })
    }, [])

    function addPowerLine() {
        alert(`Name: ${name}, Category: ${category}`)
    }

    return (
        <div>
            <div className="mt-3 text-center sm:mt-0 sm:mx-2 sm:text-left">
                <div className="mt-2">
                    <div className="grid grid-cols-2 gap-2 space-y-1 mt-8">
                        <input type="text" value={name} onChange={event => setName(event.target.value)} className="col-span-2 border-2 rounded px-3 py-2 w-full bg-white text-gray-700 focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Name" />
                        <select value={category} onChange={event => setCategory(event.target.value)} className="col-span-2 border-2 rounded px-3 py-2 w-full bg-white text-gray-700 focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Category">
                            <option value="0" hidden>Category</option>
                            {powerLineCategories.map(x => (
                                <option value={x.id}>{x.name}</option>
                                ))}
                        </select>
                        <select value={source} onChange={event => setSource(event.target.value)} className="border-2 rounded px-3 py-2 w-full bg-white text-gray-700 focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Source">
                            <option value="0" hidden>Source</option>
                            {powerPlants.map(x => (
                                <option value={x.id}>{x.name}</option>
                            ))}
                        </select>
                        <select value={destination} onChange={event => setDestination(event.target.value)} className="border-2 rounded px-3 py-2 w-full bg-white text-gray-700 focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Destination">
                            <option value="0" hidden>Destination</option>
                            {powerCabins.map(x => (
                                <option value={x.id}>{x.name || "Nameless"} ({x.lat}:{x.lng})</option>
                            ))}
                        </select>
                    </div>

                </div>
            </div>
            <div className="flex flex-row-reverse pt-4 mx-2 pb-2">
                <button type="submit" onClick={addPowerLine} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Add
                </button>
                <button type="button" onClick={props.closer} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancel
                </button>
            </div>
        </div>
    )
}


export default function ModalArchive(props) {
    const [currentMenu, setCurrentMenu] = useState('power-plant')

    function onUpdatedItemType(event) {
        setCurrentMenu(event.target.value)
    }

    function onAddItemButtonClick() {
        alert("Add Button Clicked")
        switch (currentMenu) {
            case 'power-plant':
                break
        }
    }
    
    return (
        <div className="fixed inset-0 overflow-y-auto z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
           <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
               <div className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={props.closer}></div>
               <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
               <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                   <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="mt-3 text-center sm:mt-0 sm:mx-2 sm:text-left">
                            <h3 className="text-2xl leading-6 font-medium text-gray-900" id="modal-title">Add to archive</h3>
                            <div className="grid grid-cols-2 gap-2 space-y-1 mt-8">
                                <select id='item-type' name="type" value={currentMenu} onChange={onUpdatedItemType} style={{top: -4}} className="col-span-2 border-2 rounded px-3 py-2 w-full bg-white text-gray-700 focus:outline-none focus:border-blue-400 focus:shadow">
                                    <option className="text-black" value="power-plant">Power Plant</option>
                                    <option className="text-black" value="pylon">Pylon</option>
                                    <option className="text-black" value="high-voltage-power-cabin">High Voltage Power Cabin</option>
                                    <option className="text-black" value="low-voltage-power-cabin">Low Voltage Power Cabin</option>
                                    <option className="text-black" value="power-line">Power Line</option>
                                </select>
                            </div>
                        </div>

                        {(currentMenu === "power-plant") ? <PowerPlantMenu closer={props.closer} /> : null}
                        {(currentMenu === "pylon") ? <PylonMenu closer={props.closer} /> : null}
                        {(currentMenu === "high-voltage-power-cabin") ? <PowerCabin closer={props.closer} /> : null}
                        {(currentMenu === "power-line") ? <PowerLine closer={props.closer} /> : null}
                   </div>
               </div>
           </div>
        </div>
    )
}