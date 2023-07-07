import React, {useState} from "react";

const CreateAccountPage = () => {
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[dodId, setDodId] = useState('');
    const[email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('firstName',firstName);
        console.log('lastName', lastName);
        console.log('dodId', dodId);
        console.log('email', email);
        setFirstName('');
        setLastName('');
        setDodId('');
        setEmail('');
    }
    return(
        <div>
            <h1>Create Account</h1>
            <form onSubmit={{handleSubmit}}>
                <label>
                    First Name:
                    <input type="text" value={firstName} onChange={(e => setFirstName)} />
                </label>
                <label>
                    Last Name:
                    <input type="text" value={lastName} onChange={(e => setLastName)} />
                </label>
                <label>
                    DOD ID:
                    <input type="text" value={dodId} onChange={(e => setDodId)} />
                </label>
                <label>
                    Email:
                    <input type="text" value={email} onChange={(e => setEmail)} />
                </label>
                <button type="submit">Create Account</button>
            </form>
        </div>
    )
}


export default CreateAccountPage