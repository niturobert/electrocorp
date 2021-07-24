import {useState} from 'react'


export default function SidebarArchive(props) {


    // function setPylons() {}
    // function setPowerLines() {}
    // function setPowerPlants() {}
    // function setPowerCabins() {}

    // const pylons = false
    // const powerLines = false
    // const powerPlants = false
    // const powerCabins = false

    function handleFilter() {
        this.props.onSubmit()
        this.props.onSubmit()
    }

    function navigateBack() {
        window.history.back()
    }

    return (
        <nav className="flex flex-col bg-gray-900 dark:bg-gray-900 w-96 px-12 pt-4 pb-6">
            <h1 className="text-5xl pt-16 pb-8">Archive</h1>
            <div className="grid grid-cols-1 gap-0 mb-4">
                <div>
                    <label className="block items-center mt-1 cursor-pointer">
                        <input type="checkbox" name='power plants' value='1' className="form-checkbox h-5 w-5 text-yellow-600" checked={props.checkedState[0]} onChange={props.onUpdate} />
                        <span className="ml-1 text-yellow-600">Power Plants</span>
                    </label>
                    <div className="ml-4 mb-2">
                        <label className="block items-center mt-1 cursor-pointer">
                            <input type="checkbox" name='power lines' value='1' className="form-checkbox h-5 w-5 text-yellow-500" checked={props.checkedState[0]} disabled onChange={props.onUpdate} />
                            <span className="ml-2 text-yellow-500">Renewable</span>
                        </label>
                        <label className="block items-center mt-1 cursor-pointer">
                            <input type="checkbox" name='power lines' value='1' className="form-checkbox h-5 w-5 text-yellow-700" checked={props.checkedState[0]} disabled onChange={props.onUpdate} />
                            <span className="ml-2 text-yellow-700">Nonrenewable</span>
                        </label>
                    </div>
                </div>
                <div>
                    <label className="block items-center mt-1 cursor-pointer">
                        <input type="checkbox" name='pylons' value='1' className="form-checkbox h-5 w-5 text-green-600" checked={props.checkedState[1]} onChange={props.onUpdate} />
                        <span className="ml-2 text-green-500">Pylons</span>
                    </label>
                </div>
                <div>
                    <label className="block items-center mt-1 cursor-pointer">
                        <input type="checkbox" name='power cabins' value='1' className="form-checkbox h-5 w-5 text-blue-600" checked={props.checkedState[2]} onChange={props.onUpdate} />
                        <span className="ml-2 text-blue-500">Power Cabins</span>
                    </label>
                    <div className="ml-4 mb-2">
                        <label className="block items-center mt-1 cursor-pointer">
                            <input type="checkbox" name='power lines' value='1' className="form-checkbox h-5 w-5 text-blue-500" checked={props.checkedState[2]} disabled onChange={props.onUpdate} />
                            <span className="ml-2 text-blue-500">High Voltage</span>
                        </label>
                        <label className="block items-center mt-1 cursor-pointer">
                            <input type="checkbox" name='power lines' value='1' className="form-checkbox h-5 w-5 text-blue-700" checked={props.checkedState[2]} disabled onChange={props.onUpdate} />
                            <span className="ml-2 text-blue-700">Low Voltage</span>
                        </label>
                    </div>
                </div>
                <div>
                    <label className="block items-center mt-8 cursor-pointer">
                        <input type="checkbox" name='power lines' value='1' className="form-checkbox h-5 w-5 text-blue-600" checked={props.checkedState[3]} onChange={props.onUpdate} />
                        <span className="ml-2">Power Lines</span>
                    </label>
                    <div className="ml-4">
                        <label className="block items-center mt-1 cursor-pointer">
                            <input type="checkbox" name='power lines' value='1' className="form-checkbox h-5 w-5 text-blue-600" disabled checked={props.checkedState[3]} />
                            <span className="ml-2">High Voltage</span>
                        </label>
                        <label className="block items-center mt-1 cursor-pointer">
                            <input type="checkbox" name='power lines' value='1' className="form-checkbox h-5 w-5 text-blue-600" disabled checked={props.checkedState[3]} />
                            <span className="ml-2">Low Voltage</span>
                        </label>
                        <label className="block items-center mt-1 cursor-pointer">
                            <input type="checkbox" name='power lines' value='1' className="form-checkbox h-5 w-5 text-purple-600" disabled checked={props.checkedState[3]} />
                            <span className="ml-2 text-purple-600">Cabin Lines</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="relative">
                <button type="submit" name="search" onClick={props.onSubmit} className="rounded px-3 py-2 mt-2 border-b-4 border-l-2 shadow-lg bg-blue-800 border-blue-900 text-white w-full">
                    Apply Filters
                </button>
            </div>

            <div className="absolute" style={{bottom: '32px'}}>
                <a className="flex items-center cursor-pointer" onClick={window.history.back}>
                    <span onClick={navigateBack} className="ml-2 capitalize font-medium cursor-pointer text-red-400">↻ Go Back</span>
                </a>
            </div>
        </nav>
    )
}