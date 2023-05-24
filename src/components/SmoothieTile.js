import React from "react";
import '../design/SmoothieTile.css'
const img = require('../img/mojito.jpg')

function SmoothieTile() {
    return (
        <li className="smoothie_tile">
            <img src={img} />
            <div className="tile_bottom_part">
                <h3>Mojito with lemon</h3>
                <span>15 minutes</span>
            </div>

        </li>
    )
}

export default SmoothieTile