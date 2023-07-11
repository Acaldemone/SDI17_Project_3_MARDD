import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Supervisor from '../Supervisor/Supervisor.js'
import NonSupervisor from '../NonSupervisor/NonSupervisor.js'
import { Routes, Route, Link, useNavigate} from 'react-router-dom';
import { Card, Button } from 'flowbite-react';

export default function UserPage() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
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
        .then(data => setUser(data))
        .catch(err => {
            setError(err.message);
        });
    }, [])

    if (error) {
        return <p>{error}</p>
    }
    if (!user) {
        return <p>Loading....</p>
    }

    if(user[0].role_id === 1){
        return(
            <div>
            <Card className="flex justify-center items-center h-40">
            <h1 className="text-6xl font-extrabold dark:text-white text-center mb-5">Welcome {user[0].first_name} {user[0].last_name}</h1>
            <Button onClick={() => navigate('/', {replace:true})}>Sign Out</Button>
          </Card>
        <NonSupervisor user={user[0]} />
        </div>
        )
    } else {
        return (
            <div>
            <Card className="flex justify-center items-center h-40">
            <h1 className="text-6xl font-extrabold dark:text-white text-center mb-5">Welcome {user[0].first_name} {user[0].last_name}</h1>
            <Button onClick={() => navigate('/', {replace:true})}>Sign Out</Button>
          </Card>
            <Supervisor user={user[0]} />
            </div>
        )
    }
}
