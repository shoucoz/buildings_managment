import {Building} from "../db/models";
import {removeUserReference} from "./user";

const removeBuildingFromCompany = (buildingElem: any, id: string) => {
    return buildingElem.getCompanies().then(async (companies: any) => {
        for (const company of companies) {
            await company.removeBuilding(id);
        }
    });
};

export const getBuildings = (req: any, res: any) => {
    Building.findAll().then((buildings: any) => res.send(buildings));
};

export const createBuilding = (req: any, res: any) => {
    Building.create({...req.body}).then((response: any) => {
        Building.findOne({where: {id: req.body.id}}).then((building: any) => {
            if (!building) { return; }
            building.setCompanies(req.body.companyId);
        }).then((result: any) => {
            res.send(response);
        });
    }).catch((err: any) => {
        throw err;
    });
};

export const getBuilding = (req: any, res: any) => {
    Building.findOne({where: { id: req.params.id}}).then((building: any) => {
        building.getCompanies().then((companies: any) => {
            res.send({
                ...building.dataValues,
                companyId: companies,
            });
        })
            .catch((err: any) => {
                throw err;
            });
    });
};

export const editBuilding = (req: any, res: any) => {
    Building.update(req.body, {where: {id: req.body.id}}).then((response: any) => {
        Building.findOne({where: {id: req.body.id}}).then((buildingElem: any) => {
            if (!buildingElem) { return; }
            removeBuildingFromCompany(buildingElem, req.body.id)
            .then((_: any) => {
                buildingElem.setCompanies(req.body.companyId);
            });
        }).then((_: any) => res.send(response)).catch((err: any) => {
            throw err;
        });
    }).catch((err: any) => {
        throw err;
    });
};

export const deleteBuilding = (req: any, res: any) => {
    const {params: {id}} = req;
    Building.findOne({where: {id}}).then((buildingElem: any) => {
        if (!buildingElem) { return; }
        removeBuildingFromCompany(buildingElem, id).then((_: any) => {
            removeUserReference({buildingId: id}, {buildingId: null})
            .then((_: any) => {
                Building.destroy({where: {id}}).then((_: any) => {
                    res.send("Success");
                }).catch((err: any) => {
                    throw err;
                });
            });
        });
    }).then((_: any) => res.send("Succes")).catch((err: any) => {
        throw err;
    });
};
