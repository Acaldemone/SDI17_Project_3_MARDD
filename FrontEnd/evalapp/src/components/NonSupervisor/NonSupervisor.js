import { useEffect, useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import { Card, Button } from 'flowbite-react';
import EvalHistory from '../EvalHistory/EvalHistory.js'


const UserContent = ({ evalList, supervisor }) => {
  const [showHome, setShowHome] = useState(true);

  const handleClick = () => {
    setShowHome(false);
  };

  if (evalList.length < 1) {
    return <p>Fetching data</p>;
  }

  const lastEvalDate = new Date(evalList[0].last_eval_date);
  const evalDueDate = new Date(evalList[0].last_eval_date);
  evalDueDate.setFullYear(evalDueDate.getFullYear() + 1);

  return (
    <div>
      {showHome && (
        <div>
          {evalList.length >= 1 && (
            <div className='flex justify-center h-screen'>
              <div className='flex evalContainer mt-20 h-fit'>
                <Card>
                <h2 className="text-4xl font-extrabold dark:text-white text-center mb-5">Recent Evaluation</h2>
                    <p>Ratee Role: Non-Supervisory</p>
                    <p>DOD ID Number: {evalList[0].user_id}</p>
                    <p>Work performance rating: {evalList[0].work_performance}</p>
                    <p>Work performance comments: {evalList[0].work_performance_comments}</p>
                    <p>Followership/Leadership rating: {evalList[0].followership_leadership}</p>
                    <p>Followership/Leadership comments: {evalList[0].followership_leadership_comments}</p>
                    <p>Professional development rating: {evalList[0].professional_development}</p>
                    <p>Professional development comments: {evalList[0].professional_development_comments}</p>
                    <p>Self improvement rating: {evalList[0].self_improvement}</p>
                    <p>Self improvement comments: {evalList[0].self_improvement_comments}</p>
                    <p>Fitness Test : {evalList[0].passing_fitness ? 'Pass' : 'Fail'}</p>
                    <p>Fitness comments: {evalList[0].fitness_comments}</p>
                    <p>Date of evaluation: {lastEvalDate.toDateString()}</p>
                </Card>
              </div>
              <div className='ml-40 mt-20 h-screen'>
                <Card className='mb-10'>
                  <p>Supervisor: {supervisor[0].first_name} {supervisor[0].last_name}</p>
                  <p>Last Evaluation on: {lastEvalDate.toDateString()}</p>
                  <p>Next Evaluation on: {evalDueDate.toDateString()}</p>
                </Card>
                <Link to="EvalHistory">
                  <Button onClick={() => handleClick()}>Evaluation History</Button>
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
  const [supervisor, setSupervisor] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/users/evals/${user.id}`)
      .then(response => response.json())
      .then(data => {
        setEvalList(data);
      })
      .catch(error => {
        console.error("Error fetching evaluation list:", error);
      });

    fetch(`http://localhost:8080/users/supervisor/${user.supervisor_id}`)
      .then(res => res.json())
      .then(data => setSupervisor(data))
      .catch(error => {
        console.error("Error fetching supervisor:", error);
      });
  }, [user.id, user.supervisor_id]);

  return (
    <div>
      <Routes>
        <Route path='/' element={<UserContent evalList={evalList} supervisor={supervisor} />} />
        <Route path='EvalHistory' element={<EvalHistory evalList={evalList} user={user} />} />

      </Routes>
    </div>
  );
}
