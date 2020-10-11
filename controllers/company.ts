import {Company} from "../db/models";
import {removeUserReference} from './user'

const removeCompanyFromBuilding = (company: any, id: string) => {
    return  company.getBuildings().then(async (buildings: any) => {
        for(let building of buildings){
            await building.removeCompany(id);
        }
    })
}


export const getCompanies = (req: any, res: any) => {
    Company.findAll().then((companies: any) => res.send(companies))
}

export const getCompanyBuildings = (req: any, res: any) => {
    Company.findOne({where: {id: req.params.companyId}})
        .then((company: any) => {
            if(!company) { return; }
            company.getBuildings().then((buildings: any) => {
                res.send(buildings)
            });
        });
}


export const createCompany = (req: any, res: any) => {
    Company.create({...req.body}).then((response: any) => {
        Company.findOne({where: {id: req.body.id}}).then((company: any) => {
            if(!company) return;
            company.setBuildings(req.body.buildingId)
        }).then((_: any) => {
            res.send(response)
        })
    }).catch((err: any)=> {
        throw err;
    });
}


export const uploadLogo = (req: any, res: any) => {
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
    const myFile = req.files.file;
    console.log(myFile, ' myfile')
    myFile.mv(`${process.cwd()}/client/public/${myFile.name}`, function (err: any) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        return res.send({name: myFile.name, path: `/${myFile.name}`});
    });
}


export const getCompany = (req: any, res: any) => {
    Company.findOne({where: { id: req.params.id}}).then((company: any) => {
        company.getBuildings().then((buildings: any)=> {
            res.send({
                ...company.dataValues,
                buildingId: buildings
            })
        })
            .catch((err: any)=> {
                throw err;
            });
    })
}

export const editCompany = (req: any, res: any) => {
    const {params: {id}} = req
    Company.update(req.body, {where: {id: req.body.id}}).then((_: any) => {
        Company.findOne({where: {id: req.body.id}}).then((company:any) => {
            if(!company) return;
            removeCompanyFromBuilding(company, id).then((_:any) => {
                company.setBuildings(req.body.buildingId)
            })
        }).then((_: any) => res.send('Succes')).catch((err: any)=> {
            throw err;
        });
    }).catch((err: any)=> {
        throw err;
    });
}

export const deleteCompany = (req: any, res: any) => {
    const {params: {id}} = req
    Company.findOne({where: {id: id}}).then((company:any) => {
        if(!company) return;
        removeCompanyFromBuilding(company, id).then((_:any) => {
            removeUserReference({companyId: id}, {companyId: null})
            .then((_:any) => {
                Company.destroy({where: {id: id}}).then((_: any) => {
                    res.send('Success')
                }).catch((err: any)=> {
                    throw err;
                });
            })
        })
    }).then((_: any) => res.send('Succes')).catch((err: any)=> {
        throw err;
    });
}

