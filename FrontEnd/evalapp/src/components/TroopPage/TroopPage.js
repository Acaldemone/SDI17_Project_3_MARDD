import { useParams, useNavigate, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { Button, Card, Label } from 'flowbite-react'
import EvaluationForm from '../Evaluation/Evaluation.js'



const TroopEvals = ({ troopData, createRecord, first, last }) => {
  const[selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const handleEvaluationSelect = (evaluations) => {
    setSelectedEvaluation(evaluations)
}
  useEffect(() => {
    try{
    if(troopData){
      setSelectedEvaluation(troopData[0])
      setLastName(troopData[0].last_name)
      setFirstName(troopData[0].first_name)
    }
  }catch{
    setLastName(last);
    setFirstName(first)
  }

  }, [troopData, last, first])



  return (
    <div className="flex mb-20 mt-20">
        <div className="ml-40 mr-60 ">
          <div>
        <Button className="w-fit mb-10" onClick={createRecord}>Create Eval Record</Button>
          </div>
        <Card className="w-80">
           <h1>Evaluations For: {lastName}, {firstName}</h1>
            <ul className="flex flex-col gap-4">
              {troopData && troopData.map((evaluations) => (
                <li key={evaluations.id} onClick = {() => handleEvaluationSelect(evaluations)}>
                  <Button>Evaluation Date: {new Date(evaluations.eval_date).toDateString()}</Button>
                </li>
              ))}
                </ul>
          </Card>
        </div>
        {selectedEvaluation && (
        <div>
        <Card className=" w-3/4">
            <div className="w-fit">
                <div className="mb-4 w-full">
                    <Label htmlFor="role" value="Ratee Role" className="mb-2"/>
                    <p>Non-Supervisory</p>
                </div>
                    <div className="mb-4">
                    <Label htmlFor="dod_id" value="DOD ID Number" className="mb-2"/>
                    <p>{selectedEvaluation.user_id}</p>
                </div>
                <div className="mb-4">
                    <Label htmlFor="work_performance" value="Work Performance Rating" className="mb-2"/>
                    <p>{selectedEvaluation.work_performance}</p>
                </div>
                <div className="mb-4">
                    <Label htmlFor="work_performance_comments" value="Work Performance Comments" className="mb-2"/>
                    <p className="w-full">{selectedEvaluation.work_performance_comments}</p>
                </div>
                <div className="mb-4">
                    <Label htmlFor="followership_leadership" value="Followership/Leadership Rating" className="mb-2"/>
                    <p>{selectedEvaluation.followership_leadership}</p>
                </div>
                <div className="mb-4">
                    <Label htmlFor="followership_leadership_comments" value="Followership/Leadership Comments" className="mb-2"/>
                    <p>{selectedEvaluation.followership_leadership_comments}</p>
                </div>
                <div className="mb-4">
                    <Label htmlFor="professional_development" value="Professional Development Rating" className="mb-2"/>
                    <p>{selectedEvaluation.professional_development}</p>
                </div>
                <div className="mb-4">
                    <Label htmlFor="professional_development_comments" value="Professional Development Comments" className="mb-2"/>
                    <p>{selectedEvaluation.professional_development_comments}</p>
                </div>
                <div className="mb-4">
                    <Label htmlFor="self_improvement" value="Self Improvement Rating" className="mb-2"/>
                    <p>{selectedEvaluation.self_improvement}</p>
                </div>
                <div className="mb-4">
                    <Label htmlFor="self_imporvement_comments" value="Self Improvement Comments" className="mb-2"/>
                    <p>{selectedEvaluation.self_improvement_comments}</p>
                </div>
                <div className="mb-4">
                    <Label htmlFor="fitness_test" value="Fitness Test" className="mb-2"/>
                    <p>{selectedEvaluation.passing_fitness ? 'Pass' : 'Fail'}</p>
                </div>
                <div className="mb-4">
                    <Label htmlFor="fitness_test_comments" value="Fitness Test Comments" className="mb-2"/>
                    <p>{selectedEvaluation.fitness_comments}</p>
                </div>
                <div className="mb-4">
                    <Label htmlFor="evaluation_date" value="Evaluation Date" className="mb-2"/>
                    <p>{new Date(selectedEvaluation.eval_date).toDateString()}</p>
                </div>
            </div>
        </Card>
      </div>
          )}
    </div>
  );
}


function TroopPage({supervisor_id, first, last}) {
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
                <Route path="/" element={<TroopEvals troopData={troopData} createRecord = {createRecord} first={first} last={last}/>} />
                <Route path="CreateRecord" element={<EvaluationForm troopData={troopData} id={id} supervisor_id={supervisor_id} first={first} last={last}/>} />
            </Routes>
          </div>
        </div>
    );
}

export default TroopPage;
