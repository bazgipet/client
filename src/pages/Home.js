import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import '../design/Home.css'
import Navbar from "../components/Navbar";
import NavbarProtected from '../components/NavbarProtected';
import Title from "../components/Title";
import RecipeBoard from "../components/RecipeBoard";
import Footer from "../components/Footer";
import AuthContext from "../utils/AuthContext";

function Home() {
    const { isAuthenticated } = useContext(AuthContext);


    return (
        <section>
            {isAuthenticated ? <NavbarProtected /> : <Navbar />}
            <Title />
            <RecipeBoard />
            <Footer />
        </section>
    )
}

export default Home