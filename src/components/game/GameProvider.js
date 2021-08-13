import React, { useState } from "react"

export const GameContext = React.createContext()

export const GameProvider = (props) => {
    const [ games, setGames ] = useState([])
    const [ categories, setCategories ] = useState([])


    const getGames = () => {
        return fetch("http://localhost:8000/games", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
            .then(setGames)
    }

    const getSingleGame = id => {
        return fetch(`http://localhost:8000/games/${id}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
    }

    const createGame = (game) => {
        return fetch("http://localhost:8000/games", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            },
            body: JSON.stringify(game)
        })
            .then(response => response.json())
    }
    
    const getCategories = () => {
        return fetch("http://localhost:8000/categories", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
            .then(setCategories)
    }

    const getGameCategories = () => {
        return fetch("http://localhost:8000/gamecategories", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
    }
    
    const createGameCategory = (gameCategory) => {
        return fetch("http://localhost:8000/gamecategories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            },
            body: JSON.stringify(gameCategory)
        })
        .then(response => response.json())
    }
    
    const getGameRatingByUser = gameId => {
        return fetch(`http://localhost:8000/gameratings/${gameId}/user_rating`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
    }

    const createGameRating = gameRating => {
        return fetch('http://localhost:8000/gameratings', {
        method: "POST",    
        headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            },
            body: JSON.stringify(gameRating)
        })
        .then(response => response.json())
    }

    const updateGameRating = (gameRating) => {
        return fetch(`http://localhost:8000/gameratings/${gameRating.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            },
            body: JSON.stringify(gameRating)
        })
    }

    return (
        <GameContext.Provider value={{ games, categories, getGames, getSingleGame, getCategories,
                                        getGameCategories, getGameRatingByUser, createGame, createGameCategory,
                                        createGameRating, updateGameRating}} >
            { props.children }
        </GameContext.Provider>
    )
}
