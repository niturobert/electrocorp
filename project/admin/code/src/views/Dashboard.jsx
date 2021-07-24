import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'


import Sidebar from '../components/Sidebar/Admin'
import { Redirect } from 'react-router'


export default function Dashboard(props) {
    const [users, setUsers] = useState([])


    useEffect(() => {
        fetch("https://electrocorp-api.herokuapp.com/user/all", {
            method: 'POST',
            body: JSON.stringify({'token': Cookies.get('token')}),
            cache: 'no-cache'
        })
            .then(data => data.json())
            .then(data => {
                // alert(JSON.stringify(data))
                // console.log("%O", data)
                if (data.error !== null) {
                    alert(data.error)
                } else {
                    setUsers(data.data)
                }
            })
    }, [])

    if (Cookies.get('token') === null) {
        return <Redirect to="/login" />
    }


    return (
        <div className="h-screen w-full flex overflow-hidden">
	        <nav className="flex flex-col bg-gray-200 dark:bg-gray-900 w-64 px-12 pt-4 pb-6">
                <Sidebar />
        	</nav>
            
        	<div className="h-screen w-full flex overflow-hidden">
        		<main className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-700 transition duration-500 ease-in-out overflow-y-auto">
        			<div className="mx-10 my-2">
        				<nav className="flex flex-row justify-between border-b dark:border-gray-600 dark:text-gray-400 transition duration-500 ease-in-out">
        					<div className="flex">
                                {/* Top NavBar */}
        						<a href="users-dashboard/" className="py-2 block text-blue-500 border-blue-500 dark:text-blue-200 dark:border-blue-200 focus:outline-none border-b-2 font-medium capitalize transition duration-500 ease-in-out">
        							users
        						</a>
        						<button className="ml-6 py-2 block border-b-2 border-transparent focus:outline-none font-medium capitalize text-center focus:text-blue-500 focus:border-blue-500 dark-focus:text-blue-200 dark-focus:border-blue-200 transition duration-500 ease-in-out">
        							roles
        						</button>
        					</div>
        				</nav>
        				<h2 className="my-4 text-4xl font-semibold dark:text-gray-400">User list</h2>
        				<div className="pb-2 flex items-center justify-between text-gray-600 dark:text-gray-400 border-b dark:border-gray-600">
        					{/* <!-- Header --> */}
        					<div>
        						<span>
        							<span className="text-blue-500 dark:text-blue-200">
                                        {users.length}
        							</span>
        							<span> users; </span>
        						</span>
        						<span>
        							<span className="text-blue-500 dark:text-blue-200">
        							</span>
        							<span> roles</span>
        						</span>
        					</div>
        				</div>
                        {users.map(a => {
                            return (
                                <div className="mt-2 flex px-4 py-4 justify-between bg-white dark:bg-gray-600 shadow-xl rounded-lg cursor-pointer">
                                    <div className="flex justify-between">
                                        <img className="h-12 w-12 rounded-full object-cover" src="http://loredanavistarini.it/wp-content/uploads/2020/01/136-1366211_group-of-10-guys-login-user-icon-png.png" alt="" />
        
                                        <div className="ml-4 flex flex-col capitalize text-gray-600 dark:text-gray-400">
                                            <span>name</span>
                                            <span className="mt-2 text-black dark:text-gray-200">
                                                {a.name}
                                            </span>
                                        </div>
        
                                        <div className="ml-12 flex flex-col capitalize text-gray-600 dark:text-gray-400">
                                            <span>email</span>
                                            <span className="mt-2 text-black dark:text-gray-200 normal-case">
                                                {a.email}
                                            </span>
                                        </div>
        
                                        <div className="ml-12 flex flex-col capitalize text-gray-600 dark:text-gray-400">
                                            <span>role</span>
                                            <span className="mt-2 text-black dark:text-gray-200 normal-case">
                                                {a.role}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        </div>
        		</main>
        	</div>
        </div>
    )
}