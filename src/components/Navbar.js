import React from "react";
import '../design/Navbar.css'

function Navbar () {
    return (
        <section>
            <ul className="navbar_grid">
                <li><a href='/'>Smoothie Station</a></li>
                <li><a href=''>About</a></li>
                <li><a href='/login'>Log in</a></li>
                <li><a href='/signup'>Sign up</a></li>
            </ul>
        </section>
    )
}

export default Navbar