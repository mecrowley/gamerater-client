import React, { useContext, useEffect, useState } from "react"
import { GameContext } from "./GameProvider"
import { useParams } from "react-router-dom"

export const GameDetail = () => {
    const { games, getSingleGame, getGameRatingByUser, createGameRating, updateGameRating } = useContext(GameContext)
    const [game, setGame] = useState({})
    const [rating, setRating] = useState({ rating: 0 })
    const [isEditRating, setIsEditRating] = useState(false)
    const { gameId } = useParams();

    useEffect(() => {
        if (games.length > 0) {
            const game = games.find(g => g.id === parseInt(gameId))
            setGame(game)
        } else {
            getSingleGame(parseInt(gameId))
                .then(setGame)
        }
    }, [gameId])

    useEffect(() => {
        getGameRatingByUser(parseInt(gameId))
            .then(gameRating => {
                if (gameRating.rating) {
                    setRating(gameRating)
                    setIsEditRating(true)
                } else {
                    setRating({ rating: 1 })
                }
            })
    }, [])

    const changeRatingState = (event) => {
        const newRating = { ...rating }
        newRating[event.target.name] = event.target.value
        setRating(newRating)
    }

    return (
        <>
            <section className="game-detail">
                <h2 className="game__title">{game.title}</h2>
                <div className="game__info">
                    <div className="game_description">{game.description}</div>
                    <div className="game_designer">Designer: {game.designer}</div>
                    <div className="game_year_released">Year Released: {game.year_released}</div>
                    <div className="game_number_of_players">Number of Players: {game.number_of_players}</div>
                    <div className="game_gameplay_duration">Playing Time: {game.gameplay_duration}</div>
                    <div className="game_age_recommendation">Recommended age: {game.age_recommendation}+</div>
                    <div className="game_categories">Categories: {game.categories?.map(c => {
                        return c.label
                    }).join(", ")}</div>
                    <div className="game_average_rating">Average Rating: {game.average_rating}</div>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="rating">{isEditRating ? "Your rating: " : "Add your rating: "}</label>
                            <input type="number" min="1" max="10" name="rating" required autoFocus className="form-control"
                                value={rating.rating}
                                onChange={changeRatingState} />
                        </div>
                    </fieldset>
                    <button onClick={e => {
                        e.preventDefault()
                        if (isEditRating) {
                            updateGameRating({
                                id: rating.id,
                                game: rating.game,
                                rating: rating.rating,
                            })
                                .then(() => {
                                    getSingleGame(parseInt(gameId))
                                        .then(game => setGame(game))
                                        .then(() => setIsEditRating(true))
                                })
                        } else {
                            createGameRating({
                                game: parseInt(gameId),
                                rating: rating.rating
                            })
                                .then(setRating)
                                .then(() => {
                                    getSingleGame(parseInt(gameId))
                                        .then(game => setGame(game))
                                        .then(() => setIsEditRating(true))
                                })
                        }
                    }
                    }>Save Rating</button>
                </div>
            </section>
        </>
    )
}