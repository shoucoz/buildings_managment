import {Company} from "../db/models";
import { Request, Response } from "express";
import {removeUserReference} from "./user";
//

const removeCompanyFromBuilding = (company: any, id: string) => {
    return  company.getBuildings().then(async (buildings: any[]) => {
        for (const building of buildings) {
            await building.removeCompany(id);
        }
    });
};

export const getCompanies = (req: Request, res: Response) => {
    Company.findAll().then((companies: object) => res.send(companies));
};

export const getCompanyBuildings = (req: Request, res: Response) => {
    Company.findOne({where: {id: req.params.companyId}})
        .then((company: any) => {
            if (!company) { return; }
            company.getBuildings().then((buildings: object) => {
                res.send(buildings);
            });
        });
};

export const createCompany = (req: Request, res: Response) => {
    Company.create({...req.body}).then((response: object) => {
        Company.findOne({where: {id: req.body.id}}).then((company: any) => {
            if (!company) { return; }
            company.setBuildings(req.body.buildingId);
        }).then((_: void) => {
            res.send(response);
        });
    }).catch((err: object) => {
        throw err;
    });
};

export const uploadLogo = (req: Request, res: Response) => {
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" });
    }
    const myFile = req.files.file;
    myFile.mv(`${process.cwd()}/client/public/${myFile.name}`, (err: object) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ msg: "Error occured" });
        }
        return res.send({name: myFile.name, path: `/${myFile.name}`});
    });
};

export const getCompany = (req: Request, res: Response) => {
    Company.findOne({where: { id: req.params.id}}).then((company: any) => {
        company.getBuildings().then((buildings: object) => {
            res.send({
                ...company.dataValues,
                buildingId: buildings,
            });
        })
            .catch((err: any) => {
                throw err;
            });
    });
};

export const editCompany = (req: Request, res: Response) => {
    const {params: {id}} = req;
    Company.update(req.body, {where: {id: req.body.id}}).then((result: object) => {
        Company.findOne({where: {id: req.body.id}}).then((company: any) => {
            if (!company) { return; }
            removeCompanyFromBuilding(company, id).then((_: object) => {
                company.setBuildings(req.body.buildingId);
            });
        }).then((_: void) => res.send(result)).catch((err: object) => {
            throw err;
        });
    }).catch((err: object) => {
        throw err;
    });
};

export const deleteCompany = (req: Request, res: Response) => {
    const {params: {id}} = req;
    Company.findOne({where: {id}}).then((company: any) => {
        if (!company) { return; }
        removeCompanyFromBuilding(company, id).then((_: object) => {
            removeUserReference({companyId: id}, {companyId: null})
            .then(() => {
                Company.destroy({where: {id}}).then(() => {
                    res.send("Success");
                }).catch((err: object) => {
                    throw err;
                });
            });
        });
    }).then((_: void) => res.send("Succes")).catch((err: object) => {
        throw err;
    });
};
