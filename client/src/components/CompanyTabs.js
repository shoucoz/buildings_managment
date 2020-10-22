import React, { useState } from "react";
import {Tab, Tabs} from "react-bootstrap";
import RenderCompanyUsers from "./company/RenderCompanyUsers";
import FreeWorkersList from "./user/FreeWorkersList";

export default function CompanyTabs({match, location}) {
    return (
        <div className={"tabs-wrapper"}>
            <Tabs
                id="controlled-tab-example"
                defaultActiveKey="workers"
                transition={false}
                mountOnEnter={true}
                unmountOnExit={true}
            >
                <Tab eventKey="workers" title="Company workers">
                    <RenderCompanyUsers match={match} location={location} />
                </Tab>
                <Tab eventKey="withoutwork" title="Free workers">
                    <FreeWorkersList match={match} />
                </Tab>
            </Tabs>
        </div>
    );
}

