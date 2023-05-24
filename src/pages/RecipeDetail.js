import React from "react";
import '../design/SignUp.css'
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Recipe from "../components/Recipe";

function RecipeDetail () {
    console.log('Hello')
    return(
        <section>
            <Navbar />
            <Recipe />
            <Footer />
        </section>
    )
}

export default RecipeDetail