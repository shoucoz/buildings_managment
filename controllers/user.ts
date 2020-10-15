import {User} from "../db/models";
import { Request, Response } from 'express';


export const getUsers = (req: Request, res: Response) => {
    User.findAll().then((users: object) => {
        res.send(users)
    })
};

export const getUser = (req: Request, res: Response) => {
    User.findByPk(req.params.id)
        .then((user ) => {
            if (!user) { return; }
            res.send(user);
        })
        .catch((err: object) => console.log(err));
};

export const createUser = (req: Request, res: Response) => {
    User.create({...req.body}).then((response: object) => {
        res.send(response);
    }).catch((err: object) => {
        throw err;
    });
};

export const editUser = (req: Request, res: Response) => {
    User.update(req.body, {where: {id: req.body.id}}).then((response: object) => {
        res.send(response);
    }).catch((err: object) => {
        throw err;
    });
};

export const deleteUser = (req: Request, res: Response) => {
    User.destroy({where: {id: req.params.id}}).then(() => {
        res.send("Succes");
    }).catch((err: object) => {
        throw err;
    });
};

export const getUsersFromBuilding = (req: Request, res: Response) => {
    User.findAll({where: {buildingId: req.params.id}}).then((users: object) => {
        if (!users) { return; }
        res.send(users);
    })
        .catch((err: object) => console.log(err));
};


export const getUsersFromCompany = (req: Request, res: Response) => {
    const limit: string = req.query.limit as string;
    const userPage: string = req.query.userspage as string;
    User.findAndCountAll(
        {
            where: {companyId: req.params.id, building_company: true},
            // tslint:disable-next-line:radix
            offset: 0 + ((parseInt(userPage) - 1) * parseInt(limit)),
            // tslint:disable-next-line:radix
            limit: parseInt(limit),
            order: [
                ["created_at", req.query.order as string],
            ],
        },
    ).then((users: object) => {
        if (!users) { return; }
        res.send(users);
    })
        .catch((err: object) => console.log(err));
};

export const removeUserReference = (condition: object, newField: object) => {
    return User.findAll({where: condition}).then(async (users: any[]) => {
        for (const user of users) {
            await user.update(newField);
        }
    });
};
