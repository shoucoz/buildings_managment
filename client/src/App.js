import React, {useEffect, useReducer, useState} from 'react';
import ROUTES, {RenderRoutes} from "./router";
import {Col, Container, Row} from "react-bootstrap";
import {ContextApp, initialState, reducer} from "./reducers";
import {filteredRoutes} from './utils'

function App() {
    const [store, dispatch] = useReducer(reducer, initialState);
    const [routes, setRotes] = useState([])

    useEffect(() => {
        setRotes(filteredRoutes(store.role, ROUTES))
    }, [store])

  return (
    <div className="App">
        <Container>
            <Row>
                <Col>
                    <ContextApp.Provider value={{dispatch, store}}>
                        <RenderRoutes routes={routes} />
                    </ContextApp.Provider>
                </Col>
            </Row>
        </Container>
    </div>
  );
}

export default App;
