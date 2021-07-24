import AppBar from './../components/AppBar'
import Footer from './../components/Footer'
import {Redirect} from 'react-router-dom'
import {useState, useCallback, useRef} from 'react'
import Cookies from 'js-cookie'
import Webcam from 'react-webcam'


export default function Login(props) {
    document.title = 'Login'
    
    const webcamRef = useRef(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loggedIn, setLoggedIn] = useState(null)

    if (Cookies.get('token') !== undefined) {
        return <Redirect to="/dashboard" />
    }


    async function authenticate() {
        let screenshot = webcamRef.current.getScreenshot().split(',').slice(1).join(',')
        // fetch("http://127.0.0.1:5000/login/employee", {
        fetch("https://electrocorp-api.herokuapp.com/login/employee", {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'password': password,
                'frame': screenshot
            }),
        })
            .then(data => data.json())
            .then(data => {
                if (data.data !== null) {
                    alert("Autenticato...")
                    Cookies.set('token', data.data)
                    setLoggedIn(true)
                } else {
                    alert(data.error)
                }
            })
            .catch(error => {
                alert(error)
            })
    }
    
    return (
        <div>
            <div className="font-sans">
                {/* <div className="relative min-h-screen flex flex-col sm:justify-center items-center" style={{backgroundImage: 'url("https://img1.goodfon.com/wallpaper/nbig/a/90/bolshoy-brat-big-brother-1984.jpg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}> */}
                <div className="relative min-h-screen flex flex-col sm:justify-center items-center">
                    <div className="relative sm:max-w-sm w-full">
                        <div className="invisible sm:visible card bg-purple-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
                        <div className="invisible sm:visible card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
                        <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                            <label htmlFor="" className="block mt-3 mb-3 text-sm text-gray-700 text-center font-semibold text-3xl">Log in</label>
                            <div>
                                <input id="username" type="text" name="username" placeholder="Email" onChange={event => setUsername(event.target.value)} className="mt-1 pl-4 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" required />
                            </div>

                            <div className="mt-7">
                                <input id="password" type="password" name="password" placeholder="Password" onChange={event => setPassword(event.target.value)} className="mt-1 pl-4 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" required />
                            </div>

                            <div className="mt-7">
                                <Webcam
                                audio={false}
                                screenshotFormat="image/webp"
                                ref={webcamRef}
                                videoConstraints={{
                                    width: 640,
                                    height: 480,
                                    facingMode: 'user'
                                }}
                                style={{borderRadius: 20}} />
                            </div>

                            <div className="mt-7 flex">
                                <label htmlFor="remember_me" className="inline-flex items-center w-full cursor-pointer">
                                    <input id="remember_me" type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" name="remember" />
                                    <span className="ml-2 text-sm text-gray-600">
                                            Ricordami (2 settimane)
                                        </span>
                                </label>
                            </div>

                            <div className="mt-7">
                                <button onClick={authenticate} className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                        Log in
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}