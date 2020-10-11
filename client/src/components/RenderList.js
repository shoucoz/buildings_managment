import React, {useEffect, useState} from "react";
import Filter from "./Filter";

const RenderList = (props) => {
    const {data, filterFunction} = props;
    const [inputValue, setValue] = useState('')
    const [filteredData, setData] = useState(data)

    useEffect(()=> {
        setData(filterFunction(data, inputValue.toLowerCase()))
    }, [inputValue])

    if(data.length) {
        return (
            <div className={'list'}>
                <Filter value={inputValue} onChange={setValue}  />
                {
                    filteredData.map(elem => React.cloneElement(props.children,  {...elem, key:elem.id}))
                }
            </div>
        )
    } else {
        return 'Empty list'
    }
}
export default RenderList;