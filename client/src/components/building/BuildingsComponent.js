import React from "react";
import {Link} from "react-router-dom";


const BuildingComponent  = ({name, address, id}) => {
    return (
        <Link className={'list-item'} to={`buildings/${id}`}>{`${name} - ${address}`}</Link>
    )
}

export default BuildingComponent;