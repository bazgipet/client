import React from "react";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import '../design/RecipeBoard.css'
import SmoothieTile from "./SmoothieTile";



function RecipeBoard() {
    return (
        <section className="recipeBoard">
            <h2>Let's find best smoothie for you!</h2>
            <div className="search_recipe">
                <input type="text" placeholder="Mojito"/>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="glass_icon"/>
            </div>
            <ul className="smoothie_grid">
            <SmoothieTile />
            <SmoothieTile />
            <SmoothieTile />
            <SmoothieTile />
            <SmoothieTile />
            <SmoothieTile />
            <SmoothieTile />
            </ul>
        </section>
    )
}

export default RecipeBoard