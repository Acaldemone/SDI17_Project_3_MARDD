import React, { useState } from "react";
import { Card, Button, Label, TextInput } from 'flowbite-react';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

const CreateAccountPage = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setID] = useState('');
    const [password, setPassword] = useState('');
    const [confPass, setConfPass] = useState('');
    const [passCheck, setPassCheck] = useState(false);
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('firstName', first_name);
        console.log('lastName', last_name);
        console.log('email', email);
        console.log('DODNum', id);
        console.log('password', password);
        if(confPass === password){
            const hashedPass = bcrypt.hashSync(password, 10);
            await fetch('http://localhost:8080/register/createUser', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "id": id,
                    "first_name": first_name,
                    "last_name": last_name,
                    "email": email,
                    "role_id": 1,
                    "password": hashedPass
                })
            })
            .then(res => res.json())
            .then(data => console.log(data))

            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setConfPass('');

            navigate("/login/accountCreated")
        }else{
            setPassCheck(true);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <Card className="flex flex-col items-center">
                <img src="../Images/DODLogo.jpeg" alt="DODLogo" className="w-48 h-auto mx-auto mb-4" />
                <h1 className="text-center">Create Account</h1>
                {passCheck && <p className="text-center text-red-500">Passwords Must Match</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mr-40 ml-40">
                    <div>
                        <Label htmlFor="first_name" value="First Name" />
                        <TextInput
                            id="first_name"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            type="text"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="last_name" value="Last Name" />
                        <TextInput
                            id="last_name"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            type="text"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="email" value="Email Address" />
                        <TextInput
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            type="email"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            type="password"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="confPass" value="Confirm Password" />
                        <TextInput
                            id="confPass"
                            value={confPass}
                            onChange={(e) => setConfPass(e.target.value)}
                            placeholder="Confirm Password"
                            type="password"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="id" value="DOD ID Number" />
                        <TextInput
                            id="id"
                            value={id}
                            onChange={(e) => setID(e.target.value)}
                            placeholder="DOD ID Number"
                            type="number"
                            required
                        />
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </Card>
        </div>
    );
};

export default CreateAccountPage;
