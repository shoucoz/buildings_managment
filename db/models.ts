// const Sequelize = require("sequelize");
import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export const sequelize = new Sequelize(`${process.env.DEV === 'true' ? 'test_buildings' : 'test_buildings_test'}`, "root", "sqlpass1234", {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false
    }
});


export const User = sequelize.define("user", {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mail_confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    building_company: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    buildingId: {
        type: DataTypes.UUIDV4,
        allowNull: true
    },
    companyId: {
        type: DataTypes.UUIDV4,
        allowNull: true
    },
    created_at: DataTypes.DATE,
});

export const Building = sequelize.define("building", {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    locale: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: DataTypes.DATE,
});

export const Company = sequelize.define("company", {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: DataTypes.DATE,
});

export const BuildingsAndCompanies = sequelize.define('bacs', {
    buildingId: {
        type: DataTypes.UUIDV4,
        allowNull: true
    },
    companyId: {
        type: DataTypes.UUIDV4,
        allowNull: true
    },
});


Company.belongsToMany(Building, {through: BuildingsAndCompanies});
Building.belongsToMany(Company, {through: BuildingsAndCompanies});
