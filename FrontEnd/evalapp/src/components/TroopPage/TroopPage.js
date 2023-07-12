import { useParams, useNavigate, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { Button, Card } from 'flowbite-react'
import EvaluationForm from '../Evaluation/Evaluation.js'



const TroopEvals = ({ troopData, createRecord }) => {
  const[selectedEvaluation, setSelectedEvaluation] = useState(null);
  const handleEvaluationSelect = (evaluations) => {
    setSelectedEvaluation(evaluations)
}
  useEffect(() => {
    if(troopData){
      setSelectedEvaluation(troopData[0])
    }
  }, [troopData])



  return (
    <div className="flex justify-center items-center">
        <div>
          <Card>
            <ul>
            <h1>Evaluations for:</h1>
            <h2>{troopData?.[0]?.last_name}, {troopData?.[0]?.first_name}</h2>
              {troopData && troopData.map((evaluations) => (
                <li key={evaluations.id} onClick = {() => handleEvaluationSelect(evaluations)}>
                  <Button className='mb-10'>Evaluation Date: {evaluations.eval_date}</Button>
                </li>
              ))}
                </ul>
          </Card>
          <Button className="mt-5 ml-20" onClick={createRecord}>Create Eval Record</Button>
        </div>
        {selectedEvaluation && (
        <div>
          <Card className="flex flex-col items-center mr-10">
            <ul>
                  <li>DOD ID Number: {selectedEvaluation.user_id}</li>
                  <li>Work performance rating: {selectedEvaluation.work_performance}</li>
                  <li>Work performance comments: {selectedEvaluation.work_performance_comments}</li>
                  <li>Followership/Leadership rating: {selectedEvaluation.followership_leadership}</li>
                  <li>Followership/Leadership comments: {selectedEvaluation.followership_leadership_comments}</li>
                  <li>Professional development rating: {selectedEvaluation.professional_development}</li>
                  <li>Professional development comments: {selectedEvaluation.professional_development_comments}</li>
                  <li>Self improvement rating:{selectedEvaluation.self_improvement}</li>
                  <li>Self imporvement comments: {selectedEvaluation.self_improvement_comments}</li>
                  <li>Fitness test: {selectedEvaluation.passing_fitness ? 'Pass' : 'Fail'}</li>
                  <li>Fitness comments: {selectedEvaluation.fitness_comments}</li>
                  <li>Last eval date: {selectedEvaluation.last_eval_date}</li>
            </ul>
          </Card>
        </div>
          )}
      </div>

  );

}


function TroopPage() {
    const { id } = useParams();
    const [troopData, setTroopData] = useState();
    const navigate = useNavigate()

    const createRecord = () => {
      navigate('CreateRecord')
    }

    useEffect(() => {
        fetch(`http://localhost:8080/users/evals/${id}`)
            .then(res => res.json())
            .then(data => setTroopData(data))
            .catch(error => {
              console.error("Error fetching evaluation details:", error);
          });
    }, [id])


    return (
        <div>
          <div>
            <Routes>
                <Route path="/" element={<TroopEvals troopData={troopData} createRecord = {createRecord}/>} />
                <Route path="CreateRecord" element={<EvaluationForm troopData={troopData} />} />
            </Routes>
          </div>
        </div>
    );
}

export default TroopPage;
