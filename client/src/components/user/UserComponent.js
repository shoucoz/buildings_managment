import React from "react";
import {Link} from "react-router-dom";


const UserComponent= ({first_name, last_name, id}) => {
    return (
        <Link className={'list-item'} to={`users/${id}`}>{`${first_name} ${last_name}`}</Link>
    )
}

export default UserComponent;