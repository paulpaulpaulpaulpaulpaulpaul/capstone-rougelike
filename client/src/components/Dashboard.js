import { useState, useEffect, useContext  } from "react";
import { useNavigate } from "react-router-dom";
import GameLoadCard from "./GameLoadCard";
import { addGame } from "../services/game-api";

function Dashboard() {

    const navigate = useNavigate();
    const player = JSON.parse(localStorage.getItem("player"));
    const games = player.games;
    const newGame = {
        score: 0,
        isBlueprint: "true" //does this need the quotes or not
    }

    function displayGames() {
        return games.map(g => (
            <GameLoadCard game={g} />
        ));
    }

    function loadNewGame(){
        
        addGame(newGame)
        // if success:
        //localStorage.setItem("game", JSON.stringify(newGame))
        //navigate("/play")

    }


    return (
        <div>
            <div>
                <div>
                    <center>
                        <button type="button" className="btn p-3 btn-lrg btn-danger">
                            Edit Profile
                        </button> </center>
                </div>
                <div>
                    <center>
                        <button type="button" className="btn btn-lrg btn-info" onClick ={() => loadNewGame()}>
                            Start a New Game!
                        </button></center>
                </div>
                <div>
                    {displayGames()}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;