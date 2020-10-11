import React, {useState} from "react";
import history from '../utils'
const queryString = require('query-string');

const FilterSelect = ({url, location, queryParam, options, title}) => {
    const queryParams = queryString.parse(location.search);
    const [active, setActive] = useState(queryParams[queryParam])

    const changeLimit = (e) => {
        const value = e.target.value
        setActive(value)
        queryParams[queryParam] = value
        history.push({
            location: url,
            search: `?${queryString.stringify({...queryParams})}`
        })
    }

    return (
        <div>
            {title}:
            <select onChange={changeLimit} value={active}>
                {options && options.map(item => <option value={item} key={item}>{item}</option>)}
            </select>
        </div>
    )
};


export default FilterSelect;