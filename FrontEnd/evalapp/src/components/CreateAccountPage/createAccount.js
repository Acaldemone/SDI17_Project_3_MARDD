import React, { useState } from "react";
import { Card, Button, Label, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import dodLogo from '../Images/DODLogo.jpeg';


const CreateAccountPage = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setID] = useState('');
    const [password, setPassword] = useState('');
    const [confPass, setConfPass] = useState('');
    const [passCheck, setPassCheck] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const navigate = useNavigate();


    const handleClick = () => {
        navigate('/', {replace:true})
        setIsOpenModal(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(confPass === password){
            await fetch('http://localhost:8080/register/createUser', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "id": id,
                    "first_name": first_name,
                    "last_name": last_name,
                    "email": email,
                    "role_id": 1,
                    "password": password
                })
            })
            .then(res => res.json())

            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setConfPass('');

            setIsOpenModal(true)
        }else{
            setPassCheck(true);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen w-screen">
            {isOpenModal && (
  <div className="flex justify-center bg-zinc-200 opacity-80 fixed insert-0 z-50">
  <div className="flex h-screen w-screen justify-center  items-center">
      <div className="flex flex-col  justify-center items-center bg-white py-12 px-24 border-4 border-sky-500 rounded-xl">
          <div className="flex text-lg text-zinc-600 mb-10">Account Creation Has Been Submitted</div>
          <div className="flex">
              <Button onClick={handleClick} className="rounded px-4 py-2 text-white">Return to Login</Button>
          </div>
      </div>
  </div>
</div>
)}
            <Card className="flex flex-col items-center">
                <img src={dodLogo} alt="DODLogo" className="w-48 h-auto mx-auto mb-4" />
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
                            onChange={(e) => setID(parseInt(e.target.value))}
                            placeholder="DOD ID Number"
                            type="text"
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
