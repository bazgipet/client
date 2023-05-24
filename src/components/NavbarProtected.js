import React from "react";
import { useNavigate, Link } from "react-router-dom";
import '../design/Navbar.css'

function NavbarProtected () {

    const navigate = useNavigate();
    
    const logout = () => {
        const tokenString = localStorage.getItem("token");
        const token = tokenString ? JSON.parse(tokenString) : null;

        if (token) {
            localStorage.removeItem("token");
            console.log('Sucessfully token removed')
        } else {
            console.log('No token available to remove.')
        }
        navigate(0)
    }

    return (
        <section>
            <ul className="navbar_grid">
                <li><Link to='/'>Smoothie Station</Link></li>
                <li><Link to='/login'>About</Link></li>
                <li><Link to='/my-recipes'>My Recipes</Link></li>
                <li><button onClick={logout}>Log out</button></li>
            </ul>
        </section>
    )
}

export default NavbarProtected