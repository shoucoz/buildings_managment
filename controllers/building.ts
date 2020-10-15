import {Building} from "../db/models";
import {removeUserReference} from "./user";
import { Request, Response } from "express";

const removeBuildingFromCompany = (buildingElem: any, id: string) => {
    return buildingElem.getCompanies().then(async (companies: any) => {
        for (const company of companies) {
            await company.removeBuilding(id);
        }
    });
};

export const getBuildings = (req: Request, res: Response) => {
    Building.findAll().then((buildings: object) => res.send(buildings));
};

export const createBuilding = (req: Request, res: Response) => {
    Building.create({...req.body}).then((response: any) => {
        Building.findOne({where: {id: req.body.id}}).then((building: any) => {
            if (!building) { return; }
            building.setCompanies(req.body.companyId);
        }).then((_: void) => {
            res.send(response);
        });
    }).catch((err: object) => {
        throw err;
    });
};

export const getBuilding = (req: Request, res: Response) => {
    Building.findOne({where: { id: req.params.id}}).then((building: any) => {
        building.getCompanies().then((companies: any) => {
            res.send({
                ...building.dataValues,
                companyId: companies,
            });
        })
            .catch((err: object) => {
                throw err;
            });
    });
};

export const editBuilding = (req: Request, res: Response) => {
    Building.update(req.body, {where: {id: req.body.id}}).then((response: any) => {
        Building.findOne({where: {id: req.body.id}}).then((buildingElem: any) => {
            if (!buildingElem) { return; }
            removeBuildingFromCompany(buildingElem, req.body.id)
            .then((_: void) => {
                buildingElem.setCompanies(req.body.companyId);
            });
        }).then((_: void) => res.send(response)).catch((err: object) => {
            throw err;
        });
    }).catch((err: object) => {
        throw err;
    });
};

export const deleteBuilding = (req: Request, res: Response) => {
    const {params: {id}} = req;
    Building.findOne({where: {id}}).then((buildingElem: any) => {
        if (!buildingElem) { return; }
        removeBuildingFromCompany(buildingElem, id).then((_: void) => {
            removeUserReference({buildingId: id}, {buildingId: null})
            .then(() => {
                Building.destroy({where: {id}}).then(() => {
                    res.send("Success");
                }).catch((err: any) => {
                    throw err;
                });
            });
        });
    }).then((_: void) => res.send("Succes")).catch((err: object) => {
        throw err;
    });
};
