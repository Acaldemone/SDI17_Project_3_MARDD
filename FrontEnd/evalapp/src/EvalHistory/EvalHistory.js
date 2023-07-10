import { useEffect, useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';


const EvalHistory =({evalList}) =>{
    const handleEvaluationSelect = (evaluation) =>{
console.log('selected eval', evaluation)
    }

    return (
        <div>
            <h2>Evaluation History</h2>
            <ul></ul>
        </div>
    )
}

export default EvalHistory;

