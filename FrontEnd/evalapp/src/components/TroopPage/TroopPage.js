import { useParams, useNavigate, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { Button, Card } from 'flowbite-react'
import EvaluationForm from '../Evaluation/Evaluation.js'

const TroopEvals = ({ troopData }) => {
  return (
      <Card>
          <h1>{troopData?.[0]?.last_name}, {troopData?.[0]?.first_name} Evals</h1>
          <ul>
          {troopData && troopData.map((e) => (
              <li key={e.id}>
                {e.eval_date} eval
              </li>
          ))}
          </ul>
      </Card>
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
    }, [id])

    console.log(troopData)
    return (
        <div className="flex justify-center">
          <div>
            <Card className="mt-20 mr-40">
              <p>eval</p>
            </Card>
          </div>
          <div className="mt-20 ml-40">
            <Routes>
                <Route path="/" element={<TroopEvals troopData={troopData} />} />
                <Route path="CreateRecord" element={<EvaluationForm />} />
            </Routes>
            <Button className="mt-5" onClick={createRecord}>Create Eval Record</Button>
          </div>
        </div>
    );
}

export default TroopPage;
