import { useEffect, useState } from "react";

export default function Supervisor () {
    const [troopList, setTroopList] = useState(null);
    const [selectedTroop, setSelectedTroop] = useState(false);



    useEffect(() => {
        fetch(`http://localhost:8080/users/evals/${id}`)
        .then(response => response.json())
        .then(data => {
            let promises = data.results.(troops)
        })
    })

    // function searchTroop(troopId) {
    //     fetch(`http://localhost:8080/users/evals/${troopId}`)
    // }
}

