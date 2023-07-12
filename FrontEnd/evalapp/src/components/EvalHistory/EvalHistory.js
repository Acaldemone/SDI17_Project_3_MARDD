import { useEffect, useState } from "react";
import { Card, Button, Label} from 'flowbite-react';

const EvalHistory =({evalList, latestEval, user}) => {
    const recentEval = latestEval
    const[selectedEvaluation, setSelectedEvaluation] = useState();


    const handleEvaluationSelect = (evaluations) => {
        setSelectedEvaluation(evaluations)
    }

    console.log(evalList)
    useEffect(() => {
        if (selectedEvaluation !== null) {
        fetch(`http://localhost:8080/users/evals/${selectedEvaluation.id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setSelectedEvaluation(data);
        })
        .catch(error => {
            console.error("Error fetching evaluation details:", error);
        });
            }
        },[]);

        return (
            <div className="flex h-screen mt-20">
                <div>
                <Card className="w-fit mr-80 ml-60 flex">
                <ul>
                    {evalList.map((evaluations) =>(
                        <li key={evaluations.id} onClick = {() => handleEvaluationSelect(evaluations)}>
                            <Button className='mb-10'>Evaluation Date: {new Date(evaluations.eval_date).toDateString()}</Button>
                        </li>
                    ))}
                </ul>
                </Card>
                </div>
                {selectedEvaluation && (
        <div className="w-fit">
            <Card className="w-fit">
                <div className="w-fit">
                    <div className="mb-4">
                        <Label htmlFor="role" value="Ratee Role" className="mb-2" />
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
                        <p>{selectedEvaluation.work_performance_comments}</p>
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
        )
}

export default EvalHistory;

