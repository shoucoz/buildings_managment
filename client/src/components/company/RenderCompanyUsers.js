import React, {useState, useEffect} from "react";
import Paginations from "../Paginations";
import FilterSelect from "../FilterSelect";
import api from "../../api";


const RenderCompanyUsers= ({match, title, location}) => {
    const [state, setState] = useState({
        rows: []
    })

    const getFilteredUser = () => {
        api.User.getFilteredUsers('usersincompany', match.params.id, location.search).then(res => {
            setState(res.data)
        })
    }

    useEffect(() => {
        getFilteredUser()
    },[match])


    const removeUser = user => {
        const values = {
            ...user,
            building_company: false,
            companyId: null,
            buildingId: null
        };
        api.User.editUser(user.id, values).then(_ => {
            getFilteredUser()
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <>
            <div className={'filters-row'}>
                <FilterSelect location={location} queryParam={'order'} options={['asc', 'desc']} {...match}  title={'Filter by'}/>
                <FilterSelect location={location} queryParam={'limit'} options={[2, 5, 10]} {...match}  title={'Display elements'}/>
            </div>
            <ul className={'list'}>
                {
                    state.rows.length ?
                        state.rows.map(item => {
                            return (
                                <li key={item.id} className={'list-item list-item--between '}>
                                    <span>{item.first_name}, {item.last_name} </span>
                                    <button onClick={() => removeUser(item)} className={'btn btn-danger'}>remove</button>
                                </li>
                            )
                        })
                        : <li  className={'list-item'}>Empty {title}</li>
                }
            </ul>
            <Paginations count={state.count} {...match} location={location} />
        </>
    )
}

export default RenderCompanyUsers;
