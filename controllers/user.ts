import {User} from "../db/models";
import { Request, Response } from 'express';
import {tokenSecret} from '../config';
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


const sendVerificationMail = (req: any) => {
    const smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "mail@gmail.com",
            pass: "password"
        }
    });
    const link = `http://${req.get("host")}/api/verify/${req.body.id}`;

    const mailOptions = {
        to : req.body.mail,
        subject : "Please confirm your Email account",
        html : `Hello,<br> Please Click on the link to verify your email.<br>
                <a href="${link}">Click here to verify</a>`
    }

    smtpTransport.sendMail(mailOptions, (err: object, res: object) => {
        if(err) {
            console.log(err, ' error')
        }
    })


}


export const getUsers = (req: Request, res: Response) => {
    User.findAll().then((users: object) => {
        res.send(users)
    })
};

export const getFreeUsers = (req: Request, res: Response) => {
    User.findAll({where: {building_company: false}}).then((users: object) => {
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
    User.findOne({where: {first_name: req.body.first_name}})
        .then((user ) => {
            if (!user) {
                const saltRounds = 10;
                const password = req.body.password;
                bcrypt.hash(password, saltRounds, (err: object, hash: string) => {
                    User.create({...req.body, password: hash}).then((response: object) => {
                        sendVerificationMail(req);
                        res.send(response);
                    }).catch((err: object) => {
                        throw err;
                    });
                });
            } else {
                res.send( {error: "Username exist!" });
            }
        })
        .catch((err: object) => console.log(err));
};

export const editUser = (req: Request, res: Response) => {
    const saltRounds = 10;
    const password = req.body.password;
    bcrypt.hash(password, saltRounds, (err: object, hash: string) => {
        User.update({...req.body, password: hash}, {where: {id: req.body.id}}).then((response: object) => {
            res.send(response);
        }).catch((err: object) => {
            throw err;
        });
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

export const login = (req: Request, res: Response) => {
    const {
        first_name,
    } = req.body


    User.findOne({where: {first_name}}).then((user: any) => {
        if(!user) {
            res.send( {error: "Incorrect login or password!" });
        }
        if(user.mail_confirmed || user.role === 'internal_admin') {
            bcrypt.compare(req.body.password, user.password, (err:object, result:object) => {
                if(result) {
                    const token = jwt.sign({
                        first_name,
                        id: user.id,
                        role: user.role
                    }, tokenSecret, {expiresIn: 60 * 60})
                    res.send({
                        user,
                        token: `Bearer ${token}`
                    })
                } else {
                    res.send( {error: "Incorrect login or password!" });
                }
            });
        } else {
            res.send( {error: "Please confirmed your email!!!" });
        }
    })
}


export const mailVerification = (req: Request, res: Response) => {
    User.findByPk(req.params.id)
        .then((user ) => {
            if (!user) { return; }
            user.update( {mail_confirmed: true}).then((response: object) => {
                res.send("Succes verification")
            }).catch((err: object) => {
                throw err;
            });
        })
        .catch((err: object) => console.log(err));
}
