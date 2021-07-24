import Cookies from "js-cookie"

export default function Informations(props) {


    async function deleteEntity() {
        switch (props.data.type) {
            case 'Power Plant':
                fetch(`https://electrocorp-api.herokuapp.com/power_plant/${props.data.id}/delete`, {
                    method: 'POST',
                    body: JSON.stringify({'token': Cookies.get('token')}),
                    cache: 'no-cache'
                })
                    .then(data => data.json)
                    .then(data => {
                        props.updater(true)
                    })
                break

            case 'Pylon':
                fetch(`https://electrocorp-api.herokuapp.com/pylon/${props.data.id}/delete`, {
                    method: 'POST',
                    body: JSON.stringify({'token': Cookies.get('token')}),
                    cache: 'no-cache'
                })
                    .then(data => data.json)
                    .then(data => {
                        props.updater(true)
                    })
                break

            case 'Power Cabin':
                fetch(`https://electrocorp-api.herokuapp.com/power_cabin/${props.data.id}/delete`, {
                    method: 'POST',
                    body: JSON.stringify({'token': Cookies.get('token')}),
                    cache: 'no-cache'
                })
                    .then(data => data.json)
                    .then(data => {
                        props.updater(true)
                    })
                break

            case 'Power Line':
                fetch(`https://electrocorp-api.herokuapp.com/power_line/${props.data.id}/delete`, {
                    method: 'POST',
                    body: JSON.stringify({'token': Cookies.get('token')}),
                    cache: 'no-cache'
                })
                    .then(data => data.json)
                    .then(data => {
                        props.updater(true)
                    })
                break

            default:
                alert("Invalid entity type: " + props.data.type)
        }
    }

    if (Object.keys(props.data).length === 0) {
        return (
            <div className="mr-8">
                <h2 className="text-4xl text-white mb-4">Informations</h2>
                <p className="text-gray-300">Please click on an element on the globe to edit it</p>
                <br />
            </div>
        )
    }

    return (
        <div className="mr-8 w-full">
            <h2 className='text-3xl mr-4'>#{props.data.id} - {props.data.name || "Nameless Entity"}</h2>
            <a href={'https://maps.google.com/?ll=' + props.data.lat + ',' + props.data.lng} className='text-blue-400 inline-block' target='_blank' rel='noreferrer'>Visualizza in Google Maps</a>
            {/* <a href={`https://www.google.com/maps/@${props.data.lat},${props.data.lng},37m/data=!3m1!1e3`} className='text-blue-400 inline-block' target='_blank'>Visualizza in Google Maps</a> */}
            <hr />
            <p className='text-gray-300 mt-4 mb-8'>{props.data.description || "Descriptionless Entity"}</p>

            <h4 className='text-xl mr-4'>Peoperties</h4>
            <table className="table-auto border w-full">
                <thead>
                    <tr className="text-left">
                        <th className="pl-4">Attribute</th>
                        <th className="pl-4">Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="pl-4">ID</td>
                        <td className="pl-4">{props.data.id}</td>
                    </tr>
                    <tr>
                        <td className="pl-4">Entity</td>
                        <td className="pl-4">{props.data.type}</td>
                    </tr>
                    <tr>
                        <td className="pl-4">Category</td>
                        <td className="pl-4">{props.data.category}</td>
                    </tr>
                    <tr>
                        <td className="pl-4">Latitude</td>
                        <td className="pl-4">{props.data.lat}</td>
                    </tr>
                    <tr className="bg-emerald-200">
                        <td className="pl-4">Longitude</td>
                        <td className="pl-4">{props.data.lng}</td>
                    </tr>
                </tbody>
            </table>

            <div className="grid grid-cols-1 w-full gap-3 mt-4">
                {/* <button className="block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none">
                    Update
                </button> */}
                {/* <div className="block px-6 py-2"></div> */}
                {/* <button onClick={deleteEntity} className="block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-red-500 rounded shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none"> */}
                <button onClick={deleteEntity} className="block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-red-500 rounded shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none">
                    Delete
                </button>
            </div>

            {/* <iframe src={`https://www.google.com/maps/@${props.data.lat},${props.data.lng},37m/data=!3m1!1e3`} /> */}
        </div>
    )
}
