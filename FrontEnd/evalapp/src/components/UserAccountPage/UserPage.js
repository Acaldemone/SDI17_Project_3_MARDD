import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Supervisor from '../Supervisor/Supervisor.js'
import NonSupervisor from '../NonSupervisor/NonSupervisor.js'
import {useNavigate} from 'react-router-dom';
import { Card, Button } from 'flowbite-react';
import dodLogo from '../Images/DODLogo.jpeg';


export default function UserPage() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        const userId = Cookies.get('id');

        if (!token || !userId) {
            setError('Unauthorized attempt to access a page!');
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
        return <p>{error}</p>
    }
    if (loading) {
        return <p>Loading....</p>
    }

    if(user[0].role_id === 1){
      return (
        <div>
            <Card className="w-full h-60">
              <div className="flex justify-between">
              <img src={dodLogo} alt="DODLogo" className="w-48 h-auto" />
                <h1 className="text-6xl font-extrabold dark:text-white mb-5 flex items-center">Welcome {user[0].first_name} {user[0].last_name}</h1>
                <div className="flex items-center">
                    <Button onClick={() => navigate(`/users/userAccount/${Cookies.get('id')}`)}>Home Page</Button>
                    <Button onClick={() => {Cookies.remove('token'); Cookies.remove('id'); navigate('/', {replace:true})}} className="ml-10">Sign Out</Button>
                    </div>
                </div>
            </Card>
            <NonSupervisor user={user[0]} />
        </div>
    )



    } else {
          return (
            <div>
                <Card className="w-full h-60">
                  <div className="flex justify-between">
                  <img src={dodLogo} alt="DODLogo" className="w-48 h-auto" />
                    <h1 className="text-6xl font-extrabold dark:text-white mb-5 flex items-center">Welcome {user[0].first_name} {user[0].last_name}</h1>
                    <div className="flex items-center">
                        <Button onClick={() => navigate(`/users/userAccount/${Cookies.get('id')}`)}>Home Page</Button>
                        <Button onClick={() => {Cookies.remove('token'); Cookies.remove('id'); navigate('/', {replace:true})}} className="ml-10">Sign Out</Button>
                        </div>
                    </div>
                </Card>
                <Supervisor user={user[0]} />

            </div>
          )

    }
}
