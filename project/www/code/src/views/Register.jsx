import AppBar from '../components/AppBar'
import Footer from '../components/Footer'
import {Redirect} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'


export default function Login(props) {
    document.title = 'Login'

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loggedIn, setLoggedIn] = useState(null)

    if (Cookies.get('token') !== undefined) {
        return <Redirect to="/dashboard" />
    }

    // if (redirect !== null) {
    //     return (
    //         <Redirect to={redirect} />
    //     )
    // }



    async function authenticate() {
        fetch("http://api.electrocorp.com/login", {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'password': password,
            }),
        })
            .then(data => data.json())
            .then(data => {
                if (data.data !== null) {
                    Cookies.set('token', data.data)
                    setLoggedIn(true)
                } else {
                    alert(data.error)
                }
            })
    }
    
    return (        <div class="font-sans">
    <div class="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
        <div class="relative xl:max-w-4xl w-full">
            <div class="invisible md:visible card bg-purple-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
            <div class="invisible md:visible card bg-blue-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
            <div class="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
                <label for="" class="block mt-3 text-sm text-gray-700 text-center font-semibold text-3xl">Diventa Cliente</label>
                <form method="POST" class="mt-10">
                    <div class="grid grid-cols-2 gap-4">
                        <input name="name" type="text" placeholder="Nome" class="mt-1 pl-4 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" required />
                        <input name="surname" type="text" placeholder="Cognome" class="mt-1 pl-4 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" required />

                        <select name="gender" class="mt-1 pl-4 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" required>
                            <option selected disabled hidden>Genere</option>
                            <option value="man">Uomo</option>
                            <option value="woman">Donna</option>
                            <option value="altro">Altro/Non Specificare</option>
                        </select>

                        <input name="birthdate" type="date" placeholder="Data Nascita" class="mt-1 pl-4 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" required />
                    </div>
                    <div class="grid grid-cols-2 gap-4 mt-8">
                        <select name="nation" class="mt-1 pl-4 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" required>
                            <option selected disabled hidden>Nazioni</option>
                            <option value="it">Italia</option>
                            <option value="fr">Francia</option>
                            <option value="de">Germania</option>
                        </select>

                        <select name="region" class="mt-1 pl-4 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" required>
                            <option selected disabled hidden>Regione</option>
                            <option value="basilicata">Basilicata</option>
                            <option value="puglia">Puglia</option>
                        </select>

                        <select name="city" class="mt-1 pl-4 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" required>
                            <option selected disabled hidden>Regione</option>
                            <option value="brienza">Brienza</option>
                            <option value="potenza">Potenza</option>
                        </select>

                        <input name="text" type="street" placeholder="Via" class="mt-1 pl-4 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" required />
                    </div>
                    <div class="grid grid-cols-2 gap-4 mt-8">
                        <input name="email" type="email" placeholder="Indirizzo Email" class="mt-1 pl-4 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" required />
                        <input name="password" type="password" placeholder="Password" class="mt-1 pl-4 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" required />
                    </div>

                    <div class="mt-7 flex">
                        <label for="age_verification" class="inline-flex items-center w-full cursor-pointer">
                            <input id="age_verification" type="checkbox" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" name="remember" />
                            <span class="ml-2 text-sm text-gray-600">Ho piu' di 18 anni</span>
                        </label>
                    </div>
                    <div class="mt-2 flex">
                        <label for="privacy_policy" class="inline-flex items-center w-full cursor-pointer">
                            <input id="privacy_policy" type="checkbox" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" name="remember" />
                            <span class="ml-2 text-sm text-gray-600">Accetto la <a class="text-blue-500" href="/privacy">Privacy Policy</a></span>
                        </label>
                    </div>
                    <div class="mt-2 flex">
                        <label for="terms_of_service" class="inline-flex items-center w-full cursor-pointer">
                            <input id="terms_of_service" type="checkbox" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" name="remember" />
                            <span class="ml-2 text-sm text-gray-600">Accetto i <a class="text-blue-500" href="/tos">Termini di Servizio</a></span>
                        </label>
                    </div>

                    <div class="mt-7">
                        <button class="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">Diventa Cliente</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</div>
    )
}