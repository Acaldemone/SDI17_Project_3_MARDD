import { useEffect, useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import { Card, Button} from 'flowbite-react';
import Dropdown from './Dropdown.js'

export default function Supervisor({ user }) {
  const [evalList, setEvalList] = useState([]);
  const [troops, setTroops]= useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/users/evals/${user.id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setEvalList(data);
      })
      .catch(error => {
        console.error("Error fetching evaluation list:", error);
      });

      fetch(`http://localhost:8080/users/troops/${user.id}`)

  }, [user.id]);

  const UserContent = () => {
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
                    <p>Ratee Role: Supervisory</p>
                    <p>DOD ID Number: {evalList[0].user_id}</p>
                    <p>Work performance rating: {evalList[0].work_performance}</p>
                    <p>Work performance comments: {evalList[0].work_performance_comments}</p>
                    <p>Followership/Leadership rating: {evalList[0].followership_leadership}</p>
                    <p>Followership/Leadership comments: {evalList[0].followership_leadership_comments}</p>
                    <p>Professional development rating: {evalList[0].professional_development}</p>
                    <p>Professional development comments: {evalList[0].professional_development_comments}</p>
                    <p>Self improvement rating: {evalList[0].self_improvement}</p>
                    <p>Self improvement comments: {evalList[0].self_improvement_comments}</p>
                    <p>Fitness Test: {evalList[0].passing_fitness ? 'Pass' : 'Fail'}</p>
                    <p>Fitness comments: {evalList[0].fitness_comments}</p>
                    <p>Date of evaluation: {lastEvalDate.toDateString()}</p>
                  </Card>
                </div>
                <div className='ml-40 mt-20 h-screen'>
                  <Card className='mb-10'>
                    <p>Last Evaluation on: {lastEvalDate.toDateString()}</p>
                    <p>Next Evaluation on: {evalDueDate.toDateString()}</p>
                  </Card>
                  <Link to="/users/userAccount/EvalHistory">
                    <Button onClick={handleClick}>Evaluation History</Button>
                  </Link>
                  <Dropdown />
                </div>
              </div>
            )}
          </div>
        )}
        <Routes>
          <Route path="/users/userAccount/EvalHistory" element={<evalHistory evalList={evalList} />} />
        </Routes>
      </div>
    );
  };

  return (
    <div>
      <UserContent />
    </div>
  );
}
