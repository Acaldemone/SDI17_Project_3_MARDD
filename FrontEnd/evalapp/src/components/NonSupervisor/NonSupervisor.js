import { useEffect, useState } from "react";
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { Card, Button, Label} from 'flowbite-react';
import EvalHistory from '../EvalHistory/EvalHistory.js'
import LoadingScreen from '../Spinner/Spinner.js'


const UserContent = ({ evalList, latestEval, troop, loading, supervisorName}) => {
  const [showHome, setShowHome] = useState(true);

  const handleClick = () => {
    setShowHome(false);
  };
  if (loading) {
    return <LoadingScreen />
  }
  const lastEvalDate = new Date(latestEval.eval_date);
  const evalDueDate = new Date(latestEval.eval_date);
  evalDueDate.setFullYear(evalDueDate.getFullYear() + 1);
  return (
    <div >
      {showHome && (
        <div>
          {latestEval && (
            <div className='flex mt-20 ml-80 justify-center'>
              <div className='h-fit w-1/2'>
                    <Card className=" w-fit ml-40 mr-20">
                      <h2 className="text-4xl font-extrabold dark:text-white text-center mb-5">Recent Evaluation</h2>
                      <div className="">
                          <div className="mb-4 w-full">
                              <Label htmlFor="role" value="Ratee Role" className="mb-2" />
                              <p>Non-Supervisory</p>
                          </div>
                              <div className="mb-4">
                              <Label htmlFor="dod_id" value="DOD ID Number" className="mb-2"/>
                              <p>{latestEval.user_id}</p>
                          </div>
                          <div className="mb-4">
                              <Label htmlFor="work_performance" value="Work Performance Rating" className="mb-2"/>
                              <p>{latestEval.work_performance}</p>
                          </div>
                          <div className="w-full">
                              <Label htmlFor="work_performance_comments" value="Work Performance Comments" className="mb-2"/>
                              <p className="w-full">{latestEval.work_performance_comments}</p>
                          </div>
                          <div className="mb-4">
                              <Label htmlFor="followership_leadership" value="Followership/Leadership Rating" className="mb-2"/>
                              <p>{latestEval.followership_leadership}</p>
                          </div>
                          <div className="mb-4">
                              <Label htmlFor="followership_leadership_comments" value="Followership/Leadership Comments" className="mb-2"/>
                              <p>{latestEval.followership_leadership_comments}</p>
                          </div>
                          <div className="mb-4">
                              <Label htmlFor="professional_development" value="Professional Development Rating" className="mb-2"/>
                              <p>{latestEval.professional_development}</p>
                          </div>
                          <div className="mb-4">
                              <Label htmlFor="professional_development_comments" value="Professional Development Comments" className="mb-2"/>
                              <p>{latestEval.professional_development_comments}</p>
                          </div>
                          <div className="mb-4">
                              <Label htmlFor="self_improvement" value="Self Improvement Rating" className="mb-2"/>
                              <p>{latestEval.self_improvement}</p>
                          </div>
                          <div className="mb-4">
                              <Label htmlFor="self_imporvement_comments" value="Self Improvement Comments" className="mb-2"/>
                              <p>{latestEval.self_improvement_comments}</p>
                          </div>
                          <div className="mb-4">
                              <Label htmlFor="fitness_test" value="Fitness Test" className="mb-2"/>
                              <p>{latestEval.passing_fitness ? 'Pass' : 'Fail'}</p>
                          </div>
                          <div className="mb-4">
                              <Label htmlFor="fitness_test_comments" value="Fitness Test Comments" className="mb-2"/>
                              <p>{latestEval.fitness_comments}</p>
                          </div>
                          <div className="mb-4">
                              <Label htmlFor="evaluation_date" value="Evaluation Date" className="mb-2"/>
                              <p>{new Date(latestEval.eval_date).toDateString()}</p>
                          </div>
                      </div>
                    </Card>
              </div>
              <div className='mr-40 h-screen'>
                <Card className='mb-10'>
                  <p>Supervisor: {supervisorName.last_name}, {supervisorName.first_name}</p>
                  <p>Last Evaluation on: {lastEvalDate.toDateString()}</p>
                  <p>Next Evaluation on: {evalDueDate.toDateString()}</p>
                </Card>
                <Link to="EvalHistory"><Button>Evalaluation History</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function NonSupervisor({ user }) {
  const [evalList, setEvalList] = useState([]);
  const [latestEval, setLatestEval] = useState("")
  const [loading, setLoading] = useState(true)
  const [supervisorName, setSupervisorName] = useState({})

  useEffect(() => {
      fetch(`http://localhost:8080/users/evals/latest/${user.id}`)
        .then(response => response.json())
        .then(data => {
          setEvalList(data.evalHistory);
          setLatestEval(data.latestEval);
        })
    .then(() => {
      setLoading(false);
    })
    .catch(error => {
      console.error("Error:", error);
    });

    fetch(`http://localhost:8080/users/supervisor/${user.supervisor_id}`)
    .then(res => res.json())
    .then(data => {
      setSupervisorName(data[0])
    })
  }, [user.id, user.supervisor_id]);



  return (

    <div>
      <Routes>
        <Route path='/' element={<UserContent evalList={evalList} latestEval={latestEval} loading={loading} supervisorName = {supervisorName}/>} />
        <Route path='EvalHistory' element={<EvalHistory evalList={evalList} latestEval={latestEval} user={user} />} />
      </Routes>
    </div>
  );
}
