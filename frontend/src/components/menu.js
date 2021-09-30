import React from "react";
import {Link} from "react-router-dom";

const Menu = () => {
    return (
        <div>
            <nav>
                <ul style={{display: "flex", listStyleType: "none"}}>
                    <li><Link to='/users'>Users</Link></li>
                    <li style={{marginLeft: "25px"}}><Link to='/projects'>Projects</Link></li>
                </ul>
            </nav>
            <hr/>
        </div>
    )
}

export default Menu