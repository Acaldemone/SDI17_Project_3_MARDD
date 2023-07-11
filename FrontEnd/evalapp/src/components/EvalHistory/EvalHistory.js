import { useEffect, useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';


const EvalHistory =({evalList}) => {
    const[selectedEvaluation, setSelectedEvaluation] = useState(null);
    const handleEvaluationSelect = (evaluations) => {
        setSelectedEvaluation(evaluations)
        console.log('selected eval', selectedEvaluation)
    }

    return (
        <div>
            <h2>Evaluation History</h2>
            <ul>
                {evalList.map((evaluations) =>(
                    <li key={evaluations.id} onClick = {() => handleEvaluationSelect(evaluations)}>
                        Evaluation ID:{evaluations.id}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default EvalHistory;

