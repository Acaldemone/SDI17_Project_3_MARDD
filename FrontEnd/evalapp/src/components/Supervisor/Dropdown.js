import React, {useState} from 'react';
import {AiOutlineCaretUp, AiOutlineCaretDown} from "react-icons/ai"
import {Button} from 'flowbite-react'

let testData = [1, 2, 3, 4, 5]

function Dropdown(){
  const [isOpen, setIsOpen] = useState(false);
  return(
  <div className="relative mt-5">
    <Button className="w-40 flex items-ceter rounded-lg border-transparent active:border-white duration-300 active:text-white"onClick={() => setIsOpen((prev) => !prev)}>Troops
    {!isOpen ?
      (<AiOutlineCaretDown className="h-8" />) :
      ( <AiOutlineCaretUp className="h-8" />)
    }
    </Button>

    {isOpen && (
      <div className="bg-blue-500 absolute top-16 flex flex-col items-start rounded-lg p-2 w-40">
        {testData.map((e) => (
          <div>
            <h3>{e}</h3>
          </div>
        ))}
      </div>
    )}
  </div>
  )
}

export default Dropdown