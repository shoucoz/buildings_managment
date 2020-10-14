import {User} from "../db/models";

export const getUsers = (req: any, res: any) => {
    User.findAll().then((users: any) => res.send(users));
};

export const getUser = (req: any, res: any) => {
    User.findByPk(req.params.id)
        .then((user: any) => {
            if (!user) { return; }
            res.send(user);
        })
        .catch((err: any) => console.log(err));
};

export const createUser = (req: any, res: any) => {
    User.create({...req.body}).then((response: any) => {
        res.send(response);
    }).catch((err: any) => {
        throw err;
    });
};

export const editUser = (req: any, res: any) => {
    User.update(req.body, {where: {id: req.body.id}}).then((response: any) => {
        res.send(response);
    }).catch((err: any) => {
        throw err;
    });
};

export const deleteUser = (req: any, res: any) => {
    User.destroy({where: {id: req.params.id}}).then((_: any) => {
        res.send("Succes");
    }).catch((err: any) => {
        throw err;
    });
};

export const getUsersFromBuilding = (req: any, res: any) => {
    User.findAll({where: {buildingId: req.params.id}}).then((users: any) => {
        if (!users) { return; }
        res.send(users);
    })
        .catch((err: any) => console.log(err));
};

export const getUsersFromCompany = (req: any, res: any) => {
    const limit: number = +req.query.limit;
    User.findAndCountAll(
        {
            where: {companyId: req.params.id, building_company: true},
            offset: 0 + (req.query.userspage - 1) * limit,
            limit,
            order: [
                ["created_at", req.query.order],
            ],
        },
    ).then((users: any) => {
        if (!users) { return; }
        res.send(users);
    })
        .catch((err: any) => console.log(err));
};

export const removeUserReference = (condition: object, newField: object) => {
    return User.findAll({where: condition}).then(async (users: any) => {
        for (const user of users) {
            await user.update(newField);
        }
    });
};
