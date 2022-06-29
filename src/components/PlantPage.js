import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

const [plants, setPlants] = useState([])
const [filteredPlants, setFilteredPlants] = useState(plants)

function handleSearch(e) {
  const filteredPlants = plants.filter(plant => {
    return plant.name.toLowerCase().includes(e.target.value)
  })
  setFilteredPlants(filteredPlants)
}

function addNewPlant(newPlant) {
  const updatedPlants ={...plants, newPlant}
  setPlants(updatedPlants)
}

useEffect(() => {
  setFilteredPlants(plants)
}, [plants])

useEffect(() => {
  fetch(`http://localhost:6001/plants`)
  .then(r => r.json())
  .then(data => {
    setPlants(data)})
}, [])


  return (
    <main>
      <NewPlantForm addNewPlant={addNewPlant}/>
      <Search handleSearch={handleSearch} />
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;
