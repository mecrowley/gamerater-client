import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList"
import { GameDetail } from "./game/GameDetail"
import { GameProvider } from "./game/GameProvider"
import { GameForm } from "./game/GameForm"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>

            <GameProvider>
                <Route exact path="/">
                    <GameList />
                </Route>
                <Route exact path="/games">
                    <GameList />
                </Route>
                <Route exact path="/games/new">
                    <GameForm />
                </Route>
                <Route exact path="/games/detail/:gameId(\d+)">
                    <GameDetail />
                </Route>
            </GameProvider>
        </main>
    </>
}