import React, { useContext, useEffect, useState } from "react"
import { GameContext } from "./GameProvider"
import { useParams } from "react-router-dom"

export const GameDetail = () => {
    const { games, getSingleGame } = useContext(GameContext)
    const [game, setGame] = useState({})
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
                </div>
            </section>
        </>
    )
}