import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function UserPage({ UserId }) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');
        const userId = Cookies.get('id');
            console.log(token)
            console.log(userId)

            if (!token || !userId) {
            setError('Unauthorized attempt to access a page!');
            return;
        }

        fetch(`https://localhost:8080/users/${userId}`, {
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
    if(error){
        return <h1>No Data to display</h1>
    }
    return (
        <div>
            <h1>Welcome {user[0].id}</h1>
        </div>
    )
}
