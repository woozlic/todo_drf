import React from "react";
import {Link} from "react-router-dom";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BottomNavigation from "@mui/material/BottomNavigation";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Box from '@mui/material/Box';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {Paper} from "@mui/material";

const Menu = (props) => {
    const [value, setValue] = React.useState(0)
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                      value={value}
                      onChange={(event, newValue) => {
                          setValue(newValue);
                      }}>
                    <BottomNavigationAction component={Link} to='/users' showLabel color="black" label="Users" icon={<PeopleAltIcon />}/>
                    <BottomNavigationAction component={Link} to='/projects' showLabel label="Projects" icon={<AccountTreeIcon />} />
                    {props.isAuthenticated() ?
                        <BottomNavigationAction showLabel label="Logout" onClick={() => { props.logout() }} icon={<LogoutIcon />} />
                        :
                        <BottomNavigationAction component={Link} to='/login' showLabel label="Login" icon={<LoginIcon />}/>
                    }
            </BottomNavigation>
        </Paper>
    )
}

export default Menu