import React, {useState, useEffect} from "react";
import api from "../../api";
import BuildingsForUserForm from "../form/BuildingsForUserForm";


const FreeWorkersList = ({match: {params}}) => {
    const [users, setUsers] = useState([])

    const getFreeUsers = () => {
        api.User.getFreeUsers().then(res => setUsers(res.data))
    }

    useEffect(() => {
        getFreeUsers()
    }, [])

    const onSubmit = values => {
        values.building_company = true;
        api.User.editUser(values.id, values).then(_ => {
            getFreeUsers()
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
    <ul className={'list'}>
        {
            users.length ?
                users.map(item => {
                    return (
                        <li key={item.id} className={'list-item list-item--between'}>
                            <span>{item.first_name}, {item.last_name} </span>
                            <span>
                                <BuildingsForUserForm
                                    onSubmit={onSubmit}
                                    initialValues={{...item, companyId: params.id}}
                                />
                            </span>
                        </li>
                    )
                })
                : <li  className={'list-item'}>Empty List</li>
        }
    </ul>
    )
}

export default FreeWorkersList;
