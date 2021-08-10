import React, { useContext, useEffect } from "react"
import { useHistory, Link } from "react-router-dom"
import { GameContext } from "./GameProvider.js"

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)
    const history = useHistory()

    useEffect(() => {
        getGames()
    }, [])

    return (
        <>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>

            <article className="games">

                {
                    games.map(game => {
                        return <>
                            <div className="game__title">
                                <Link to={`/games/detail/${game.id}`}>
                                    <h3>{game.title}</h3>
                                </Link>
                            </div>
                        </>
                    })
                }
            </article>
        </>
    )
}
