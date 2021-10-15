import React from "react";
import {Link} from "react-router-dom";

const Menu = (props) => {
    return (
        <div>
            <nav>
                <ul style={{display: "flex", listStyleType: "none"}}>
                    <li><Link to='/users'>Users</Link></li>
                    <li style={{marginLeft: "25px"}}><Link to='/projects'>Projects</Link></li>
                    {props.isAuthenticated() ?
                        <div>
                            <li style={{marginLeft: "25px"}}>Здравствуйте, {props.getUsername()}</li>
                            <li style={{marginLeft: "25px"}}><button onClick={() => { props.logout() }}>Logout</button></li>
                        </div>
                        :
                        <li style={{marginLeft: "25px"}}><Link to='/login'>Login</Link></li>
                    }
                </ul>
            </nav>
            <hr/>
        </div>
    )
}

export default Menu