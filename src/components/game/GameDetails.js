import React, { useContext, useEffect, useState } from "react"
import { GameContext } from "./AnimalProvider"
import "./Animal.css"
import { useParams, useHistory } from "react-router-dom"

export const AnimalDetail = () => {
    const { animals, getAnimalById, releaseAnimal } = useContext(AnimalContext)
    const [animal, setAnimal] = useState({ location: {}, customer: {} })
    const { animalId } = useParams();

    useEffect(() => {
        if (animals.length > 0) {
            const animalObj = animals.find(a => a.id === parseInt(animalId))
            setAnimal(animalObj)
        } else {

            getAnimalById(parseInt(animalId))
                .then(animalObj => setAnimal(animalObj))
        }
    }, [animalId])

    const history = useHistory()

    const handleRelease = () => {
        releaseAnimal(animal.id)
            .then(() => {
                history.push("/animals")
            })
    }

    return (
        <>
            <section className="animalDetail">
                <h2 className="animal__name">{animal.name}</h2>
                <div className="animal__info">
                    <div className="animal__breed">Breed: {animal.breed}</div>
                    <div className="animal__location">Location: {animal.location.name}</div>
                    <div className="animal__owner">Customer: {animal.customer.name}</div>
                    <button className="detailButton" onClick={() => {
                        history.push(`/animals/edit/${animal.id}`)
                    }}>Edit</button>
                    <button className="detailButton" onClick={handleRelease}>Release Animal</button>
                </div>
            </section>
        </>
    )
}