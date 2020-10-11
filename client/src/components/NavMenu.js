import React from "react";
import {NavLink} from 'react-router-dom';

const NavMenu = () => {
    return (
        <div className={'navigation'}>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/buildings">Buildings</NavLink>
            <NavLink to="/companies">Companies</NavLink>
        </div>
    )
}

export default NavMenu;

