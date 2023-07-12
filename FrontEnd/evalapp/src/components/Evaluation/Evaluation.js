import React, { useState, useEffect } from "react";
import { Card, Button, Label} from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const currentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate
}

const EvaluationForm = ({troopData}) => {
  const [rateeRole, setRateeRole] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [workPerformanceRating, setWorkPerformanceRating] = useState(0);
  const [workPerformanceComments, setWorkPerformanceComments] = useState("");
  const [followershipLeadershipRating, setFollowershipLeadershipRating] = useState(0);
  const [followershipLeadershipComments, setFollowershipLeadershipComments] = useState("");
  const [professionalDevelopmentRating, setProfessionalDevelopmentRating] = useState(0);
  const [professionalDevelopmentComments, setProfessionalDevelopmentComments] = useState("");
  const [selfImprovement, setSelfImprovement] = useState(0);
  const [selfImprovementComments, setSelfImprovementComments] = useState("");
  const [fitness, setFitness] = useState();
  const [fitnessComments, setFitnessComments] = useState("");
  const [EvalDate, setEvalDate] = useState(currentDate());
  const [userId, setUserId] = useState(null);
  const [supervisorId, setSupervisorId] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false)


  useEffect(() => {
    if(troopData){
      setRateeRole(troopData[0].role_id);
      setUserId(troopData[0].user_id);
      setSupervisorId(troopData[0].supervisor_id);
      setLastName(troopData[0].last_name);
      setFirstName(troopData[0].first_name);
    }
  }, [troopData])

  const navigate = useNavigate();

  const handleClick = () => {
    setIsOpenModal(false)
    navigate(`/users/userAccount/${supervisorId}/troop/${userId}`, {replace:true})
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      "ratee_role" : rateeRole,
      "work_performance": workPerformanceRating,
      "work_performance_comments": workPerformanceComments,
      "followership_leadership": followershipLeadershipRating,
      "followership_leadership_comments": followershipLeadershipComments,
      "professional_development": professionalDevelopmentRating,
      "professional_development_comments": professionalDevelopmentComments,
      "self_improvement": selfImprovement,
      "self_improvement_comments": selfImprovementComments,
      "passing_fitness": fitness,
      "fitness_comments": fitnessComments,
      "eval_date": EvalDate,
      "user_id": userId,
      "supervisor_id": supervisorId
    };

    const updateUserData = {
      "last_eval_date": EvalDate
    }


    const response = await fetch(`http://localhost:8080/users/evals`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('Evaluation has been submitted.');
    } else {
      alert('Error submitting evaluation.');
    }

    const response2 = await fetch(`http://localhost:8080/users/${userId}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updateUserData)
    })
    if (response2.ok) {
      setRateeRole("");
      setWorkPerformanceRating(0);
      setWorkPerformanceComments("");
      setFollowershipLeadershipRating(0);
      setFollowershipLeadershipComments("");
      setProfessionalDevelopmentRating(0);
      setProfessionalDevelopmentComments("");
      setSelfImprovement(0);
      setSelfImprovementComments("");
      setFitness()
      setFitnessComments("")
      setIsOpenModal(true)
    } else {
      alert('Failed to Submit');
    }


  };

  return (
    <div className="flex justify-center">
            {isOpenModal && (
        <div className="flex justify-center opacity-80 bg-zinc-200  fixed insert-0 z-50">
        <div className="flex h-screen w-screen justify-center items-center">
            <div className="flex flex-col justify-center items-center bg-white py-12 px-24 border-4 border-sky-500 rounded-xl">
                <div className="flex text-lg text-zinc-600 mb-10">Evaluation Has Been Submitted</div>
                <div className="flex">
                    <Button onClick={handleClick} className="rounded px-4 py-2 text-white">OK</Button>
                </div>
            </div>
        </div>
    </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-row gap-4 mt-40">
        <Card className="flex flex-col items-center mr-10">
          <h1 className="text-center">{lastName}, {firstName} Evaluation</h1>
          <div>
          <div className="mb-4">
                      <Label htmlFor="ratee_role" value="Ratee Role"/>
                      <p>{rateeRole === 1 ? 'Non-Supervisory' : 'Supervisory'}</p>
                  </div>
                  <div className="mb-4">
                  <Label htmlFor="default-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Work Performance Rating</Label>
                  <input
                    id="default-range"
                    type="range"
                    min="0"
                    max="5"
                    step="1"
                    value={workPerformanceRating}
                    onChange={(e) => setWorkPerformanceRating(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <pre>0        1        2        3        4        5</pre>
                  </div>

                  <div className="mb-4">
                  <label htmlFor="work_performance_comments" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Work Performance Comments</label>
                  <textarea
                      id="work_performance_comments"
                      value={workPerformanceComments}
                      onChange={(e) => setWorkPerformanceComments(e.target.value)}
                      rows="7"
                      width="700px"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter comments about the member's work performance."
                      required
                  ></textarea>
              </div>

                  <div>
                  <Label htmlFor="default-range1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Followership/Leadership Rating</Label>
                  <input
                    id="default-range1"
                    type="range"
                    min="0"
                    max="5"
                    value={followershipLeadershipRating}
                    onChange={(e) => setFollowershipLeadershipRating(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <pre>0        1        2        3        4        5</pre>
                  </div>
                  <div>
                    <label htmlFor="followership_leadership_comments" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Followership Leadership Comments</label>
                    <textarea
                        id="followership_leadership_comments"
                        value={followershipLeadershipComments}
                        onChange={(e) => setFollowershipLeadershipComments(e.target.value)}
                        rows="7"
                        width="500px"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter comments about the member's followership and leadership skills."
                        required
                    ></textarea>
                </div>
                <div className="mt-4">
                  <Label htmlFor="default-range2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Self Improvement Rating</Label>
                  <input
                    id="default-range2"
                    type="range"
                    min="0"
                    max="5"
                    value={selfImprovement}
                    onChange={(e) => setSelfImprovement(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <pre>0        1        2        3        4        5</pre>
                  </div>
          </div>

        </Card>
        <Card className="flex flex-col items-center ml-10">
          <div>
          <div>
          <div className="mb-4">
                    <label htmlFor="self_improvement_comments" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Self Improvement Comments</label>
                    <textarea
                        id="self_improvement_comments"
                        value={selfImprovementComments}
                        onChange={(e) => setSelfImprovementComments(e.target.value)}
                        rows="7"
                        width="500px"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter comments about the member's self improvement."
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                  <div className="mb-2">
                  <Label htmlFor="default-range3" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Professional Development Rating</Label>
                  <input
                    id="default-range3"
                    type="range"
                    min="0"
                    max="5"
                    value={professionalDevelopmentRating}
                    onChange={(e) => setProfessionalDevelopmentRating(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <pre>0        1        2        3        4        5</pre>
                  </div>
                  <label htmlFor="professional_development_comments" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Professional Development Comments</label>
                    <textarea
                        id="professional_development_comments"
                        value={professionalDevelopmentComments}
                        onChange={(e) => setProfessionalDevelopmentComments(e.target.value)}
                        rows="7"
                        width="500px"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter comments about the member's professional development."
                        required
                    ></textarea>
                  </div>
                  </div>
                  <div className="mb-4">
                  <div className="mb-2">
                      <Label htmlFor="fitness" value="Fitness Assessment Status:"  className="mr-2" />

                      <input
                          className="mx-auto"
                          type="radio"
                          name="flexRadioDefault"
                          id="radioDefault01"
                           onChange={(e) => setFitness(true)}/>
                        <label
                          className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer mr-2"
                          htmlFor="radioDefault01">
                          Pass
                        </label>

                      <input
                          className="mx-auto"
                          type="radio"
                          name="flexRadioDefault"
                          id="radioDefault02"
                          onChange={(e) => setFitness(false)}/>
                        <label
                          className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                          htmlFor="radioDefault02">
                          Fail
                        </label>
                  </div>

                  <div>
                    <label htmlFor="fitness_comments" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fitness Comments</label>
                    <textarea
                        id="fitness_comments"
                        value={fitnessComments}
                        onChange={(e) => setFitnessComments(e.target.value)}
                        rows="4"
                        width="500px"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter comments about the member's recent fitness assessment."
                        required
                    ></textarea>
                </div>
                </div>
          </div>
          <Button type="submit">Submit</Button>
        </Card>
      </form>

      <Card className="h-fit ml-20 mt-40">
        <div>
          <Label htmlFor="user_id" value="Ratee DOD ID Number" />
          <p>{userId}</p>
        </div>
        <div>
          <Label htmlFor="supervisor_id" value="Rater DOD ID Number" />
          <p>{supervisorId}</p>
        </div>
        <div>
          <Label htmlFor="eval_date" value="Evaluation Date" />
          <p>{EvalDate}</p>
        </div>
      </Card>
    </div>


  );
  };

export default EvaluationForm;
