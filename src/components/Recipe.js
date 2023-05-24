import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faMartiniGlass, faRectangleList } from '@fortawesome/free-solid-svg-icons'
import '../design/Recipe.css'
import img from '../img/mojito.jpg'

function RecipeDetail() {
    return (
        <section className="recipe_main">
            <section className="recipe_detail">
                <img src={img} />
                <div className="recipe_right_part">
                    <h2>Mojito</h2>
                    <div>
                        <FontAwesomeIcon icon={faClock} />
                        <span>25 minutes</span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faMartiniGlass} />
                        <span>4 serves</span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faRectangleList} />
                        <ul>
                            <li>Lemon</li>
                            <li>Sprite</li>
                            <li>White rum</li>
                            <li>Brown Sugar</li>
                        </ul>
                    </div>
                </div>

            </section>
            <article className="recipe_steps">
                <ol>
                    <li>
                    Muddle the lime juice, sugar and mint leaves in a small jug, crushing the mint as you go – you can use the end of a rolling pin for this. 
                    Pour into a tall glass and add a handful of ice.
                    </li>
                    <li>
                    Pour over the rum, stirring with a long-handled spoon. Top up with soda water, garnish with mint and serve.
                    </li>
                </ol>
            </article>
        </section>

    )
}

export default RecipeDetail