import React, {useState, useEffect} from "react";
import {Pagination} from "react-bootstrap";
import history from '../utils'
const queryString = require('query-string');


const Paginations = ({url, count, location}) => {
    const queryParams = queryString.parse(location.search);
    const [active, setActive] = useState(+queryParams.userspage)

    const changeAcivePage = id => {
        setActive(id)
        history.push({
            location: url,
            search: `?${queryString.stringify({...queryParams, userspage: id})}`
        })
    }

    let items = [];
    for (let number = 1; number <= Math.ceil(count / queryParams.limit); number++) {
        items.push(
            <Pagination.Item onClick={() => changeAcivePage(number)} key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }

    const paginationBasic = (
        <div>
            <Pagination>{items}</Pagination>
        </div>
    );
    return paginationBasic
};


export default Paginations;