import React, { useEffect, useState } from 'react';

function UserPage({ userId }) {
    const [evaluation, setEvaluation] = useState(null);
    const [supervisor, setSupervisor] = useState(null);


    useEffect(() => {
        fetch(`https:localhost:8080/users/${userId}`)
        .then(res => res.json())
        .then(data => {
            
        })
    })
}

//     useEffect(() => {
//         const fetchData = async () => {
//             try{
//                 const evaluationResponse = await fetch(`https:localhost:8080/users/evals/${match.params.id}`);

//                 const evaluationData = evaluationResponse.json();
//                 setEvaluation(evaluationData);

//                 const supervisorResponse = await fetch(`https:localhost:8080/users/${match.params.supervisor_id}`);
//                 const supervisorData = supervisorResponse.json();
//                 setSupervisor(supervisorData);
//             } catch {
//                 console.log('error');
//             }
//         };
//         fetchData();
//     }, [match.params.id]);


// }

// const renderSupervisorInfo = () => {
//     return (
//         <div>
//             <p>Supervisor: </p>
//             <p>Next Evaluation due: </p>
//         </div>
//     )
