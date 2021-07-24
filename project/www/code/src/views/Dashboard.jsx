import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'


import Sidebar from '../components/Sidebar/Admin'
import { Redirect } from 'react-router'


export default function Dashboard(props) {
    const [users, setUsers] = useState([])


    useEffect(() => {
        fetch("http://api.electrocorp.com/user/all", {
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
        </div>
    )
}