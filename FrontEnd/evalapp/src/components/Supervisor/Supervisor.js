import { useEffect, useState } from "react";
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { Card, Button} from 'flowbite-react';
import Dropdown from './Dropdown.js'
import TroopPage from '../TroopPage/TroopPage.js'
import EvalHistory from '../EvalHistory/EvalHistory.js'

const UserContent = ({ evalList, latestEval, troop, loading }) => {
  const [showHome, setShowHome] = useState(true);

  const handleClick = () => {
    setShowHome(false);
  };
  if (loading) {
    return <p>Fetching data</p>;
  }
  const lastEvalDate = new Date(latestEval.eval_date);
  const evalDueDate = new Date(latestEval.eval_date);
  evalDueDate.setFullYear(evalDueDate.getFullYear() + 1);
  return (
    <div>
      {showHome && (
        <div>
          {latestEval && (
            <div className='flex justify-center h-screen'>
              <div className='flex evalContainer mt-20 h-fit'>
                <Card>
                <h2 className="text-4xl font-extrabold dark:text-white text-center mb-5">Recent Evaluation</h2>
                    <p>Ratee Role: Supervisory</p>
                    <p>DOD ID Number: {latestEval.user_id}</p>
                    <p>Work performance rating: {latestEval.work_performance}</p>
                    <p>Work performance comments: {latestEval.work_performance_comments}</p>
                    <p>Followership/Leadership rating: {latestEval.followership_leadership}</p>
                    <p>Followership/Leadership comments: {latestEval.followership_leadership_comments}</p>
                    <p>Professional development rating: {latestEval.professional_development}</p>
                    <p>Professional development comments: {latestEval.professional_development_comments}</p>
                    <p>Self improvement rating: {latestEval.self_improvement}</p>
                    <p>Self improvement comments: {latestEval.self_improvement_comments}</p>
                    <p>Fitness Test: {latestEval.passing_fitness ? 'Pass' : 'Fail'}</p>
                    <p>Fitness comments: {latestEval.fitness_comments}</p>
                    <p>Date of evaluation: {lastEvalDate.toDateString()}</p>
                </Card>
              </div>
              <div className='ml-40 mt-20 h-screen'>
                <Card className='mb-10'>
                {/* <p>Supervisor: {supervisor[0].first_name} {supervisor[0].last_name}</p> */}
                  <p>Last Evaluation on: {lastEvalDate.toDateString()}</p>
                  <p>Next Evaluation on: {evalDueDate.toDateString()}</p>
                </Card>
                <Link to="EvalHistory"><Button>Evalaluation History</Button>
                </Link>
                <Dropdown troop={troop} handleClick = {handleClick}/>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function Supervisor({ user }) {
  const [evalList, setEvalList] = useState([]);
  const [troop, setTroop] = useState([]);
  const [latestEval, setLatestEval] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:8080/users/evals/latest/${user.id}`)
        .then(response => response.json())
        .then(data => {
          setEvalList(data.evalHistory);
          setLatestEval(data.latestEval);


        }),
      fetch(`http://localhost:8080/users/troops/${user.id}`)
        .then(res => res.json())
        .then(data => setTroop(data))
    ])
    .then(() => {
      setLoading(false);
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }, [user.id]);



  return (

    <div>
      <Routes>
        <Route path='/' element={<UserContent evalList={evalList} latestEval={latestEval} troop={troop} loading={loading} />} />
        <Route path='EvalHistory' element={<EvalHistory evalList={evalList} latestEval={latestEval} user={user} />} />
        <Route path='troop/:id/*' element={<TroopPage latestEval={latestEval}/>} />
      </Routes>
    </div>
  );
}
