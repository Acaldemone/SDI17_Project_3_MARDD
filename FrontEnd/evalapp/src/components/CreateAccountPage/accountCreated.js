import React from 'react';
import {Link} from 'react-router-dom'
import {Card, Button} from 'flowbite-react';

export default function AccountCreated (){
  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <h1 className="text-center">Account Has Been Created</h1>
        <Link to="/">
          <Button>Click Here to Return to Login</Button>
        </Link>
      </Card>
    </div>
  )
}