import React from 'react';
import ROUTES, {RenderRoutes} from "./router";
import {Col, Container, Row} from "react-bootstrap";

function App() {
  return (
    <div className="App">
        <Container>
            <Row>
                <Col>
                    <RenderRoutes routes={ROUTES} />
                </Col>
            </Row>
        </Container>
    </div>
  );
}

export default App;
