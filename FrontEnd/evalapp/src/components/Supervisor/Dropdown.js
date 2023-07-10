import React, {useState} from 'react';
import {AiOutlineCaretUp, AiOutlineCaretDown} from "react-icons/ai"

let testData = [1, 2, 3, 4, 5]

function Dropdown(){
  const [isOpen, setIsOpen] = useState(false);
  return(
  <div>
    <button onCLick={() => setIsOpen((prev) => !prev)}>Dropdown
    {!isOpen ?
      (<AiOutlineCaretDown className="h-8" />) :
      ( <AiOutlineCaretUp className="h-8" />)
    }
    </button>

    {isOpen && (
      <div>
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