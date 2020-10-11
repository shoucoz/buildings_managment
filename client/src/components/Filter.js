import React from "react";

function Filter({onChange, value}) {
    return (
        <div className='form-group'>
            <input placeholder="Filter" value={value} onChange={event => onChange(event.target.value)} className="form-control" />
        </div>
    )
}

export default Filter;

