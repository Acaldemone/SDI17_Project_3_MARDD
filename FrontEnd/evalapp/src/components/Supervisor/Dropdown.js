import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AiOutlineCaretUp, AiOutlineCaretDown} from "react-icons/ai"
import {Button} from 'flowbite-react'


function Dropdown({troop, handleClick}){

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navigateToTroop = (id) => {
    handleClick();
    navigate(`troop/${id}`);
  };

  return(
    <div id="DropDownParrent" className="relative mt-5">
      <Button id="dropDown" className="w-40 flex items-ceter rounded-lg border-transparent active:border-white duration-300 active:text-white"onClick={() => setIsOpen((prev) => !prev)}>Troops
      {!isOpen ?
        (<AiOutlineCaretDown className="h-8" />) :
        ( <AiOutlineCaretUp className="h-8" />)
      }
      </Button>

      {isOpen && (
        <div id="listParent" className="bg-blue-500 absolute top-16 flex flex-col items-start rounded-lg p-2 w-40">
          {troop.map((e) => (
            <div key={e.id}>
              <button  onClick={() => navigateToTroop(e.id)}>{e.last_name}, {e.first_name}</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown
