import { useState } from "react"
import { Redirect } from "react-router"
import {ReactComponent as InboxIcon} from '../Icons/inbox.svg'
import {ReactComponent as DashboardIcon} from '../Icons/dashboard.svg'



export default function Admin(props) {
	const [redirect, setRedirect] = useState(null)


	if (redirect !== null) {
		return <Redirect to={redirect} />
	}

    return (
        <div>
            <div className="flex flex-row border-b items-center justify-between pb-2">
            	<span className="text-lg font-semibold capitalize dark:text-gray-300">
            		Admin Panel
            	</span>

            	<span className="relative ">
            		<a className="hover:text-blue-500 dark-hover:text-blue-300 text-gray-600 dark:text-gray-300" href="inbox/">
            			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            				<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            				<path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            			</svg>
            		</a>
            		<div className="absolute w-2 h-2 rounded-full bg-blue-500 dark-hover:bg-blue-300 right-0 mb-5 bottom-0"></div>
            	</span>

            </div>

            <div className="mt-8">
            	<img className="h-12 w-12 rounded-full object-cover mx-auto h-32 w-32" src="http://loredanavistarini.it/wp-content/uploads/2020/01/136-1366211_group-of-10-guys-login-user-icon-png.png" alt="enoshima profile" />
            	<h2 className="mt-4 text-xl dark:text-gray-300 font-extrabold capitalize">
            	</h2>
            	<span className="text-sm dark:text-gray-300">
            		<span className="font-semibold text-blue-600 dark:text-blue-300">
            		</span>
            	</span>
            </div>

            <ul className="mt-2 text-gray-600">
            	<li className="mt-16 shadow py-2 bg-white dark:bg-gray-200 rounded-lg -ml-4">
            		<a href="#" className="flex pl-4">
						<DashboardIcon width={24} height={24} />
            			<span className="ml-2 capitalize font-medium">Dashboard</span>
            		</a>
            	</li>

            	<li className="mt-2 py-2 dark:bg-gray-200 hover:shadow hover:bg-gray-50 rounded-lg -ml-4">
            		<a href="/archive" className="flex pl-4">
						<InboxIcon width={24} height={24} />
            			<span className="ml-2 capitalize font-medium">Archive</span>
            		</a>
            	</li>

            </ul>

            <div className="mt-auto flex items-center text-red-700 dark:text-red-400 fixed" style={{bottom: 32}}>
            	<a href="/logout" className="flex items-center">
            		<svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
            			<path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z"></path>
            		</svg>
            		<span className="ml-2 capitalize font-medium">log out</span>
            	</a>
            </div>
        </div>
    )
}