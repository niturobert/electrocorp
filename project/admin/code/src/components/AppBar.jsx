import {useState} from 'react'
import {Redirect} from 'react-router-dom'


export default function AppBar() {
    const [redirect, setRedirect] = useState(null)

    if (redirect != null) {
        return (
            <Redirect to={redirect} />
        )
    }

    return (
        <nav className="flex items-center justify-between flex-wrap bg-white py-4 lg:px-12 shadow border-solid border-t-2 border-blue-700">
            <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
                <div className="flex items-center flex-shrink-0 text-gray-800 mr-16">
                </div>
                <div className="block lg:hidden ">
                    <button
                            id="nav"
                            className="flex items-center px-3 py-2 border-2 rounded text-blue-700 border-blue-700 hover:text-blue-700 hover:border-blue-700">
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="menu w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
                <div className="text-md font-bold text-blue-700 lg:flex-grow">
                    <button className="block inline-block text-black text-xl pr-6 text-black rounded font-bold" onClick={setRedirect('/')}>
                        <img style={{height: '64px'}} src="" className="block inline-block text-md px-4 ml-2 py-1 rounded font-bold mt-4 lg:mt-0 font-semibold text-xl tracking-tight" />
                        ElectroCorp
                    </button>

                    <a href="/services"
                           className=" block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
                            Services
                        </a>
                    <a href="/infrastructure"
                           className=" block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
                            Infrastructure
                        </a>
                    <a href="/news"
                           className=" block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
                            News
                        </a>
                    <a href="/support"
                           className=" block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
                            Support
                        </a>
                </div>
                <div className="flex ">
                    <a href="/login" className="block text-md px-4  ml-2 py-2 rounded text-blue-700 font-bold hover:text-white mt-4 hover:bg-blue-700 lg:mt-0">Login</a>
                    <a href="/register" className="block text-md px-4  ml-2 py-2 rounded text-blue-700 font-bold hover:text-white mt-4 hover:bg-blue-700 lg:mt-0">Become a client</a>
                </div>
            </div>

        </nav>
    )
}