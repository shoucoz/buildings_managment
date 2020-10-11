import React from "react";
import {Link} from "react-router-dom";


const CompanyComponent = ({name, id, logo}) => {
    return (
        <Link className={'list-item'} to={`companies/${id}?userspage=1&limit=2&order=asc`}><img className={'company-logo'} src={`${logo}`} />{`${name}`}</Link>
    )
}

export default CompanyComponent