import React from "react";

const Loader = (props) => {
    if(props.loading) return  <h1 className={'text-center'}>Loading</h1>
    return props.children;
}
export default Loader;
