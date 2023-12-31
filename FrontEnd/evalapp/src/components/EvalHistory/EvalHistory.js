import { useEffect, useState } from "react";
import { Card, Button, Label} from 'flowbite-react';

const EvalHistory =({evalList, latestEval, user}) => {
    const[selectedEvaluation, setSelectedEvaluation] = useState();
    const[selectedId, setSelectedId] = useState(latestEval.id)


    const handleEvaluationSelect = (evaluations) => {
        setSelectedId(evaluations)
    }


    useEffect(() => {

        if (latestEval) {
            console.log(selectedId)
        if(selectedId){
        fetch(`http://localhost:8080/users/evals/target/${selectedId}`)
        .then(response => response.json())
        .then(data => {
            setSelectedEvaluation(data[0]);
        })
        .catch(error => {
            console.error("Error fetching evaluation details:", error);
        });
    }
    }

        },[selectedId, latestEval]);

        if(selectedId === undefined){
            return (
                    <div className="mt-80 w-screen flex justify-center">
                        <h1>There Are Currently No Evaluations</h1>
                    </div>

            )
        }else{
        return (
            <div className="flex h-screen mt-20">
                <div className="h-fit">
                <Card className="mr-80 ml-60">
                <ul className="flex flex-col gap-3">
                    {evalList.map((evaluations) =>(
                        <li key={evaluations.id} onClick = {() => handleEvaluationSelect(evaluations.id)}>
                            <Button>Evaluation Date: {new Date(evaluations.eval_date).toDateString()}</Button>
                        </li>
                    ))}
                </ul>
                </Card>
                </div>
                {selectedEvaluation && (
                    <div className="w-1/2">
                        <Card className="w-fit">
                            <div className="w-fit">
                                <div className="mb-4">
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
}

export default EvalHistory;

