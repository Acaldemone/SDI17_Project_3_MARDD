import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Supervisor from '../Supervisor/Supervisor.js'
import NonSupervisor from '../NonSupervisor/NonSupervisor.js'
import {useNavigate} from 'react-router-dom';
import { Card, Button } from 'flowbite-react';
import dodLogo from '../Images/DODLogo.jpeg';
import jurrasic from '../Images/jurassic-park-ah.gif';
import LoadingScreen from '../Spinner/Spinner.js'



export default function UserPage() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        const userId = Cookies.get('id');

        if (!token || !userId) {
            setError(jurrasic);
            return;
        }

        fetch(`http://localhost:8080/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
          setUser(data)
          setLoading(false)
        })
        .catch(err => {
            setError(err.message);
        });
    }, [])

    if (error) {
        console.log(error)
        return (
        <div className="h-screen flex flex-col">
        <img src={error} alt="error" />
        </div>
        )
    }
    if (loading) {
        return <LoadingScreen />
    }

    if(user[0].role_id === 1){
      return (
        <div>
            <Card>
              <div className="flex justify-between">
              <img src={dodLogo} alt="DODLogo" className="w-48 h-auto" />
                <h1 className="text-6xl font-extrabold dark:text-white mb-5 flex items-center">Welcome {user[0].first_name} {user[0].last_name}</h1>
                <div className="flex items-center">
                    <Button onClick={() => navigate(`/users/userAccount/${Cookies.get('id')}`)}>Home Page</Button>
                    <Button onClick={() => {Cookies.remove('token'); Cookies.remove('id'); navigate('/', {replace:true})}} className="ml-10">Sign Out</Button>
                    </div>
                </div>
            </Card>
            <div className="mb-2">
            <NonSupervisor user={user[0]} />
            </div>
            <div>
            <Card className="h-fit mx-0 px-0"><p className="h-fit mx-0 px-0">&copy; 2023 Da Cool Club. All rights reserved.</p></Card>
            </div>
        </div>
    )



    } else {
        return (
            <div className="flex flex-col">
                <div>
                    <Card>
                        <div className="flex justify-between">
                        <img src={dodLogo} alt="DODLogo" className="w-48 h-auto" />
                        <h1 className="text-6xl font-extrabold dark:text-white mb-5 flex items-center">Welcome {user[0].first_name} {user[0].last_name}</h1>
                        <div className="flex items-center">
                            <Button onClick={() => navigate(`/users/userAccount/${Cookies.get('id')}`)}>Home Page</Button>
                            <Button onClick={() => {Cookies.remove('token'); Cookies.remove('id'); navigate('/', {replace:true})}} className="ml-10">Sign Out</Button>
                        </div>
                    </div>
                    </Card>
                </div>
                <div className="mb-5">
                    <Supervisor user={user[0]} />
                </div>
                <div>
                    <Card className="h-fit mx-0 px-0"><p className="h-fit mx-0 px-0">&copy; 2023 Da Cool Club. All rights reserved.</p></Card>
                </div>
            </div>
          )

    }
}
