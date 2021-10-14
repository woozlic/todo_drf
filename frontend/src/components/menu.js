import React from "react";
import {Link} from "react-router-dom";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BottomNavigation from "@mui/material/BottomNavigation";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Box from '@mui/material/Box';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LoginIcon from '@mui/icons-material/Login';

const Menu = (props) => {
    const [value, setValue] = React.useState(0)
    return (
        <Box>
            <BottomNavigation showLabels
                              value={value}
                              onChange={(event, newValue) => {
                                  setValue(newValue);
                              }}>
                <ul style={{display: "flex", listStyleType: "none"}}>
                    <Link to='/users'><BottomNavigationAction showLabel color="black" label="Users" icon={<PeopleAltIcon />}/></Link>
                    <Link to='/projects'><BottomNavigationAction showLabel label="Projects" icon={<AccountTreeIcon />} /></Link>
                    {props.isAuthenticated() ?
                        <div>
                            <li style={{marginLeft: "25px"}}>Здравствуйте, {props.getUsername()}</li>
                            <li style={{marginLeft: "25px"}}><button onClick={() => { props.logout() }}>Logout</button></li>
                        </div>
                        :
                        <Link to='/login'><BottomNavigationAction showLabel label="Login" icon={<LoginIcon />}/></Link>
                    }
                </ul>
            </BottomNavigation>
        </Box>
    )
}

export default Menu